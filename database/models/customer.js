const Sequelize = require("sequelize");
const { sequelize } = require("..");

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM,
      values: ["male", "female"],
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Customer;
