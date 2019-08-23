const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
// SERVER static files
app.use(express.static(path.join(__dirname + "/../client/dist")));

require('./routes/index.js')(app);
// default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Q&A section!',
  });
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
