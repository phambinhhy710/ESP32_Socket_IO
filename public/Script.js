var socket = io("https://esp8266-socket-io.herokuapp.com/");

socket.on("server-send-browser", function(data) {
    if (data == "led on") {
        $("#console").text("LED ON");
        $("#led").css("background-color", "green");
    } else {
        $("#console").text("LED OFF");
        $("#led").css("background-color", "red");
    }
});

$(function() {
    $("#button").on("click", function() {
        if ($("#console").text() == "LED ON") {
            socket.emit("browser-send-data", "off led");
        } else {
            socket.emit("browser-send-data", "on led");
        }
    })

});