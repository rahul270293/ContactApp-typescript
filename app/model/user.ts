import * as mongoose from 'mongoose';

let  uSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})

  const user = mongoose.model('user', uSchema);

  export default user;

