  const controller = require('../controllers/index.js')
module.exports = app => {

  // Create a new question
  app.post('/products', controller.create);

  // Retrieve a single Q&A page
  app.get('/products/:productId', controller.findOne);

  // Update question
  app.put('/products/:productId', controller.update);

  // Delete question
  app.delete('/products/:productId', controller.delete);
}