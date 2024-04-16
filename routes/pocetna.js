const express = require("express");
const router = express.Router();
const Grad = require("../models/gradModel");
const Oglas = require("../models/oglasModel");
const Korisnik = require("../models/korisnikModel");
const Message= require ("../models/message")
const { remove } = require("../models/oglasModel");
const DeloviGrada = require("../models/deloviGradaModel");
const bcrypt=require('bcrypt');
const passport = require('passport')
const {checkAuthenticated,checkNotAuthenticated}=require ("../public/authentication")


router.get("/", async (req, res) => {
  
 /*  const Nis = await Grad.find({naziv: "Nis"});
  console.log("Ovo mu je id: " + Nis[0].id);

  const Beograd = await Grad.find({naziv: "Beograd"});
  console.log("Ovo mu je id: " + Beograd[0].id);

  const Zajecar = await Grad.find({naziv: "Zajecar"});
  console.log("Ovo mu je id: " + Zajecar[0].id);

  const grad= await Grad.findById("5efcd9f6dd50603c300e0ed5")
  console.log(grad)
 */
/*   const deloviGrada =[
    {
      koordinate: { lat: 43.307124, lng: 21.940439 },
      naziv: 'Delijski vis',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.310345, lng: 21.933606 },
      naziv: 'Broj 6',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.312844, lng: 21.86187 },
      naziv: 'Ledena stena',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.321431, lng: 21.87659 },
      naziv: 'Kicevo',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.3178, lng: 21.893893 },
      naziv: 'Kalca',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.327643, lng: 21.90468 },
      naziv: 'Jagodin mala',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.305799, lng: 21.877559 },
      naziv: 'Bubanj',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.320861, lng: 21.929816 },
      naziv: 'Duvaniste',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.30618, lng: 21.861601 },
      naziv: 'Palilula',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.321821, lng: 21.905097 },
      naziv: 'Crveni pevac',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 21.935985, lng: 43.326311 },
      naziv: 'Beverli Hils',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.316232, lng: 21.904657 },
      naziv: 'Cair',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.368044, lng: 21.971592 },
      naziv: 'Pantelej',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.314859, lng: 21.896696 },
      naziv: 'Marger',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.320438, lng: 21.919275 },
      naziv: 'Park Svetog Save',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 43.311345, lng: 21.930033 },
      naziv: 'Trosarina',
      gradId: Nis[0].id
    },
    {
      koordinate: { lat: 44.610225, lng: 20.441036 },
      naziv: 'Barajevo',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.715028, lng: 20.508141 },
      naziv: 'Vozdovac',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.797046, lng: 20.473602 },
      naziv: 'Vracar',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.670608, lng: 20.697 },
      naziv: 'Grocka',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.781294, lng: 20.515995 },
      naziv: 'Zvezdara',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.847189, lng: 20.368071 },
      naziv: 'Zemun',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.811694, lng: 20.403223 },
      naziv: 'Novi Beograd',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.923125, lng: 20.469659 },
      naziv: 'Palilula',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.7307, lng: 20.445243 },
      naziv: 'Rakovica',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.785588, lng: 20.450714 },
      naziv: 'Savski venac',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.819527, lng: 20.459099 },
      naziv: 'Stari grad',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.739653, lng: 20.381968 },
      naziv: 'Cukarica',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.789744, lng: 20.465792 },
      naziv: 'Autokomanda',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.804874, lng: 20.478546 },
      naziv: 'Vukov spomenik',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.812483, lng: 20.46107 },
      naziv: 'Terazije',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.812199, lng: 20.458611 },
      naziv: 'Zeleni venac',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.81127, lng: 20.457344 },
      naziv: 'Savamala',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.817404, lng: 20.437069 },
      naziv: 'Usce',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 44.795498, lng: 20.47755 },
      naziv: 'Cubura',
      gradId: Beograd[0].id
    },
    {
      koordinate: { lat: 43.907411, lng: 22.270499 },
      naziv: 'Naselje plaza',
      gradId: Zajecar[0].id
    },
    {
      koordinate: { lat: 43.902076, lng: 22.284398 },
      naziv: 'Vlaska mala',
      gradId: Zajecar[0].id
    },
    {
      koordinate: { lat: 43.914144, lng: 22.284216 },
      naziv: 'Cerak',
      gradId: Zajecar[0].id
    },
    {
      koordinate: { lat: 43.904219, lng: 22.257815 },
      naziv: 'Zivinarnik',
      gradId: Zajecar[0].id
    },
    {
      koordinate: { lat: 43.891318, lng: 22.251199 },
      naziv: 'Oskorusa',
      gradId: Zajecar[0].id
    },
    {
      koordinate: { lat: 43.899627, lng: 22.24422 },
      naziv: 'Vanjin jaz',
      gradId: Zajecar[0].id
    }
    
  ]

deloviGrada.forEach(async deo=>{
  let deograda=new DeloviGrada(deo);
  await deograda.save()
/*   console.log(deograda) */

/*   const gradovi=await Grad.find().exec()
  gradovi.forEach((grad)=>{
    console.log(grad)
  }) */
  /*  const messages=await Message.find({}).exec()
    messages.forEach( async (mes)=>{
      await mes.remove()
    })
    console.log(messages) */

    /* const hashedPassword = await bcrypt.hash("admin",10)
    const admin=new Korisnik({
      username:"admin",
      password:hashedPassword,
      email:"admin@admin",
      role:"admin"
  
  })
  await admin.save()
  console.log(admin) */


 



/* deloviGrada.forEach(deoGrada => {
  let deo = new DeloviGrada(deoGrada);
  deo.save();
  console.log(deo);
}); */

/* const deloviGrada = await DeloviGrada.find({});
deloviGrada.forEach(deoGrada => {
    if(deoGrada.gradId === "5efcd9f6dd50603c300e0ec0"){
      console.log(deoGrada);
    }else{
      console.log(deoGrada.naziv);
    }
});

 */
    const arrayMarkera = [];
    var arrayPostojecihGradova = [];
    var pomoc = [];

    const oglasi = await Oglas.find({});
    const gradoviDb = await Grad.find({});

    var postojiGrad = false;

    oglasi.forEach(oglas => { //Ubacamo sve gradove koji postoje u oglasima, bice duplikata
      if(oglas.svrhaOglasa != "tcns")
        arrayMarkera.push(oglas.koordinateStana);
      pomoc.forEach(nazivGrada => { //Pomocni niz koji sluzi da bismo videli da li smo vec ubacili taj grad
        if(nazivGrada === oglas.nazivGrada){
          postojiGrad = true;
        }
      });
      if(postojiGrad === false){ //Ako nismo, ubacamo ga ovde :)
        pomoc.push(oglas.nazivGrada);
          gradoviDb.forEach(grad => {
            if(grad.naziv === oglas.nazivGrada){
              arrayPostojecihGradova.push(grad);
            }
          });
      } else postojiGrad = false;
    });

    if (req.user!=null)
      {

      }
    res.render("pocetna/pocetnaIzgled", {
                                            markeri: JSON.stringify(arrayMarkera),
                                            gradoviDb: JSON.stringify(arrayPostojecihGradova)
                                        });
})

router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/korisnici/new',
  failureRedirect:'/login',
  failureFlash:true
}))

router.get('/register', (req, res) => {
  if (req.isAuthenticated)
    req.logout()
  res.render('register.ejs')
})
router.post('/register', async (req, res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const korisnik= new Korisnik({
      username:req.body.name,
      email:req.body.email,
      password:hashedPassword
  })
  const daLiPostoji=await Korisnik.find( { $or: [ {username:req.body.name}, {email:req.body.email} ] } )
  console.log(daLiPostoji)
  /* const newUser=await korisnik.save();
  console.log(korisnik) */
  if(daLiPostoji.length==0)
  {
    const newUser=await korisnik.save()
    res.redirect('/login')
  }else{
    res.redirect('/register')
  }
  } catch(err) {
      console.log(err)
    res.redirect('/register')
  }

})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router;