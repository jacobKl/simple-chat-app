class ChatClient {
  constructor() {
    this.joinFormRef = document.querySelector("#login");
    this.nameInputRef = document.querySelector("#nickname");
    this.chatRef = document.querySelector("#chat");
    this.messageRef = document.querySelector("#message");
    this.chatBody = document.querySelector("#messages");
    this.usernameRef = document.querySelector("#username");
  }

  init() {
    this.joinFormRef.addEventListener("submit", (e) => {
      e.preventDefault();
      this.joinChat();
    });

    this.chatRef.addEventListener("submit", (e) => {
      e.preventDefault();
      this.recognizeCommand();
    });
  }

  joinChat() {
    this.username = this.nameInputRef.value;

    fetch("/joinChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: this.username, color: this.getRandomHexColor() }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.joinedId = res.joinedId;
        this.userId = res.userId;
        this.showChat();
        this.getChatStatus();
      });
  }

  showChat() {
    this.joinFormRef.classList.remove("d-flex");
    this.joinFormRef.classList.add("d-none");
    this.chatRef.classList.add("d-flex");
    this.usernameRef.innerHTML = "<b>" + this.username + "</b>";
  }

  sendMessage() {
    const data = JSON.stringify({
      userId: this.userId,
      message: this.messageRef.value,
    });
    fetch("/sendMessage", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.messageRef.value = "";
    this.getChatStatus();
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  getChatStatus() {
    fetch("/getMessages", {
      method: "POST",
      body: JSON.stringify({ joinedId: this.joinedId }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const messages = res.map(
          (message) => `<div class='col-12 d-flex'><b style="color: ${message.color}">${message.username}</b>:&nbsp; <p class='m-0 message-inner'> ${message.message}</p></div>`
        );
        this.chatBody.innerHTML = "";
        messages.forEach((mess) => (this.chatBody.innerHTML += mess));
        if ($(".message-inner").length) {
          $(".message-inner").emoticonize({ delay: 0 });
        }
      })
      .then((res) => setTimeout(this.getChatStatus.bind(this), 3000));
  }

  getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  recognizeCommand() {
    if (this.messageRef.value == "/quit") {
      location.reload();
    } else {
      this.sendMessage();
    }
  }
}
