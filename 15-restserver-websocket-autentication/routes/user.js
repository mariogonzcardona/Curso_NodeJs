const {Router}=require('express');
const {check}=require('express-validator');

const {usersGet,usersPut,usersPost,usersDelete,usersPatch}=require('../controllers/users');

const { esRoleValido, emailExiste,usuarioIdExiste } = require('../helpers/db-validators');

const {validarCampos,validarJWT,esAdminRole,tieneRole}=require('../middlewares')

const router=Router();

router.get('/', usersGet);
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    check("rol").custom(esRoleValido),
    validarCampos
], usersPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength(min=6),
    check('correo','El correo no es válido').isEmail(),
    check("correo").custom(emailExiste),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check("rol").custom((rol='')=> esRoleValido(rol)),
    check("rol").custom(esRoleValido),
    validarCampos
], usersPost);
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE',"VENTAS_ROLE"),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    validarCampos
], usersDelete);
router.patch('/:id', usersPatch);

module.exports=router;