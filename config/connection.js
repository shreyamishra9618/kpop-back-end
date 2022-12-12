const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      port: "3301",
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

console.log('JAWSDB_URL ' + process.env.JAWSDB_URL);    
console.log('DB_NAME ' + process.env.DB_NAME);
console.log('DB_USER ' + process.env.DB_USER);
console.log('DB_PASSWORD ' + process.env.DB_PASSWORD);

module.exports = sequelize;
