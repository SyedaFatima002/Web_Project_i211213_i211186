const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT;

const User = mongoose.model('User', userSchema);

app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
  console.log("Connected to database");
}).catch(err=>{
  console.log(err);
})




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
