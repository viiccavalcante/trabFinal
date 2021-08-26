module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      order_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'user_id', 
       }
      }, 
   
    });
  
    return Order;
  };
  