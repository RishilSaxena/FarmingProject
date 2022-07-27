const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const zipcodes = require("zipcodes-nearby");
const nodemailer = require("nodemailer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  register: async function (req, res) {
    let password = await bcrypt.hash(req.body.password, 10);
    let isSeller;
    if (req.body.isSeller) {
      isSeller = true;
    } else {
      isSeller = false;
    }

    User.create({
      email: req.body.email,
      password: password,
      streetAddress: req.body.streetAddress,
      sellerData: {},
      isSeller: isSeller,
      zipcode: req.body.zipcode,
      city: req.body.city,
      state: req.body.state,
      cart: [],
    }).then(function (data) {
      res.json(data);
    });
  },
  login: function (req, res) {
    let passwordsMatch = false;
    try {
      User.find({ email: req.body.email }).then(async function (data) {
        for (let i = 0; i < data.length; i++) {
          passwordsMatch = await bcrypt.compare(
            req.body.password,
            data[i].password
          );
          console.log(passwordsMatch + "1");
          if (passwordsMatch) {
            console.log(passwordsMatch + "2");
            console.log(data[i]);
            res.cookie("id", data[i]._id, { maxAge: 24 * 60 * 60 * 1000 });
            return res.status(200).json(data[i]);
          } else {
            continue;
          }
        }

        console.log(passwordsMatch + "3");
        if (!passwordsMatch) {
          res.send("No user found.");
        }
      });
    } catch {
      res.send("No user found.");
    }
  },
  getUserData: function (req, res) {
    try {
      User.findOne({ _id: req.cookies["id"] }).then(function (data) {
        res.json(data);
      });
    } catch {
      res.send("Not logged in.");
    }
  },
  updateSellerData: function (req, res, next) {
    try {
      const sellerData = {
        foods: req.body.foods,
        bio: req.body.bio,
        gardenName: req.body.gardenName,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        reviews: [],
      };
      User.findOneAndUpdate(
        { _id: req.cookies["id"] },
        { sellerData: sellerData }
      ).then(function (data) {
        console.log(data);
        res.end();
      });
    } catch (err) {
      console.log("No user found.");
      res.send("Not logged in.");
      console.log(err);
    }
  },
  getSellerData: function (req, res) {
    try {
      let foundUser = false;
      User.find({ isSeller: true }).then(function (data) {
        data.forEach((e) => {
          if (e._id == req.params["id"]) {
            foundUser = true;
            console.log(foundUser + "1");
            return res.json(e.sellerData);
          }
        });
        console.log(foundUser + "2");
        if (!foundUser) {
          res.send("No user found.");
        }
      });
    } catch {
      res.send("No user found.");
    }
  },
  getAllProducts: function (req, res) {
    try {
      const products = [];
      User.find({ isSeller: true }).then(function (data) {
        data.forEach((e) => {
          e.sellerData.foods.forEach((food) => {
            const product = food;
            console.log(product);
            product.zipcode = e.zipcode;
            products.push(food);
          });
        });
        res.json(products);
      });
    } catch (err) {
      console.log(err);
    }
  },
  findZipcodesNearby: async function (req, res) {
    try {
      console.log(req.params.zipcode);
      const zipcode = await zipcodes.near(req.params.zipcode, 10000);
      console.log(zipcode);
      res.json(zipcode);
    } catch (err) {
      console.log(err);
      res.json([""]);
    }
  },
  getCookie: async function (req, res) {
    res.json(req.cookies["id"]);
  },
  addToCart: function (req, res) {
    let updated = false;
    User.findOne({ _id: req.cookies["id"] }).then(function (data) {
      const cart = data.cart;
      cart.forEach((food) => {
        if (food.food == req.body.food && food.sellerId == req.body.sellerId) {
          console.log("Already exists");
          updated = true;
          food.quantity += req.body.quantity;
          User.findOneAndUpdate(
            { _id: req.cookies["id"] },
            { cart: cart }
          ).then(function (data) {
            res.end();
          });
        }
      });
      if (!updated) {
        User.findOneAndUpdate(
          { _id: req.cookies["id"] },
          { $push: { cart: req.body } },
          { new: true }
        ).then(function (data) {
          res.end();
        });
      }
    });
  },
  getCart: function (req, res) {
    User.findOne({ _id: req.cookies["id"] }).then(function (data) {
      console.log(data);
      res.json(data.cart);
    });
  },
  updateQuantity: function (req, res) {
    console.log(req.food);
    User.findOne({ _id: req.cookies["id"] }).then(function (data) {
      const cart = data.cart;
      cart.forEach((food) => {
        if (food.food == req.body.food && food.sellerId == req.body.sellerId) {
          food.quantity = req.body.quantity;
        }
      });
      User.findOneAndUpdate({ _id: req.cookies["id"] }, { cart: cart }).then(
        function (data) {
          res.end();
        }
      );
    });
  },
  deleteItem: function (req, res) {
    User.findOne({ _id: req.cookies["id"] }).then(function (data) {
      const cart = data.cart;
      cart.forEach((food, index) => {
        if (food.food == req.body.food && food.sellerId == req.body.sellerId) {
          cart.splice(index, 1);
        }
      });
      User.findOneAndUpdate({ _id: req.cookies["id"] }, { cart: cart }).then(
        function (data) {
          res.end();
        }
      );
    });
  },
  submitReview: function (req, res) {
    User.findOne({ _id: req.params["id"], isSeller: true }).then(function (
      data
    ) {
      console.log(data);
      const sellerData = data.sellerData;
      sellerData.reviews.push(req.body);
      User.findOneAndUpdate(
        { _id: req.params["id"], isSeller: true },
        { sellerData: sellerData }
      ).then(function (data) {
        res.end();
      });
    });
  },
  sendResetEmail: function (req, res) {
    User.findOne({ email: req.body.email }).then(function (data) {
      if (data) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rishilnandysaxena@gmail.com",
            pass: "SirOinkdaM0opyf@ce",
          },
        });

        var mailOptions = {
          from: "rishilnandysaxena@gmail.com",
          to: req.body.email,
          subject: "Reset Password",
          html: `<div
          style="
            background-color: white;
            width: 75%;
            border-radius: 4px;
            margin: auto;
            padding: 4px;
            border: 2px black solid;
            text-align: center;
            margin-top: 10px;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div style="position: relative; width: 100%; text-align: left">
            <img
              style="width: 20%"
              src="https://cdn.dribbble.com/users/3951046/screenshots/9890244/media/9046e934c52d330a40c436b576cb4fda.jpg?compress=1&resize=400x300&vertical=top"
            />
            <span
              style="
                font-size: x-large;
                font-weight: bold;
                color: #10b981;
                position: absolute;
                top: 50%;
                bottom: 50%;
              "
              >Farm To Table</span
            >
          </div>
          <h1 style="text-align: center; font-weight: bolder; font-size: xx-large">
            Reset Password
          </h1>
          <p style="text-align: center; font-weight: 500; font-size: large">
            Click the button below to reset your password. If you didn't request this,
            please disregard this email.
          </p>
          <a
            style="
              display: block;
              width: 20%;
              margin: auto;
              background-color: #10b981;
              margin-top: 8px;
              border-radius: 6px;
              font-weight: 500;
              font-size: large;
              border: none;
              color: white;
              padding: 10px;
              cursor: pointer;
              text-decoration: none;
            "
            href="google.com"
          >
            Reset
          </a>
        </div>
        `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
  },
};
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//           to: req.body.email, // Change to your recipient
//           from: "rishilnandysaxena@gmail.com", // Change to your verified sender
//           subject: "Reset Password",
//           html: `
//         `,
//         };

//         sgMail
//           .send(msg)
//           .then(() => {
//             console.log("Email sent");
//             res.end()
//           })
//           .catch((error) => {
//             console.error(error);
//           });
