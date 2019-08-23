const mongoose = require("mongoose");

// working with env variables
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/QuestionAndAnswers'
  , {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to mongoDB"));

const questionNAnswersSchema = new mongoose.Schema({
  product: Number,
  questions: [
    {
      question_id: Number,
      question: String,
      answers: [
        {
          user: String,
          answer: String,
          createdAt: Date
        }
      ],
      votes: Number
    }
  ]
});

// to use schema, it must be converted to a Model
module.exports = mongoose.model("QuestionsTenMil", questionNAnswersSchema);
