/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const {Books} = require('../model')
module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const books = await Books.find({}, '-__v -comments')
        // res.json({"_id": books._id, "title": books.title, "commentcount": books.commentcount });
        res.json(books);
      }
      catch(err){
        console.log(err);
      }
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) return res.send("missing required field title");
      try {
        const book = new Books({
          "title": title
        })

        const new_book = await book.save();
        res.json({ "title": new_book.title, "_id": new_book._id });
      }
      catch(err){

      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      try {
        await Books.deleteMany();
        res.send("complete delete successful");
      }
      catch(err){

      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    
      try {
        const book = await Books.findOne({_id: bookid});
        if (!book) return res.send("no book exists");

        res.json({"_id": bookid, "title": book.title, "comments": book.comments})
      }
      catch(err){
        res.send("no book exists");
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send("missing required field comment");

      try {
        const book = await Books.findOne({_id: bookid})
        if(!book) return res.send("no book exists");

        book.comments.push(comment);
        book.commentcount = book.commentcount+1;

        let result = await book.save();
        res.json({"_id": result._id, "title": result.title, "comments": result.comments})
      }
      catch(err){
        
        res.send("no book exists");
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      try{
        const book = await Books.findOneAndDelete({"_id": bookid});
        if(!book) return res.send("no book exists");

        res.send("delete successful");
      }
      catch(err){
        return res.send("no book exists");
      }
    });
  
};
