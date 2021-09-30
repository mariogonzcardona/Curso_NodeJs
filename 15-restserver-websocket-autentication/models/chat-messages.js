class Message{
    constructor(uid,name,message){
        this.uid = uid;
        this.name = name;
        this.message = message;
    }
}

class PrivateMessage{
    constructor(uid,name,message){
        this.uid = uid;
        this.name = name;
        this.message = message;
    }
}

class ChatMessages{
    constructor(){
        this.message =[];
        this.privateMessage =[];
        this.users = {};
    }

    get lastTenMessages(){
        this.message=this.message.splice(0,10);
        return this.message;
    }
    get lastTenPrivateMessages(){
        this.privateMessage=this.privateMessage.splice(0,10);
        return this.privateMessage;
    }
    get usersArray(){
        return Object.values(this.users);
    }
    sendMessage(uid,name,message){
        this.message.unshift(
            new Message(uid,name,message)
        );
    }

    sendPrivatedMessage(uid,name,message){
        this.privateMessage.unshift(
            new PrivateMessage(uid,name,message)
        );
    }

    connectUser(user){
        this.users[user.id] = user;
    }

    disconnectUser(uid){
        delete this.users[uid];
    }
}

module.exports = ChatMessages;