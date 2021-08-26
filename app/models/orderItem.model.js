module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("orderItem", {
      order_item_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders', 
          key: 'order_id', 
       }
      }, 
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', 
          key: 'product_id', 
       }
      }, 
   
    });
  
    return OrderItem;
  };
  