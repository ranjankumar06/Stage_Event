const bodyParser = require('body-parser');
const express = require('express');
const cors=require("cors")
const app= express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require('./dbConnection/db');
const PORT = 3003;
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use('/user',require('./Router/userRouter'))
app.use('/admin',require('./Router/adminRouter'))
app.use('/organizer',require('./Router/organizerRouter'))
app.use('/event',require('./Router/eventRouter'))
app.use('/ticket',require('./Router/ticketRouter'))
app.use(cors());




const swaggerDefinition = {
    info: {
      title: "Event-API",
      version: "1.0.0",
      description: "Swagger API Docs",
    },
    host: `localhost:${PORT}`,
    basePath: "/",
};
   const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./Router/*.js"],
};
   const swaggerSpec = swaggerJSDoc(options);
   app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
    
   /** Server Listen **/
   app.use("/Ravi-API", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//    Allow cors

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Allow-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE');
    next();
});

    app.get('/data',function(req, res){
    res.send(`Hi my name is RAVI`);
})
app.listen(PORT,(err,res)=>{
    if (err) {
        console.log('Internal server error',err);
    } else {
        console.log('Server is running on',PORT);
    }
});