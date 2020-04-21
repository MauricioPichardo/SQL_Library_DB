const express = require('express');
const router = express.Router();
const Book = require('../models/').Book;



router.get("/", async(req, res) => {
  res.redirect("/books")
  }
);


/* GET home page. */
router.get("/books", async(req, res) => {
  try {
  library = await Book.findAll();
  res.render("index", library );
  } catch(error) {
    return  next(error)
  }
});

/* New book */
router.get('/books/new', async(req, res) => {
  res.render("new_book", { book: {}, title: "New book" });
});

/* create  book. */
router.post('/books/new', async(req, res) => {
  let book;
  try {
      book = await Book.create({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year })
      res.redirect("/books/"+book.id);
  } catch(error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
      res.render("new_book", { book, errors: error.errors, title: "Not Updated" })
    } else {
    return   next(error)
    }
  }}
);

/* Edit book =*/
router.get("/books/:id", async(req, res) => {
  try {
      const book = await Book.findByPk(req.params.id);
      res.render("update_book", { book, title: "Update book" });
  }
 catch(error) {
      return next(error)
}});

/* Update book. */
router.post('/books/:id', async (req, res) => {
  let book;
  try {
        book=await Book.findByPk(req.params.id);
        await book.update({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
        res.redirect("/books/" + book.id);
  } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build({ title: req.body.title, author: req.body.author, genre: req.body.genre, year: req.body.year });
        book.id = req.params.id;
        res.render("update_book", { book, errors: error.errors, title: "Update Book Failed" })
    } else {
            return    next(error)
          }}});


/* Delete book  */
router.post('/books/:id/delete', async (req ,res) => {
  try {
  const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  } catch (error) {
          return  next(error)
        }});




module.exports = router;
