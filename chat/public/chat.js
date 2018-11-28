window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var errorDiv = document.getElementById("errordiv");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                if (messages[i].uName != "Server") {html += '<div class="message p2">'}
                else {html += '<div class="message p1">'}
                html += `<b>${messages[i].uName}: </b>`;
                html += messages[i].message + '<br /></div>';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        if(name.value == "") {
            errorDiv.innerHTML = "Enter Your Name";
        } else {
            var text = field.value;
            socket.emit('send', { message: text, uName: name.value });
            field.value = "";
        }
    };
}
