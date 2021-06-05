const express = require("express");
const app = express();
const { appendColorsAndUsernames, splitCommandParams, setNewColor, setNewUsername } = require("./utils.js");

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messages = [];
const users = [];

app.post("/joinChat", (req, res) => {
  const id = users.length;
  users.push({ id: id, username: req.body.username, color: req.body.color });
  res.end(JSON.stringify({ joinedId: messages.length, userId: id }));
});

app.post("/sendMessage", (req, res) => {
  if (req.body.message[0] == "/") {
    const [type, arg] = splitCommandParams(req.body.message);
    switch (type) {
      case "color":
        setNewColor(users, arg, req.body.userId);
        break;
      case "username":
        setNewUsername(users, arg, req.body.userId);
        break;
    }
  } else {
    messages.push(req.body);
  }
  res.end();
});

app.post("/getMessages", (req, res) => {
  const id = req.body.joinedId;
  const userMessages = messages.slice(id);
  let matched = appendColorsAndUsernames(userMessages, users);
  res.end(JSON.stringify(matched));
});

app.listen(3000, function () {
  console.log("Listenin on port jakistam ;p ");
});
