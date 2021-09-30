const Role=require("../models/role")
const { Category ,Usuario,Product} = require("../models");

const esRoleValido=async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste=async(correo='')=>{
    // Verificar si el correo existe
    const existeEmail=await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`);
    }
};

const usuarioIdExiste= async(id='')=>{
    // Verificar si el correo existe
    const existeUser=await Usuario.findById(id);
    if (!existeUser) {
        throw new Error(`El id ${id} no existe`);
    }
};

const categoryIdExist= async(id='')=>{
    // Verificar si el correo existe
    const existCategory=await Category.findById(id);
    if (!existCategory) {
        throw new Error(`The id: ${id} does not exist`);
    }
};

const productIdExist= async(id='')=>{
    // Verificar si el correo existe
    const existProduct=await Product.findById(id);
    if (!existProduct) {
        throw new Error(`The id: ${id} does not exist`);
    }
};

const allowCollections=(collection="",collections=[])=>{
    const include=collections.includes(collection);
    if (!include) {
        throw new Error(`La colección ${collection} no esta permitida, ${collections}`);
    }
    return true;
}

module.exports={
    esRoleValido,
    emailExiste,
    usuarioIdExiste,
    categoryIdExist,
    productIdExist,
    allowCollections
}