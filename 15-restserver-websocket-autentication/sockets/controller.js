const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers");
const {ChatMessages} = require("../models");

const chatMessages=new ChatMessages()

const socketController = async(socket = new Socket, io) => {
    console.log("socket connected");
    const usuario=await verifyJWT(socket.handshake.headers["x-token"])
    if(!usuario){
        return socket.disconnect();
    }
    
    //Add connected user
    chatMessages.connectUser(usuario)
    io.emit('active-users',chatMessages.usersArray)
    socket.emit('recive-message',chatMessages.lastTenMessages)

    //Connect to private chat
    socket.join(usuario.id);//global, socket.id, usuario.id

    //Clean disconnected user
    socket.on("disconnect",()=>{
        chatMessages.disconnectUser(usuario.id)
        io.emit('active-users',chatMessages.usersArray)
    });

    //Send message
    socket.on("send-message",({uid,mensaje})=>{
        if(uid){
            //Private message
            chatMessages.sendPrivatedMessage(usuario.id,usuario.nombre,mensaje);
            socket.to(uid).emit("private-message",chatMessages.lastTenPrivateMessages);
            socket.emit("private-message",chatMessages.lastTenPrivateMessages);
        }
        else{
            chatMessages.sendMessage(usuario.id,usuario.nombre,mensaje);
            io.emit('recive-message',chatMessages.lastTenMessages);
        }
    });
}

module.exports = { socketController };