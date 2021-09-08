const TicketControl=require('../models/ticket-control');
const ticketControl=new TicketControl();

const socketController=(socket) => {

    console.log('Client is Connected', socket.id);

    socket.emit("last-ticket",ticketControl.last);
    socket.emit("current-state",ticketControl.lastFour);
    socket.emit("pending-tickets",ticketControl.tickets.length);

    socket.on('disconnect', () => {
        console.log('Client is Disconnected',socket.id);
    });
    socket.on('next-ticket', (payload,callback) => {
        const next=ticketControl.nextTicket();
        callback(next);

        // TODO:Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit("pending-tickets",ticketControl.tickets.length);
    });
    socket.on('attend-ticket', ({escritorio},callback) => {
        if(!escritorio){
            return callback({
                ok:false,
                msg:'El escritorio es necesario'
            });
        }
        const ticket=ticketControl.attendTicket(escritorio);

        // TODO:Notificar cambio en los ultimos4
        socket.broadcast.emit("current-state",ticketControl.lastFour);
        socket.emit("pending-tickets",ticketControl.tickets.length);
        socket.broadcast.emit("pending-tickets",ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok:false,
                msg:'No hay tickets pendientes'
            });
        }else{
            callback({
                ok:true,
                ticket
            });
        }
    });
}

module.exports={socketController};