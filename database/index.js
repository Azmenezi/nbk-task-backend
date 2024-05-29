const { Sequelize } = require("sequelize");
const config = require("../config/keys");

const sequelize = new Sequelize(
  config.DATABASE.DB_NAME,
  config.DATABASE.DB_USER,
  config.DATABASE.DB_PASSWORD,
  {
    host: config.DATABASE.DB_HOST,
    dialect: "mysql",
    logging: console.log, // Enable Sequelize logging
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDb, sequelize };
