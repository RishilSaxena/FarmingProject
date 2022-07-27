const apiControllers = require("../controllers/apiControllers");
const generateUploadURL = require("../controllers/s3.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.post("/api/register", function (req, res) {
    apiControllers.register(req, res);
  });
  app.post("/api/login", function (req, res) {
    apiControllers.login(req, res);
  });
  app.get("/api/getUserData", function (req, res) {
    apiControllers.getUserData(req, res);
  });
  app.get("/api/logout", function (req, res) {
    res.clearCookie("id");
    res.end();
  });
  app.post(
    "/api/updateSellerData",
    upload.single("image"),
    function (req, res, next) {
      apiControllers.updateSellerData(req, res, next);
    }
  );
  app.get("/api/getSellerData/:id", function (req, res) {
    apiControllers.getSellerData(req, res);
  });
  app.get("/api/s3Url", async function (req, res) {
    const url = await generateUploadURL();
    console.log(url);
    res.send(url);
  });
  app.get("/api/getAllProducts", function (req, res) {
    apiControllers.getAllProducts(req, res);
  });
  app.get("/api/findZipcodesNearby/:zipcode", function (req, res) {
    apiControllers.findZipcodesNearby(req, res);
  });
  app.get("/api/getCookie", function (req, res) {
    apiControllers.getCookie(req, res);
  });
  app.post("/api/addToCart", function (req, res) {
    apiControllers.addToCart(req, res);
  });
  app.get("/api/getCart", function (req, res) {
    apiControllers.getCart(req, res);
  });
  app.post("/api/updateQuantity", function (req, res) {
    apiControllers.updateQuantity(req, res);
  });
  app.post("/api/deleteItem", function (req, res) {
    apiControllers.deleteItem(req, res);
  });
  app.post("/api/submitReview/:id", function (req, res) {
    apiControllers.submitReview(req, res);
  });
  app.post("/api/sendResetEmail", function (req, res) {
    apiControllers.sendResetEmail(req, res);
  })
};
