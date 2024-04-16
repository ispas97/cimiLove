
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const path = require("path");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverrire = require("method-override");
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const pocetnaRouter = require("./routes/pocetna");
const korisnikRouter = require("./routes/korisnici");
const oglasRouter = require("./routes/oglasi");

app.set("view engine", "ejs"); //Podesavamo view engine
app.set("views", path.join(__dirname, 'views'));  //Podesavamo gde ce se nalaziti views
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverrire("_method")); //Ovaj parametar je kao name input ili tako nesto... nzn
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: "50mb", extended: false}));

const initializePassport = require("./public/passport-config")
  initializePassport(passport)

  app.use(flash()) 
  app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false
   })) 
 app.use(passport.initialize())
 app.use(passport.session())

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database!"));


app.use("/", pocetnaRouter);
app.use("/korisnici", korisnikRouter);
app.use("/oglasi", oglasRouter);


app.listen(process.env.PORT || 3000);


const io = require('socket.io')(3001);
const Message=require("./models/message")
const Korisnik=require("./models/korisnikModel")

const users=[]
const sockets=[]
io.on('connection', (socket)=>{
    socket.on('new-user', data=>{
        users[data.user]={
          id:socket.id,
          user1:data.user,
          user2:data.korisnik
          /* user2:data.korisnik */
        } 
        sockets[socket.id]=data.user 
        console.log(users)
    console.log(sockets)
    socket.broadcast.emit('user-connected',data.user)
})
    socket.on('send-chat-message',async data=>{
        console.log(data)
        const korisnik1=await Korisnik.findOne({username:data.posiljaoc})
        const korisnik2=await Korisnik.findOne({username:data.primaoc})
        const poruka=new Message({
          sadrzaj:data.message,
          posiljaoc:data.posiljaoc,
          primaoc:data.primaoc,
          posiljaocId:korisnik1.id,
          primaocId:korisnik2.id
        })
        const novaPoruka=await poruka.save()
        console.log(poruka)
        if (!(users[data.primaoc]==undefined || users[data.primaoc].user2!==data.posiljaoc))
        {
            console.log("uso je ovde")
            socket.to(users[data.primaoc].id).emit("chat-message", data);
        }
    })
    socket.on('disconnect',()=>{
        /* var userime
        users.forEach(user=>{
          console.log("uso")
          if (user.id==socket.id)
          { 
            userime=user.user1
            console.log(user)
          }
        }) */
        
        const userime=sockets[socket.id]
        if (users[userime]!=undefined){
        const primaoc=users[userime].user2;
        
        console.log(userime)
        if (users[primaoc]!=undefined && users[primaoc].user2==userime)
        {
        socket.to(users[primaoc].id).emit('user-disconnected',userime)
        }
        delete sockets[socket.id]
        delete users[userime]
    }
    
    })
})