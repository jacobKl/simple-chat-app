function appendColorsAndUsernames(messages, users) {
  const matched = messages.map((message) => {
    const itsColor = users.filter((user) => user.id == message.userId)[0].color;
    const itsUsername = users.filter((user) => user.id == message.userId)[0].username;
    return { ...message, color: itsColor, username: itsUsername };
  });
  return matched;
}

function splitCommandParams(command) {
  let sanitizedCommand = command.slice(1, command.lentgh);
  sanitizedCommand = sanitizedCommand.split(" ");
  return [...sanitizedCommand];
}

function setNewColor(users, color, userId) {
  users[userId].color = color;
}

function setNewUsername(users, username, userId) {
  users[userId].username = username;
}

module.exports = {
  appendColorsAndUsernames: appendColorsAndUsernames,
  splitCommandParams: splitCommandParams,
  setNewColor: setNewColor,
  setNewUsername: setNewUsername,
};
