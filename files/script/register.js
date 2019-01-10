var socket = io();
var stringArr = ['someString', 'More strings', 'and some more strings'];

$('#regUser').on('click', function(){
    $('.promiseRes').text(stringArr[randomNumber()]);
    
    var userName = $('.userIn').val();
    var password = $('.passwordIn').val();

    console.log('emitting');

    socket.emit('regUs', {
        userN: userName,
        pass: password
    }, function(proms) {
        $('.promiseRes').html(proms);
    });
});

randomNumber = function () {
    return Math.floor((Math.random() * 2));
};
