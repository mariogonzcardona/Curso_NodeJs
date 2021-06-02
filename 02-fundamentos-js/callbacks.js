// setTimeout(() => {
//     console.log("Hola Mundo");
// }, 1000);

const getUserById=(id,callback)=>{
    const user={
        id,
        name:"Mario"
    }

    setTimeout(() => {
        callback(user);
    }, 1500);
};

// getUserById(15,(user)=>{
//     console.log(user.id);
//     console.log(user.name.toUpperCase());
// });

getUserById(15,({id,name})=>{
    console.log(id);
    console.log(name.toUpperCase());
});