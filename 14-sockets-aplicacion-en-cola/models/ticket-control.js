const paht = require('path');
const fs = require('fs');

class Ticket{
    constructor(number, desktop){
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl{
    
    constructor(){
        this.last=0;
        this.today=new Date().getDate();//obtenemos el dia actual
        this.tickets=[];//array de tickets
        this.lastFour=[];//ultimos 4 tickets
        this.init();
    }

    get toJson(){
        return{
            last:this.last,
            today:this.today,
            tickets:this.tickets,
            lastFour:this.lastFour
        }
    }

    init(){
        const {today,tickets,last,lastFour}=require("../db/data.json");
        if(today===this.today){
            this.last=last;
            this.tickets=tickets;
            this.lastFour=lastFour;
        }else{
            this.saveDB();
        }
    }

    saveDB(){
        const dbPath=paht.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJson));
    }

    nextTicket(){
        this.last++;
        const ticket=new Ticket(this.last,null);
        this.tickets.push(ticket);
        this.saveDB();
        return `Ticket ${this.last}`;
    }

    attendTicket(desktop){
        if(this.tickets.length===0){
            return null;
        }
        const ticket=this.tickets.shift();//eliminamos el primer elemento del array
        ticket.desktop=desktop;
        this.lastFour.unshift(ticket);//agregamos el ticket al array
        if(this.lastFour.length>4){
            this.lastFour.splice(-1,1);//eliminamos el ultimo elemento del array
        }
        this.saveDB();
        return ticket;
    }
}

module.exports=TicketControl;