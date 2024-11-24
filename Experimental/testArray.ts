import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
};

async function insertarNumeros() {
    let connection;
    try {
        // Establecer la conexión a la base de datos Oracle
        connection = await oracledb.getConnection(dbConfig);

        // El array de números a insertar
        const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 /* ... hasta 70 números */];

        // Convertir el array de números a un tipo de colección de Oracle (num_array)
        const numArray = {
            type: oracledb.DB_TYPE_NUMBER,
            dir: oracledb.BIND_IN,
            val: numeros
        };

        // Ejecutar el procedimiento que inserta los números
        const result = await connection.execute(
            `BEGIN
                insertar_numeros(:p_numeros);
            END;`,
            {
                p_numeros: numArray
            }
        );

        console.log('Números insertados correctamente');
    } catch (err) {
        console.error('Error al insertar números:', err);
    } finally {
        // Cerrar la conexión
        if (connection) {
            await connection.close();
        }
    }
}

insertarNumeros();

/*
CREATE OR REPLACE TYPE num_array AS TABLE OF NUMBER;

CREATE OR REPLACE PROCEDURE insertar_numeros (p_numeros IN num_array)
IS
BEGIN
   FOR i IN 1..p_numeros.COUNT LOOP
      INSERT INTO mi_tabla (columna_numeros)
      VALUES (p_numeros(i));
   END LOOP;
END insertar_numeros;

*/
