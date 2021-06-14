const {response}=require('express')

const usersGet=(req, res=response) => {
    const {q,nombre,algo}=req.query;
    
    res.json({
        msg: 'Get API Controller',
        q,
        nombre,
        algo
    });
}
const usersPut=(req, res=response) => {
    const id=req.params.id;

    res.json({
        msg: 'Put API Controller',
        id
    });
}
const usersPost=(req, res=response) => {
    const {nombre,edad}=req.body;
    res.json({
        msg: 'Post API Controller',
        nombre,
        edad
    });
}
const usersDelete=(req, res=response) => {
    res.json({
        msg: 'Delete API Controller'
    });
}
const usersPatch=(req, res=response) => {
    res.json({
        msg: 'Patch API Controller'
    });
}

module.exports={
    usersGet,
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
}