module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    passwordDate: {
      type: Sequelize.DATE,
    },
  });
  return User;
};
