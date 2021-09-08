// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCreate=document.querySelector('button');

const socket=io();

// To listen to the server
socket.on('connect',()=>{
    // console.log('Connected to server');
    btnCreate.disabled=false;
});

socket.on('disconnect',()=>{
    btnCreate.disabled=true;
});

socket.on("last-ticket",(last)=>{
    lblNuevoTicket.textContent="Ticket "+ last;
});


btnCreate.addEventListener('click',()=>{
    
    socket.emit('next-ticket',null,(ticket)=>{
        lblNuevoTicket.innerHTML=ticket;
    });
});