const { response}=require('express');
const {ObjectId}=require('mongoose').Types;
const {User,Product,Category}=require('../models/index');

const allowedCollections=[
    'users',
    'products',
    'categories',
    'roles'
];

const searchUsers=async (term='',res=response) => {
    const isMongoID=ObjectId.isValid(term);
    if(isMongoID){
        const user=await User.findById(term);
        return res.json({
            results:(user)?[user]:[]
        });
    }
    const regex=new RegExp(term,'i');
    const users=await User.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });
    return res.json({
        results:users
    });
}

const searchCategories=async (term='',res=response) => {
    const isMongoID=ObjectId.isValid(term);
    if(isMongoID){
        const category=await Category.findById(term);
        return res.json({
            results:(category)?[category]:[]
        });
    }
    const regex=new RegExp(term,'i');
    const categories=await Category.find({name:regex, state:true});
    return res.json({
        results:categories
    });
}

const searchProducts=async (term='',res=response) => {
    const isMongoID=ObjectId.isValid(term);
    if(isMongoID){
        const product=await Product.findById(term).populate('category','name');
        return res.json({
            results:(product)?[product]:[]
        });
    }
    const regex=new RegExp(term,'i');
    const products=await Product.find({name:regex,state:true}).populate('category','name');
    return res.json({
        results:products
    });
}

const search = (req, res=response) => {
    
    const {collection,term}=req.params;
    
    if(!allowedCollections.includes(collection)){
        return res.status(400).send({
            message: `the allowed collections are: ${allowedCollections}`
        });
    }

    switch(collection){
        case 'users':
            searchUsers(term,res);
            break;
        case 'categories':
            searchCategories(term,res);
            break;
        case 'products':
            searchProducts(term,res);
            break;

        default:
            res.status(500).send({
                message: `the allowed collections are: ${allowedCollections}`
            });
    }

}

module.exports = {
    search
};
