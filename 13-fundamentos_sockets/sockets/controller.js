const socketController=(socket) => {

    console.log('Client is Connected', socket.id);
    socket.on('disconnect', () => {
        console.log('Client is Disconnected',socket.id);
    });
    socket.on('send-message', (payload,callback) => {
        const id=123456;
        callback(id);
        socket.broadcast.emit('send-message', payload);
    });
}

module.exports={socketController};