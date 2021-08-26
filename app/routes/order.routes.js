module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", orders.create);
  
    router.get("/", orders.findAll);
  
    router.get("/order/:id", orders.findOne);
  
    router.put("/order/:id", orders.update);
  
    router.delete("/order/:id", orders.delete);

  
    app.use('/api/orders', router);
  };
  