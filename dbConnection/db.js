const mongoose = require('mongoose');

//const url = "mongodb+srv://eventApi:event12345@cluster0.jtwbzqk.mongodb.net/?retryWrites=true&w=majority";
const urlDb=process.env.MONGODBURL;
mongoose.connect(urlDb, {useNewUrlParser: true,
useUnifiedTopology: true}).then(()=>{
    console.log('Database is connected');
}).catch((error)=>{
    console.log('Database connection error',error.message);
});