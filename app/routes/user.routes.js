module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
  
    router.get("/", users.findAll);
  
    router.get("/user/:id", users.findOne);
  
    router.put("/user/:id", users.update);
  
    router.delete("/user/:id", users.delete);

    router.post('/login', users.login);

    router.post('/admin', users.admin);

    router.get('/verifyAdmin', users.verifyAdmin);
  
    app.use('/api/users', router);
  };
  