const express = require("express");
const router = express.Router();
const Korisnik = require("../models/korisnikModel");
const Oglas = require("../models/oglasModel");
const Message=require("../models/message")
const {checkAuthenticated,checkNotAuthenticated}=require ("../public/authentication")

const imageMimeTypes = ["image/jpeg","image/png", "image/gif"];


//Svi korisnici
router.get("/", async (req, res) => { //localhost:3000/korisnici/
    try {
        if (req.user==null)
        {
            var user={
                username:"anonimus",
                role:"anonimac"
            }
        }else{
            console.log("ulazi ovde")
            var user=req.user
        }
        console.log(user)
        const korisnici = await Korisnik.find({});//Saljemo prazan objekat, koji znaci da nemamo uslova
        res.render("korisnici/index", {
            korisnici: korisnici,
            user:user//,
            //searchOptions: req.query //ova dva saljemo nazad
        });
    } catch {
        res.redirect("/");
    }
})



//Novi korisnik -> display the form
router.get("/new",checkAuthenticated, async (req, res) => {

    if (req.user.ime != null)
    {res.redirect(`/korisnici/${req.user.id}`)}
else{
const korisnik=await Korisnik.findById(req.user.id)
console.log(korisnik)
res.render("korisnici/new",{ korisnik:korisnik })
}

})

//Novi korisnik ce se cuvati u bazi tako sto post metodom posaljemo njegove podatke
router.post("/new", async (req, res) => {
    const korisnik=await Korisnik.findById(req.user.id)
    korisnik.ime=req.body.ime
    korisnik.prezime=req.body.prezime
    korisnik.opis=req.body.opis
    saveCover(korisnik, req.body.profilnaSlika);
    if(req.body.profilnaSlika == null || req.body.profilnaSlika == ""){
        console.log("Defoltna slika se stavlja");
    }
    console.log(korisnik);
    try{
        const newKorisnik = await korisnik.save();
        res.redirect(`/korisnici/${newKorisnik.id}`)
        //res.redirect("korisniks");
    }
    catch (err){
        console.log(err);
        res.render("korisnici/new", {
            korisnik: korisnik,
            //locals
            errorMessage: "Error creating korisnik"
        })
    }
})

router.post("/recentmessages/:id",checkAuthenticated,async(req,res)=>{
    try{
        if (req.user==null)
        {
            var user={
                username:"anonimus",
                role:"anonimac"
            }
        }else{
            var user=req.user
        }
        /* const messages = await Message.find({posiljaoc:req.user.username}).sort({createdAt: "desc"}).limit(10).exec(); */
        const poruke=await Message.find( { primaoc:user.username } ).sort({createdAt: "desc"}).limit(10).exec();
        var porukeunique={}
        poruke.forEach(por=>{
            porukeunique[por.posiljaoc]=por
        })
        const messages = Object.values(porukeunique);
        console.log(messages)

        res.render("korisnici/chats",{username:user.username,poruke:messages})  
    }catch{
        res.redirect("/")
    }
})

router.post("/:id", async (req, res) => { //localhost:3000/oglasi/
    try {
        if (req.user==null)
        {
            var user={
                username:"anonimus",
                role:"anonimac"
            }
        }else{
            
            var user=req.user
        }
        const korisnik = await Korisnik.findById(req.params.id);
        const oglasi = await Oglas.find({ korisnikId: korisnik.id }).populate("korisnikId").sort({createdAt: "desc"}).limit(10).exec();

        if (req.body.star!=undefined)
        {
            korisnik.ratings.push({
                username:user.username,
                vote:req.body.star
            })
        var int=parseInt(req.body.star)
        korisnik.ratingavg=(korisnik.ratingavg+int)/korisnik.ratings.length
        console.log(korisnik.ratingavg)
    
        korisnik.save()
        console.log(korisnik.ratings)
        }

        var mozeDaGlasa=true
        korisnik.ratings.forEach(rate=>{
            if (user.username==rate.username)
                mozeDaGlasa=false
        })
        console.log(mozeDaGlasa)
        
        res.render("korisnici/show", {
            korisnik: korisnik,
            oglasi: oglasi,
            user:user,
            mozeDaGlasa:mozeDaGlasa
        });
    } catch (err){
        console.log(err);
        res.redirect(`/korisnici/${korisnik.id}`);
    }
})

