const Sequelize = require('sequelize');

module.exports = (sequelize, Datatypes) => {
  const Book = sequelize.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Title Required"
      }
    }
  },
  author: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Author Required"
      }
    }
  },
  genre: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  }
}, {sequelize});
  Book.associate = function(models) {

  };
  return Book;
};
