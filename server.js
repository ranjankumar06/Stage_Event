const bodyParser = require('body-parser');
const express = require('express');
const cors=require("cors")
const app= express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require('./dbConnection/db');
const PORT = 3007;
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


app.use('/user',require('./Router/userRouter'))
app.use('/admin',require('./Router/adminRouter'))
app.use('/organizer',require('./Router/organizerRouter'))
app.use('/event',require('./Router/eventRouter'))
app.use('/ticket',require('./Router/ticketRouter'))

app.use(cors())


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

   app.get("/no-cors", (req, res) => {
      console.info("GET /no-cors");
      res.json({
        text: "You should not see this via a CORS request."
      });
    });
    app.head("/simple-cors", cors(), (req, res) => {
          console.info("HEAD /simple-cors");
          res.sendStatus(204);
        });
        app.get("/simple-cors", cors(), (req, res) => {
          console.info("GET /simple-cors");
          res.json({
            text: "Simple CORS requests are working. [GET]"
          });
        });
        app.post("/simple-cors", cors(), (req, res) => {
          console.info("POST /simple-cors");
          res.json({
            text: "Simple CORS requests are working. [POST]"
          });
        });
        app.put("/simple-cors", cors(), (req, res) => {
            console.info("PUT /simple-cors");
            res.json({
              text: "Simple CORS requests are working. [PUT]"
            });
          });
        app.options("/complex-cors", cors());
       app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "Complex CORS requests are working. [DELETE]"
  });
});
const issue2options = {
      origin: true,
      methods: ["POST"],
      credentials: true,
      maxAge: 3600
    };
    app.options("/issue-2", cors(issue2options));
    app.post("/issue-2", cors(issue2options), (req, res) => {
      console.info("POST /issue-2");
      res.json({
        text: "Issue #2 is fixed."
      });
    });
    app.get('/data',function(req, res){
        // res.json({msg: 'This is CORS-enabled for only example.com.'})
    // next();
    console.log('hi i am  Ravi');

})
app.listen(PORT,(err,res)=>{
    if (err) {
        console.log('Internal server error',err);
    } else {
        console.log('Server is running on',PORT);
    }
});




// const express = require("express");
// const cors = require("cors");
// const app = express();
// require('./dbConnection/db');


// app.use('/user',require('./Router/userRouter'))
// app.use('/admin',require('./Router/adminRouter'))
// app.use('/organizer',require('./Router/organizerRouter'))
// app.use('/event',require('./Router/eventRouter'))
// app.use('/ticket',require('./Router/ticketRouter'))
// /* -------------------------------------------------------------------------- */

// app.get("/no-cors", (req, res) => {
//   console.info("GET /no-cors");
//   res.json({
//     text: "You should not see this via a CORS request."
//   });
// });

// /* -------------------------------------------------------------------------- */

// app.head("/simple-cors", cors(), (req, res) => {
//   console.info("HEAD /simple-cors");
//   res.sendStatus(204);
// });
// app.get("/simple-cors", cors(), (req, res) => {
//   console.info("GET /simple-cors");
//   res.json({
//     text: "Simple CORS requests are working. [GET]"
//   });
// });
// app.post("/simple-cors", cors(), (req, res) => {
//   console.info("POST /simple-cors");
//   res.json({
//     text: "Simple CORS requests are working. [POST]"
//   });
// });

// /* -------------------------------------------------------------------------- */

// app.options("/complex-cors", cors());
// app.delete("/complex-cors", cors(), (req, res) => {
//   console.info("DELETE /complex-cors");
//   res.json({
//     text: "Complex CORS requests are working. [DELETE]"
//   });
// });

// /* -------------------------------------------------------------------------- */

// const issue2options = {
//   origin: true,
//   methods: ["POST"],
//   credentials: true,
//   maxAge: 3600
// };
// app.options("/issue-2", cors(issue2options));
// app.post("/issue-2", cors(issue2options), (req, res) => {
//   console.info("POST /issue-2");
//   res.json({
//     text: "Issue #2 is fixed."
//   });
// });

// /* -------------------------------------------------------------------------- */

// if (!module.parent) {
//   const port = process.env.PORT || 3008;

//   app.listen(port, () => {
//     console.log("Express server listening on port " + port + ".");
//   });
// }