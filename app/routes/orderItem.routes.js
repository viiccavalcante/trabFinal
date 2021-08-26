module.exports = app => {
    const orderItems = require("../controllers/orderItem.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", orderItems.create);
  
    router.get("/", orderItems.findAll);
  
    router.get("/orderItem/:id", orderItems.findOne);
  
    router.put("/orderItem/:id", orderItems.update);
  
    router.delete("/orderItem/:id", orderItems.delete);
  
    app.use('/api/orderItems', router);
  };
  