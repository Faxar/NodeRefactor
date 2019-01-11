var socket = io();
var stringArr = ['someString', 'More strings', 'and some more strings'];

$('#regUser').on('click', function(){
    // $('.promiseRes').text(stringArr[randomNumber()]);
    
    var userName = $('.userIn').val();
    var password = $('.passwordIn').val();

    console.log('emitting');

    socket.emit('regUs', {
        userN: userName,
        pass: password
    }, function(proms) {
        if(proms === 'User Created') {
            setTimeout(changePage(), 3000);
        }
        $('.promiseRes').text(proms);
    });
});

randomNumber = function () {
    return Math.floor((Math.random() * 2));
};

changePage = function () {
    location.href = "index.html"
};
