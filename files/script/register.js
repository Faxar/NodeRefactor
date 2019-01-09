var socket = io();

$('#regUser').on('click', function(){
    var userName = $('.userIn').val();
    var password = $('.passwordIn').val();

    console.log('emitting');

    socket.emit('regUs', {
        userN: userName,
        pass: password
    }, function(proms) {
        $('.promiseRes').html(proms);
    });
})