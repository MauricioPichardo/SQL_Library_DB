
const express = require('express');
const router = express.Router();
const Book = require('../models/').Book;



function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

router.get("/", asyncHandler(async(req, res) => {
  res.redirect("/books")
  }
));


/* GET home page. */
router.get("/books", asyncHandler(async(req, res) => {
  library = await Book.findAll();
  if(library) {
    res.render("index", library );
  } else {
    res.sendStatus(404);
  }
}));

/* New book */
router.get('/books/new',  asyncHandler(async(req, res) => {
  res.render("new_book", { book: {}, title: "New book" });
}));

/* create  book. */
router.post('/books/new', asyncHandler(async(req, res) => {
  let book;
  try {
      book = await Book.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
      res.redirect("/books/"+book.id);
  } catch(error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
      res.render("new_book", { book, errors: error.errors, title: "Not Updated" })
    } else {
      throw error;
    }
  }
}));

/* Edit book =*/
router.get("/books/:id", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update_book", { book, title: "Update book" });
  } else {
    res.sendStatus(404);
  }
}));

/* Update book. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
      book=await Book.findByPk(req.params.id);
      if(book) {
        await book.update({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
        res.redirect("/books/" + book.id);
      } else {
        res.sendStatus(404);
      }
  } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
        book.id = req.params.id;
        res.render("update_book", { book, errors: error.errors, title: "Update Book Failed" })
      } else {
        throw error;
      }
    }
  }));


/* Delete book  */
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.redirect("/books");
  }
}));




module.exports = router;
