const Role=require("../models/role")
const Usuario=require("../models/usuario")


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

module.exports={
    esRoleValido,
    emailExiste,
    usuarioIdExiste
}