const oracledb = require('oracledb');

async function insertarProfesorYDisponibilidad() {
  let connection;

  try {
    // Conectar a la base de datos Oracle
    connection = await oracledb.getConnection({
      user: 'usuario',  // Tu usuario de la base de datos
      password: 'contraseña',  // Tu contraseña de la base de datos
      connectString: 'localhost/XE'  // O tu cadena de conexión
    });

    const codigo = 1;  // Código del profesor
    const nombre = 'Juan';
    const apellidoPaterno = 'Pérez';
    const apellidoMaterno = 'Gómez';
    const esFullTime = 1;  // 1 para Full-Time, 0 para Part-Time
    const disponibilidad = new Array(72).fill(0);  // 72 elementos, todos en 0 (puedes ajustarlos)

    // Supón que quieres configurar disponibilidad para algunos bloques
    disponibilidad[0] = 1;  // Disponible en día 1, bloque 1
    disponibilidad[1] = 1;  // Disponible en día 1, bloque 2
    // ... (rellenar el array con los valores correspondientes)

    // Llamada al procedimiento PL/SQL
    await connection.execute(
      `BEGIN
         GH_insertar_profesor_y_disponibilidad(
           :p_codigo,
           :p_nombre,
           :p_apellido_paterno,
           :p_apellido_materno,
           :p_es_full_time,
           :p_disponibilidad
         );
       END;`,
      {
        p_codigo: codigo,
        p_nombre: nombre,
        p_apellido_paterno: apellidoPaterno,
        p_apellido_materno: apellidoMaterno,
        p_es_full_time: esFullTime,
        p_disponibilidad: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: disponibilidad }
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
