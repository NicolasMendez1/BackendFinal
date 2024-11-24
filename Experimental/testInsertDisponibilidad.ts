const oracledb = require('oracledb');
import dotenv from 'dotenv';
import { Profesor } from '../src/entities/Profesor';

dotenv.config();
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

async function insertarProfesorYDisponibilidad() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const codigo = 136;
    const nombre = 'Juan';
    const apellidoPaterno = 'Pérez';
    const apellidoMaterno = 'Gómez';
    const esFullTime = 1;
    const disponibilidad = new Array(72).fill(0);

    disponibilidad[0] = 1;
    disponibilidad[1] = 1;

    await connection.execute(
      `DECLARE
         v_array NUM_ARRAY := NUM_ARRAY();
       BEGIN
         v_array.EXTEND(72);
         ${disponibilidad.map((val, idx) => `v_array(${idx + 1}) := ${val};`).join('\n')}
         GH_insertar_profesor_y_disponibilidad(:p_codigo,:p_nombre,:p_apellido_paterno,:p_apellido_materno,:p_es_full_time,v_array);
       END;`,
      {
        p_codigo: codigo,
        p_nombre: nombre,
        p_apellido_paterno: apellidoPaterno,
        p_apellido_materno: apellidoMaterno,
        p_es_full_time: esFullTime
      }
    );

    console.log('Profesor y disponibilidad insertados con éxito.');

  } catch (err) {
    console.error('Error al insertar profesor y disponibilidad:', err);
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

insertarProfesorYDisponibilidad();

/*
CREATE OR REPLACE PROCEDURE GH_insertar_profesor_y_disponibilidad (
    p_codigo IN NUMBER,
    p_nombre IN VARCHAR2,
    p_apellido_paterno IN VARCHAR2,
    p_apellido_materno IN VARCHAR2,
    p_es_full_time IN NUMBER,
    p_disponibilidad IN NUM_ARRAY -- El array de 72 números
) AS
BEGIN
    -- Insertar el profesor en la tabla GH_PROFESOR
    INSERT INTO GH_PROFESOR (codigo, nombre, apellido_paterno, apellido_materno, es_full_time)
    VALUES (p_codigo, p_nombre, p_apellido_paterno, p_apellido_materno, p_es_full_time);

    -- Insertar la disponibilidad de bloques y días en la tabla GH_PROFESOR_BLOQUES_DISPONIBLES
    DECLARE
        v_idx NUMBER := 1; -- Índice para recorrer el array de disponibilidad
    BEGIN
        FOR dia IN 1..6 LOOP  -- Días (1 a 6)
            FOR bloque IN 1..12 LOOP  -- Bloques (1 a 12)
                -- Insertar en la tabla GH_PROFESOR_BLOQUES_DISPONIBLES
                IF p_disponibilidad(v_idx) = 1 THEN
                    INSERT INTO GH_PROFESOR_BLOQUES_DISPONIBLES (codigo_profesor, codigo_dia, codigo_bloque)
                    VALUES (p_codigo, dia, bloque);
                END IF;
                v_idx := v_idx + 1; -- Avanzar al siguiente valor del array
            END LOOP;
        END LOOP;
    END;

    COMMIT;  -- Confirmar la transacción
END GH_insertar_profesor_y_disponibilidad;
*/
