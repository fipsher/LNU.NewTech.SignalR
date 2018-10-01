"use strict";

var user = localStorage.getItem('user');
if (!user) {
    user = window.prompt("User name:");
    localStorage.setItem('user', user);
}
document.getElementById("userInput").innerText = user;

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", onMessageReceived);

connection.start().catch(function (err) {
    return console.error(err.toString());
});

$("#sendButton").click(sendMessage);

$("#messageInput").keypress(function (e) {
    if (e.which === 13) {
        sendMessage(e);
    }
});

function sendMessage(event) {
    var message = document.getElementById("messageInput").value;

    if (message) {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById("messageInput").value = "";
    }

    event.preventDefault();
}

function onMessageReceived(user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + ": " + msg;
    var li = $("<li></li>");
    li.text(encodedMsg);
   $("#messagesList").append(li);
}