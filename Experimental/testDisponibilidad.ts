

const oracledb = require('oracledb');
import dotenv from 'dotenv';
import { Profesor } from '../src/entities/Profesor';

dotenv.config();


function convertirDisponibilidad(arrayDe72: number[]): boolean[][] {
  const bloquesDisponibles = [];

  // Recorremos el array original y lo convertimos en subarrays
  for (let i = 0; i < 6; i++) {
    // Cada subarray contendrá 12 valores de disponibilidad
    let bloqueDia = arrayDe72.slice(i * 12, (i + 1) * 12).map(valor => valor === 1);  // Convertir 0 -> false y 1 -> true
    bloquesDisponibles.push(bloqueDia);
  }

  return bloquesDisponibles;
}

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

async function obtenerProfesoresConDisponibilidad(): Promise<Profesor[]> {
  let connection;

  try {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT p.CODIGO,
             p.NOMBRE,
             p.APELLIDO_PATERNO,
             p.APELLIDO_MATERNO,
             p.ES_FULL_TIME,
             GH_obtener_disponibilidad_profesor(p.CODIGO) AS ESTADO_BLOQUES_DIAS
      FROM GH_PROFESOR p
    `);

    const profesores: any[] = result.rows || [];

    return profesores.map(mapRowToJson);

  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }

}

function mapRowToJson(row: any): Profesor {
  return {
      codigo: row.CODIGO,
      nombre: row.NOMBRE,
      apellidoPaterno: row.APELLIDO_PATERNO,
      apellidoMaterno: row.APELLIDO_MATERNO,
      esFullTime: row.ES_FULL_TIME,
      bloquesDisponibles: convertirDisponibilidad(JSON.parse(JSON.stringify(row.ESTADO_BLOQUES_DIAS)))
  };
}

async function main() {
  try {
    const profesores: Profesor[] = await obtenerProfesoresConDisponibilidad();
    console.log(profesores[0].bloquesDisponibles);
    console.log('Total de profesores obtenidos:', profesores.length);
  } catch (error) {
    console.error('Error en la ejecución principal:', error);
  }
}

main();






/*
    const result = await connection.execute(`
      SELECT p.CODIGO,
             p.NOMBRE,
             p.APELLIDO_PATERNO,
             p.APELLIDO_MATERNO,
             p.ES_FULL_TIME,
             SELECT CODIGO_DIA FROM GH_PROFESOR_BLOQUES_DISPONIBLES WHERE CODIGO_PROFESOR = p.CODIGO
             GH_obtener_disponibilidad_profesor(p.CODIGO) AS ESTADO_BLOQUES_DIAS
      FROM GH_PROFESOR p
    `);

*/