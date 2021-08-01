const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct } = require('../controllers/products');
    
const { categoryIdExist, productIdExist } = require('../helpers/db-validators');

const router = Router();


// get all products
router.get('/',getAllProducts);

// get product by id
router.get('/:id',[
    check("id","Not a Mongo id").isMongoId(),
    check("id").custom(productIdExist),
    validarCampos,
],getProductById);

// create a new product
router.post('/',[
    validarJWT,
    check("name","The Name is required").not().isEmpty(),
    check("category","Not a Mongo id").isMongoId(),
    check("category").custom(categoryIdExist),
    validarCampos
],createProduct);

// update a product
router.put('/:id',[
    validarJWT,
    // check("category","Not a Mongo id").isMongoId(),
    check("id").custom(productIdExist),
    validarCampos
],updateProduct);

// delete product if user is admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check("id","Not a Mongo id").isMongoId(),
    check("id").custom(productIdExist),
    validarCampos,
],deleteProduct);

module.exports=router;
