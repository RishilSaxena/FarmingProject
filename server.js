const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const fs = require("fs")
const path = require("path")
const sgMail = require('@sendgrid/mail')
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// const multer = require('multer');
  
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// const upload = multer({ storage: storage });


const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.resolve(__dirname, "./client/build")));
mongoose.connect(process.env.MONGO_URI);

require("./routes/apiroutes")(app)

app.listen(PORT, function () {
console.log('App running on port http://localhost:'  + PORT);
});