router.post("/:id1/:id2",async(req,res)=>{
    try{
        if (req.user==null)
        {
            var user={
                username:"anonimus",
                role:"anonimac"
            }
        }else{
            var user=req.user
        }
    /* const message=new Message({
        sadrzaj:req.body.message,
        korisnik1:req.user,
        korisnik2:await Korisnik.findById(req.body.idkorisnika),
        senderusername:req.user.username
    }) */
    /* const newMessage=await message.save() */
        /* let kor1=req.user
        let kor2=await Korisnik.findById(req.body.idkorisnika) */
        const korisnik = await Korisnik.findById(req.params.id1);
        const oglasi = await Oglas.find({ korisnikId: korisnik.id }).sort({createdAt: "desc"}).limit(10).exec();
        const messages=await Message.find( { $or: [ {posiljaoc:user.username,primaoc:korisnik.username}, {posiljaoc:korisnik.username,primaoc:user.username } ] } )
        .sort({createdAt: "desc"}).limit(10).exec();
        console.log(messages)
        const poruke=JSON.stringify(messages)
            res.render("korisnici/chat",{
                korisnik:korisnik.username,
                user:user.username,
                poruke:poruke
            })
    }catch(err)
    {
        console.log(err)
    }
    })
//Prikaz korisnickog profila sa njegovim id-jem
router.get("/:id", async (req, res) => {
    try {
        if (req.user==null)
        {
            var user={
                username:"anonimus",
                role:"anonimac"
            }
        }else{
            
            var user=req.user
        }
        const korisnik = await Korisnik.findById(req.params.id);
        const oglasi = await Oglas.find({ korisnikId: korisnik.id }).populate("korisnikId").sort({createdAt: "desc"}).limit(10).exec();

        var mozeDaGlasa=true;
        korisnik.ratings.forEach(rate=>
            {
                if (rate.username==user.username)
                {
                    mozeDaGlasa=false;
                }
            })
        
        res.render("korisnici/show", {
            korisnik: korisnik,
            oglasi: oglasi,
            user:user,
            mozeDaGlasa:mozeDaGlasa
        });
    } catch (err){
        console.log(err);
        res.redirect(`/korisnici/${korisnik.id}`);
    }
    
})


router.get("/:id/edit",checkAuthenticated, async (req, res) => {
    try {
        const korisnik = await Korisnik.findById(req.params.id);
        res.render("korisnici/edit", {korisnik: korisnik});
    } catch {
        res.redirect("/korisnici");
    }
})


//Update korisnik
router.put("/:id", async (req, res) => {  //Ne moramo da brinemo za /edit, jer nam PUT kaze da updatujemo :)
    let korisnik;
    try{
        korisnik = await Korisnik.findById(req.params.id);
        korisnik.ime = req.body.ime;
        korisnik.prezime = req.body.prezime;
        korisnik.opis = req.body.opis;
        if(req.body.profilnaSlika != null && req.body.profilnaSlika != ""){
            saveCover(korisnik, req.body.profilnaSlika);
        }
        await korisnik.save();
        res.redirect(`/korisnici/${korisnik.id}`); //Kada stavimo crticu ispred, idemo od roota. Da ne stavimo bilo bi authors/autors -> znaci bilo bi relativna putanja
    }
    catch{
        if(author == null){ //Ako ne bude pronadjen u bazi
            res.redirect("/");
        }
        else{
            res.render("korisnici/edit", {
                author: author,
                //locals
                errorMessage: "Error updating Author"
            })
        }
    }
})

//Brisanje odredjenog korisnika
router.delete("/:id", async (req, res) => {  
    
    let korisnik;
    let oglasi;
    try{
        korisnik = await Korisnik.findById(req.params.id);
        oglasi = await Oglas.find({korisnikId: korisnik.id});
        oglasi.forEach(async function (oglas){
            console.log("Ovo je grad oglasa: " + oglas.nazivGrada);
            await oglas.remove();
        })
        await korisnik.remove();
        req.logOut()
        res.redirect('/register') //Kada stavimo crticu ispred, idemo od roota. Da ne stavimo bilo bi korisnici/autors -> znaci bilo bi relativna putanja
    }
    catch{
        if(korisnik == null){ //Ako ne bude pronadjen u bazi
            res.redirect("/");
        }
        else{
            res.redirect(`/korisnici/${korisnik.id}`);
        }
    }
})


function saveCover(korisnik, coverEncoded){ //coverEncoded je string
    if( coverEncoded == null || coverEncoded == "") return;
    const cover = JSON.parse(coverEncoded);
    if(cover != null && imageMimeTypes.includes(cover.type)){
        /* console.log("cover data\n" + cover.data);
        console.log("cover image type\n" + cover.type); */
        korisnik.coverImage = new Buffer.from(cover.data, "base64");//prvi param je data, a drugi je kako zelimo da ga konvertujemo od
        korisnik.coverImageType = cover.type;
    }
}



module.exports = router;