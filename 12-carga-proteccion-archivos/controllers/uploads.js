const path=require('path');
const fs=require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const {reponse, response}=require('express');
const { uploadFile } = require('../helpers/upload-file');
const {User,Product}=require('../models/index');

const uploadFiles=async function(req,res=response){
    try {
        // const name= await uploadFile(req.files,["txt","md"],"textos");
        const name= await uploadFile(req.files,undefined,"imgs");
        res.json({name});   
    } catch (error) {
        res.status(400).json({msg: error});
    }
}

const updateImageCloudinary=async function(req,res=response){
    
    const {id,collection}=req.params;
    let model;
    switch (collection) {
        case 'users':
            model=await User.findById(id);
            if(!model){
                return res.status(404).json({msg:"User not found"});
            }
            break;
        case 'products':
            model=await Product.findById(id);
            if(!model){
                return res.status(404).json({msg:"Product not found"});
            }
            break;
        default:
            return res.status(400).json({msg: 'No se encontro la coleccion'});
    }

    // Cleaning preview images
    if(model.img){
        // TODO: Eliminar imagen de cloudinary
        const nameArr=model.img.split('/');
        const name=nameArr[nameArr.length-1];
        const [public_id]=name.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath}=req.files.fileName
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath)
    
    model.img=secure_url;
    await model.save();
    res.json(model);
}

const updateImage=async function(req,res=response){
    
    const {id,collection}=req.params;
    let model;
    switch (collection) {
        case 'users':
            model=await User.findById(id);
            if(!model){
                return res.status(404).json({msg:"User not found"});
            }
            break;
        case 'products':
            model=await Product.findById(id);
            if(!model){
                return res.status(404).json({msg:"Product not found"});
            }
            break;
        default:
            return res.status(400).json({msg: 'No se encontro la coleccion'});
    }

    // Cleaning preview images
    if(model.img){
        const imagePath=path.join(__dirname,'../uploads',collection,model.img);
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }
    }
    model.img=await uploadFile(req.files,undefined,collection);
    await model.save();
    res.json(model);
}

const showImage = async (req,res=response)=>{
    const {id,collection}=req.params;
    let model;
    switch (collection) {
        case 'users':
            model=await User.findById(id);
            if(!model){
                return res.status(404).json({msg:"User not found"});
            }
            break;
        case 'products':
            model=await Product.findById(id);
            if(!model){
                return res.status(404).json({msg:"Product not found"});
            }
            break;
        default:
            return res.status(400).json({msg: 'No se encontro la coleccion'});
    }

    // Cleaning preview images
    if(model.img){
        const imagePath=path.join(__dirname,'../uploads',collection,model.img);
        if(fs.existsSync(imagePath)){
            return res.sendFile(imagePath);
        }
    }
    const imagePath=path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(imagePath);
}


module.exports={
    uploadFiles,
    updateImage,
    showImage,
    updateImageCloudinary
}