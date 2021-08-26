module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.post("/", products.create);

  router.get("/", products.findAll);

  router.get("/product/:id", products.findOne);

  router.put("/product/:id", products.update);

  router.delete("/product/:id", products.delete);

  app.use('/api/products', router);
};
