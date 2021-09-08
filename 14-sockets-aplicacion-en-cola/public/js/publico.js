const lblTicket1=document.querySelector('#lblTicket1');
const lblEscritorio1=document.querySelector('#lblEscritorio1');
const lblTicket2=document.querySelector('#lblTicket2');
const lblEscritorio2=document.querySelector('#lblEscritorio2');
const lblTicket3=document.querySelector('#lblTicket3');
const lblEscritorio3=document.querySelector('#lblEscritorio3');
const lblTicket4=document.querySelector('#lblTicket4');
const lblEscritorio4=document.querySelector('#lblEscritorio4');

const socket=io();

socket.on("current-state",(payload)=>{
    const audio=new Audio('./audio/new-ticket.mp3');
    audio.play();


    const [t1,t2,t3,t4]=payload;
    
    if(t1){
        lblTicket1.innerText="Ticket "+t1.number;
        lblEscritorio1.innerText=t1.desktop
    }
    if(t2){
        lblTicket2.innerText="Ticket "+t2.number;
        lblEscritorio2.innerText=t2.desktop
    }
    if(t3){
        lblTicket3.innerText="Ticket "+t3.number;
        lblEscritorio3.innerText=t3.desktop
    }
    if(t4){
        lblTicket4.innerText="Ticket "+t4.number;
        lblEscritorio4.innerText=t4.desktop
    }
    
});