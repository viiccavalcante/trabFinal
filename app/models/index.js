const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.users    = require("./user.model.js")(sequelize, Sequelize);
db.orders    = require("./order.model.js")(sequelize, Sequelize);
db.order_items  = require("./orderItem.model.js")(sequelize, Sequelize);

module.exports = db;
