const express = require("express");
const app = express();

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messages = [];

app.post("/joinChat", (req, res) => {
  res.end(JSON.stringify(messages.length));
});

app.post("/sendMessage", (req, res) => {
  messages.push(req.body);
  res.end();
});

app.post("/getMessages", (req, res) => {
  const id = req.body.joinedId;
  res.end(JSON.stringify(messages.slice(id)));
});

app.listen(process.env.PORT, function () {
  console.log("Listenin on port jakistam ;p ");
});
