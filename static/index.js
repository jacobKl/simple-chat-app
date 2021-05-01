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
      this.sendMessage();
    });
  }

  joinChat() {
    this.username = this.nameInputRef.value;

    fetch("/joinChat", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        this.joinedId = res;
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
      username: this.username,
      message: this.messageRef.value,
    });
    fetch("/sendMessage", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.chatBody.innerHTML += `<div class='col-12 d-flex'><b>${this.username}</b>: ${this.messageRef.value}</div>`;
    this.messageRef.value = "";
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
        const messages = res.map((message) => `<div class='col-12 d-flex'><b>${message.username}</b>: ${message.message}</div>`);
        this.chatBody.innerHTML = "";
        messages.forEach((mess) => (this.chatBody.innerHTML += mess));
      })
      .then((res) => setTimeout(this.getChatStatus.bind(this), 3000));
  }
}
