const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const companyRouter = require('./Routes/companyRouter');


const app = express();
const port = process.env.PORT;

//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/delivery', companyRouter);



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
  console.log("Connected to database");
}).catch(err=>{
  console.log(err);
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
