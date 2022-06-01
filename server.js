const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const fs = require("fs")


const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
mongoose.connect("mongodb+srv://farmer:farmingapp@cluster0.hkuzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

require("./routes/apiroutes")(app)

app.listen(PORT, function () {
console.log('App running on port http://localhost:'  + PORT);
});