var code = prompt('Please, enter your remote code here: ');

var socket = io('https://qwile.com:3000');
socket.emit('mobileconnect', code);

$(function() {

    $('.control').click(function() {
        socket.emit('buttonpress', {
            action: this.id,
            value: $(this).data('muted') || $(this).data('fullscreened')
        });
    });

    $("#mute").click(function() {
        $(this).data('muted', !$(this).data('muted'));
    });
    
    $("#fullscreen").click(function() {
        $(this).data('fullscreened', !$(this).data('fullscreened'));
    });
    
    $("#theater").click(function() {
       $("#fullscreen").data('fullscreened', false);
    });
    
    // volume
    
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        socket.emit('volumechange', acceleration.z);       
    }
    
    $('#shadow').click(function() {
        window.removeEventListener('devicemotion', deviceMotionHandler, false);
        $(this).hide();
        socket.emit('volumechangestop');
    });
    
    $('button.volume').click(function() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
            $('#shadow').show();
            socket.emit('volumechangestart');
        } else {
            alert("Sorry, your device doesn't support device motion!");
        } 
    });
    
});