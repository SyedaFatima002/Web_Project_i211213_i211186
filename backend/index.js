//npm packages
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

require("dotenv").config()

//routes import

//jwt and authenticator import

const app=express();
app.use(cors)

app.listen(3001, ()=>{
    console.log("App listening in on port 3001")
})

//Database
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{ 
    console.log("Error in Connecting to Database")
}) 

//Middlewares

//routes

//error handlers
app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});