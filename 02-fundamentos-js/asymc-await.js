const empleados = [
  {
    id: 1,
    nombre: "Mario",
  },
  {
    id: 2,
    nombre: "Alejandro",
  },
  {
    id: 3,
    nombre: "Hunter",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1500,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const id = 4;
const getEmpleadoById = (id) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre;
  return (promesa = new Promise((resolve, reject) => {
    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  }));
};
const getSalarioById = (id) => {
  const salario = salarios.find((s) => s.id === id)?.salario;
  return (promesa = new Promise((resolve, reject) => {
    salario ? resolve(salario) : reject(`No existe salario con id ${id}`);
  }));
};
const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleadoById(id);
    const salario = await getSalarioById(id);
    return `El empleado: ${empleado} tiene un salario de: ${salario}`;
  } catch (error) {
    return error;
  }
};
getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
