// References
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');

const txtMessage=document.getElementById('txtMessage');
const btnSend=document.getElementById('btnSend');

const socket=io();

// To listen to the server
socket.on('connect',()=>{
    // console.log('Connected to server');
    lblOffline.style.display='none';
    lblOnline.style.display='';
});

socket.on('disconnect',()=>{
    console.log('Disconnected from server');
    lblOnline.style.display='none';
    lblOffline.style.display='';
});

socket.on('send-message',payload=>{
    console.log(payload);
});

btnSend.addEventListener('click',()=>{
    const message=txtMessage.value;
    const payload={
        message,
        id:"123456",
        fecha:new Date().getTime()
    };
    socket.emit('send-message',payload,(id)=>{
        console.log("Desde el server",id);
    });
});