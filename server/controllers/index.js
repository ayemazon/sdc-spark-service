const Questions = require('../database/schema');

// Create a new question
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Question empty',
    });
  }

  const question = new Questions({
    product: req.body.product,
    questions: [{
      question_id: req.body.questions[0].question_id,
      question: req.body.questions[0].question,
      votes: req.body.questions[0].votes,
        answers: [{
            user: req.body.questions[0].answers[0].user,
            answer: req.body.questions[0].answers[0].answer,
            createdAt: new Date
        }],
    }]
  });

  question
    .save()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error creating question'
      });
    });
};

// Read a single Q&A page w/ productId
exports.findOne = (req, res) => {
  Questions.find({product: req.params.productId})
    .then(question => {
      if (!question) {
        return res.status(404).send({
          message: `Q&A page not found with ID ${req.params.productId}`,
        });
      }
      res.send(question);
    })
    .catch(err => res.status(500).send({
      message: err.message || `Error retrieving Q&A page with ID ${req.params.productId}`
    }));
};

// Update
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Update content is empty'
    });
  }
  Questions.updateOne({product: req.params.productId}, {
    product: req.body.product,
    questions: [{
        votes: req.body.questions[0].votes,
        question_id: req.body.questions[0].question_id,
        question: req.body.questions[0].question,
        answers: [{
            user: req.body.questions[0].answers[0].user,
            answer: req.body.questions[0].answers[0].answer,
            createdAt: new Date
        }],
    }]
  })
    .then(question => {
      if (!question) {
        return res.status(404).send({
          message: `Q&A page not found with ID ${req.params.productId}`
        });
      }
      console.log(req.body)
      res.send(question);
    })
    .catch(err => res.status(500).send({
        message: err.message || `Error updating Q&A page with ID ${req.params.productId}`
    }));
}

// Delete a question
exports.delete = (req, res) => {
  Questions.deleteOne({product: req.params.productId})
    .then(question => {
      if (!question) {
        return res.status(404).send({
          message: `Q&A page not found with ID ${req.params.productId}`
        });
      }
      res.send({message: 'Q&A page deleted successfully!'});
    })
    .catch(err => res.status(500).send({
      message: err.message || `Could not delete Q&A page with ID ${req.params.productId}`
    }));
};