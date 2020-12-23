const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const UserSchema = new Schema(
{
    profilePic:{
        type:String,

    },
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    }
    
}

);

module.exports=user= mongoose.model('myUser', UserSchema);
