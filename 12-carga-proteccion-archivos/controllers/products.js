const {response} = require('express');
const {Product} = require('../models');

// Get all products
const getAllProducts = async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    const query={state:true}
    const [total,products]=await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate("user","nombre")
            .populate("category","name")
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        products
    });
}

// create product
const createProduct = async(req, res=response) => {
    const {state,user,...body}=req.body;
    const productDB=await Product.findOne({name:body.name});
    if(productDB){
        return res.status(400).json({msg:'Product already exists'});
    }   
    // Generate data to save product
    const data={
        ...body,
        name:body.name.toUpperCase(),
        user:req.usuario._id
    }
    const product=new Product(data);
    // Save category
    await product.save();
    res.status(201).json({msg:'Product created'});
}

// Get Product By Id
const getProductById=async(req,res=response)=>{
    const {id}=req.params;
    const product=await Product.findById(id)
                        .populate("user","nombre")
                        .populate("category","name");
    res.json(product);
}

// Update Product
const updateProduct=async(req,res=response)=>{
    const {id}=req.params;
    const {state,user,...data}=req.body;
    
    if(data.name){
        data.name=data.name.toUpperCase();
    }
    console.log(req.body);
    data.user=req.usuario._id;
    const product=await Product.findByIdAndUpdate(id,data,{new:true});

    res.json(product);
}

// Delete Product By Id
const deleteProduct=async(req,res=response)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,{state:false},{new:true});
    res.json(product);
}

module.exports={
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};