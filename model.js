const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    commentcount: {
        default: 0,
        type: Number
    },
    comments: {
        type: [String]
    }
})

// const commentsSchema = new mongoose.Schema({
//     book_id: {
//         required: true,
//         type: String
//     },
//     comment: {
//         required: true,
//         type: String
//     }
// })

const Books = mongoose.model('Books', booksSchema);
// const Comments = mongoose.model('Comments', commentsSchema);
module.exports = {Books}