var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(express.static(__dirname + "/node_modules"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").createServer(app);
var io = require("socket.io")(server);

var light = { state: false };

app.get("/", function(req, res, next) {
    res.render("Home");
});

io.on("connection", function(socket) {
    console.log("client connected...");

    socket.on("disconnect", function() {
        console.log("Client disconnected!");
    });

    socket.emit("on led");

    socket.on("browser-send-data", function(data) {
        if (data == "on led") {
            console.log("Server -> on led");
            socket.broadcast.emit("on led");
        } else {
            console.log("Server -> off led");
            socket.broadcast.emit("off led");
        }
    });

    socket.on("esp-send-data", function(data) {
        if (data == "led on") {
            console.log("ESP -> led on");
            socket.broadcast.emit("server-send-browser", "led on");
        } else {
            console.log("ESP -> led off");
            socket.broadcast.emit("server-send-browser", "led off");
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server is up and running on port: " + PORT);
});