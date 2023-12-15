//app , add routes , add your error handling , then listen to that port
//npm packages
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

require("dotenv").config()

const customerRoute=require('./routes/customerRoute');
const supplierRoute=require('./routes/supplierRoutes');
const orderRoute=require('./routes/orderRoute');

//app
const app=express();
app.use(express.json());

app.use(cors());

//jwt and authenticator import

//routes import
app.use('/auth', customerRoute);
app.use('/supplier',supplierRoute);
app.use('/order', orderRoute);

//error handlers

app.use(function(req, res, next) {
    res.status(404).send('Route Not Found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

//app listen
app.listen(3001, ()=>{
    console.log("App listening in on port 3001")
}) 


//Database
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{ 
    console.log("Error in Connecting to Database")
}) 