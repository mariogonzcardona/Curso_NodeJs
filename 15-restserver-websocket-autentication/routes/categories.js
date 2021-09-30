const {Router}=require('express');
const {check}=require('express-validator');
const { createCategory,getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories');
const { categoryIdExist } = require('../helpers/db-validators');
const { validarCampos, esAdminRole } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();


// get all categories
router.get('/',getAllCategories);

// get category by id
router.get('/:id',[
    check("id","Not a Mongo id").isMongoId(),
    check("id").custom(categoryIdExist),
    validarCampos,
],getCategoryById);

// create category
router.post('/',[
    validarJWT,
    check("name","The Name is required").not().isEmpty(),
    validarCampos
],createCategory);

// update category
router.put('/:id',[
    check("name","The Name is required").not().isEmpty(),
    check("id").custom(categoryIdExist),
    validarCampos
],updateCategory);

// delete category if user is admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check("id","Not a Mongo id").isMongoId(),
    check("id").custom(categoryIdExist),
    validarCampos,
],deleteCategory);

module.exports=router;
