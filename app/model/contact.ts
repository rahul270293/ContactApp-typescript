import * as mongoose from 'mongoose';

let contactSchema:mongoose.Schema<any> = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    number:{
        type:Number,
        required:true,
        minlength:10
    },
    admin:{
        type:String
    }
})

let contact = mongoose.model('contact',contactSchema);

export default contact;