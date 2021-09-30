const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://curso-node-restserver-marioglz.herokuapp.com/api/auth/';
let usuario=null;
let socket=null;

// Referencias de html
const txtUid=document.querySelector('#txtUid');
const txtMensaje=document.querySelector('#txtMensaje');
const ulUsuarios=document.querySelector('#ulUsuarios');
const ulMensajes=document.querySelector('#ulMensajes');
const ulMensajesPrivados=document.querySelector('#ulMensajesPrivados');
const btnSalir=document.querySelector('#btnSalir');

const validarJWT=async ()=>{
    const token=localStorage.getItem('token') || '';
    if(token.length<=10){
        window.location.href='index.html';
        throw new Error('Token no valido');
    }
    const resp=await fetch(url,{
        headers:{"x-token":token}
    });
    const{ usuario:userDB,token:tokenDB}=await resp.json();
    localStorage.setItem('token',tokenDB);
    usuario=userDB;

    document.title=`Chat - ${usuario.nombre}`;

    await connectSocket();
}

const connectSocket=async ()=>{
    socket=io({
        "extraHeaders":{
            'x-token':localStorage.getItem('token')
        }
    });

    socket.on('connect',()=>{
        console.log('Socket online');
    });
    socket.on('disconnect',()=>{
        console.log('Socket offline');
    });

    socket.on('recive-message',drawMessages);

    socket.on('active-users',drawUsers);

    socket.on('private-message',drawPrivateMessages);
    
};

const drawUsers=(users=[])=>{
    let usersHTML='';
    users.forEach(({nombre,uid})=>{
        usersHTML+=`
        <li>
            <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">UID: ${uid}</span>
            </p>
        </li>
        `;
    });
    ulUsuarios.innerHTML=usersHTML;
};

txtMensaje.addEventListener('keyup',(e)=>{
    const uid=txtUid.value;
    const mensaje=txtMensaje.value;
    if(e.keyCode!==13){
        return;
    }
    if(mensaje.length===0){
        return;
    }
    socket.emit('send-message',{uid,mensaje});
    txtMensaje.value='';
});

const drawMessages=(mensajes=[])=>{
    let mensajesHTML='';
    mensajes.forEach(({name,message})=>{
        mensajesHTML+=`
        <li>
            <p>
                <span class="text-primary">${name}: </span>
                <span>${message}</span>
            </p>
        </li>
        `;
    });
    ulMensajes.innerHTML=mensajesHTML;
};

const drawPrivateMessages=(mensajes=[])=>{
    let mensajesHTML='';
    mensajes.forEach(({ name, message})=>{
        mensajesHTML+=`
        <li>
            <p>
                <span class="text-danger">${name}: </span>
                <span>${message}</span>
            </p>
        </li>
        `;
    });
    ulMensajesPrivados.innerHTML=mensajesHTML;
};

const main=async ()=>{
    await validarJWT();
}

main();
// const socket=io();