const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderItem.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}.`);
});
