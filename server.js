const  express=require('express');
const bodyParser=require('body-parser');
 const port=process.env.PORT||3000;
 const app=express();
 const mongoose=require('mongoose');
 const dotenv=require('dotenv').config();
 const passport=require('passport');
 const db=process.env.MY_URL;
 

 //middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//passport
//app.use(passport.initialize());
//require('./startergies/username')(passport);
 //import routes
 const auth=require('./api/auth.js');

//db


mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   
})
.then(()=>{
    console.log("database connected successfully")
}
)
.catch((err)=>{
  console.log(err);
})

 //routes
app.use('/api/auth',auth);
//listen
 app.listen(port,()=>{
     console.log('server is connected at 3000');
 })



