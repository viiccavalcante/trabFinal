module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      user_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    });
  
    return User;
  };
  