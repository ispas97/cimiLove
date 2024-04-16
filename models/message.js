const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    sadrzaj: {
        type: String,
        required: true
    },
    /* primaoc:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Korisnik'
    }, */
    posiljaoc: {
        type:String,
        required:true
    },
    primaoc: {
        type:String,
        required:true
    },
    SentAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    posiljaocId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Korisnik'
    },
    primaocId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Korisnik'
    }
    
});

module.exports = mongoose.model("Message", messageSchema);
