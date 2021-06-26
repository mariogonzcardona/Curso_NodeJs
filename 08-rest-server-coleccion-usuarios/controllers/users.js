const {response}=require('express');
const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');


const usersGet=async(req, res=response) => {
    
    const {limite=5,desde=0}=req.query;
    const query={estado:true}
    

    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}
const usersPut= async(req, res=response) => {
    const id=req.params.id;
    const {_id,password,google,correo,...resto}=req.body;

    // TODO validar contra DB
    if (password) {
        // Encriptar el password
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password, salt);
    }

    const usuarioDB=await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuarioDB);
}
const usersPost=async (req, res=response) => {

    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol});

    

    // Encriptar el password
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt);

    // Guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}
const usersDelete= async(req, res=response) => {
    const {id}=req.params

    // Borrado Fisicamente
    // const usuario=await Usuario.findByIdAndDelete(id);

    const usuarioDelete=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        usuarioDelete
    });
}
const usersPatch=(req, res=response) => {
    res.json({
        msg: 'Patch API Controller'
    });
}

module.exports={
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
}
