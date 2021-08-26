module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    product_id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    image:{
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Product;
};
