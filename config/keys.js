require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  TOKEN: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TOKEN_EXP: process.env.JWT_TOKEN_EXP,
  },
  DATABASE: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },
};

for (const key in config) {
  if (!config[key]) {
    throw new Error(`Environment variable ${key} is missing`);
  }
}

module.exports = config;
