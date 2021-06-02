const http=require('http');

http.createServer((request,response)=>{
    // response.setHeader("Content-Disposition","attachment; filename=lista.csv")
    // response.writeHead(200,{"Content-Type":"application/csv"});    
    // const persona={
    //     id:1,
    //     nombre:"Mario Glz"
    // };
    // response.write(JSON.stringify(persona));

    // response.write("id, nombre\n");
    // response.write("1, Mario\n");
    // response.write("2, Alejandro\n");
    // response.write("3, Hunter\n");
    response.write("Hola Mundo");
    response.end();
}).listen(8080);

console.log("Escuchando en el puerto:",8080);