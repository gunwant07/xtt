const express = require('express');
const server = express();
const port = process.env.PORT || 3000
var cors = require('cors');
server.use(express.json());

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected');
  } catch (err) {
    console.log(err);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

server.post('/demo', async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
});

server.listen(port, () => {
 console.log(`Server listening on port ${port}`);
  console.log('server started');
});
