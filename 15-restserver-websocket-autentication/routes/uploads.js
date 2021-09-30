const {Router, response}=require('express');
const {check}=require('express-validator');
const { uploadFiles, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowCollections } = require('../helpers/db-validators');

const { validarCampos,validateUploadFile } = require('../middlewares/index');

const router=Router();

router.post('/',validateUploadFile,uploadFiles);
router.put('/:collection/:id',[
    validateUploadFile,
    check('id').isMongoId(),
    check('collection').custom(c=>allowCollections(c,['users','products'])),
    validarCampos
],updateImageCloudinary);

router.get('/:collection/:id',[
    check('id').isMongoId(),
    check('collection').custom(c=>allowCollections(c,['users','products'])),
    validarCampos,
],showImage);


module.exports=router;

