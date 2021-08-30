const { response }=require('express');
const {Category}=require('../models');

// Get all categories
const getAllCategories = async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    const query={state:true}
    const [total,categories]=await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate("user","nombre")
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categories
    });
}

// create category
const createCategory = async(req, res=response) => {
    const name=req.body.name.toUpperCase();
    const categoryDB=await Category.findOne({name});
    if(categoryDB){
        return res.status(400).json({msg:'Category already exists'});
    }   
    // Generate data to save category
    const data={
        name,
        user:req.usuario._id
    }
    const category=new Category(data);
    // Save category
    await category.save();
    res.status(201).json({msg:'Category created'});
}

// Get Category By Id
const getCategoryById=async(req,res=response)=>{
    const {id}=req.params;
    const category=await Category.findById(id).populate("user","nombre");
    res.json(category);

}
// Update Category
const updateCategory=async(req,res=response)=>{
    const {id}=req.params;
    // console.log(req.body);
    const {state,user,...data}=req.body;
    
    data.name=data.name.toUpperCase();
    data.user=req.body.user._id;
    const category=await Category.findByIdAndUpdate(id,data,{new:true});

    res.json(category);
}

// Delete category
const deleteCategory=async(req,res=response)=>{
    const {id}=req.params;
    const category=await Category.findByIdAndUpdate(id,{state:false},{new:true});
    res.json(category);
}

module.exports={
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};