// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender= document.querySelector('button');
const lblTicket= document.querySelector('small');
const divAlerta= document.querySelector('.alert');
const lblPendientes= document.querySelector('#lblPendientes');

const searchParams=new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio=searchParams.get('escritorio');
lblEscritorio.innerHTML=escritorio;
divAlerta.style.display='none';

const socket=io();

// To listen to the server
socket.on('connect',()=>{
    // console.log('Connected to server');
    btnAtender.disabled=false;
});

socket.on('disconnect',()=>{
    btnAtender.disabled=true;
});

socket.on("pending-tickets",(slopes)=>{
    if(slopes===0){
        lblPendientes.style.display='none';
        divAlerta.style.display='';
    }else{
        lblPendientes.style.display='';
        lblPendientes.innerText=slopes;
        divAlerta.style.display='none';
    }
});


btnAtender.addEventListener('click',()=>{
    
    socket.emit("attend-ticket",{escritorio},({ok,ticket,msg})=>{
        if(!ok){
            lblTicket.innerText="Nadie";
            return divAlerta.style.display='';
        }
        lblTicket.innerText=`Ticket ${ticket.number}`;
    });
});