const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Evant',(err, res)=>
{
    if(err)
    {
        console.log('Database connection error',err);
    }
    else
    {
        console.log('Database is connected');
    }
});