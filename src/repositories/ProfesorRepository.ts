import { Profesor } from '../entities/Profesor';
import DbConnection from './DB/dbConnection';

export default class ProfesorRepository {
    private convertirDisponibilidad(arrayDe72: number[]): boolean[][] {
        const bloquesDisponibles = [];
        for (let i = 0; i < 6; i++) {
            let bloqueDia = arrayDe72.slice(i * 12, (i + 1) * 12).map(valor => valor === 1);
            bloquesDisponibles.push(bloqueDia);
        }
        return bloquesDisponibles;
    }

    async getProfesores(): Promise<Profesor[]> {
        try {
            const result = await DbConnection.executeQuery(`
                SELECT p.CODIGO,
                       p.NOMBRE,
                       p.APELLIDO_PATERNO,
                       p.APELLIDO_MATERNO,
                       p.ES_FULL_TIME,
                       GH_obtener_disponibilidad_profesor(p.CODIGO) AS ESTADO_BLOQUES_DIAS
                FROM GH_PROFESOR p
            `);

            return result.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar profesores:', error);
            throw error;
        }
    }

    private mapRowToJson(row: any): Profesor {
        return {
            codigo: row.CODIGO,
            nombre: row.NOMBRE,
            apellidoPaterno: row.APELLIDO_PATERNO,
            apellidoMaterno: row.APELLIDO_MATERNO,
            esFullTime: row.ES_FULL_TIME,
            bloquesDisponibles: this.convertirDisponibilidad(JSON.parse(JSON.stringify(row.ESTADO_BLOQUES_DIAS)))
        };
    }

    async createProfesor(profesor: Profesor): Promise<Profesor> {
        try {
            // Convertir la matriz de booleanos 6x12 a un array de 72 números
            const disponibilidadArray = profesor.bloquesDisponibles.flatMap(dia => 
                dia.map(disponible => disponible ? 1 : 0)
            );

            const sql = `
                DECLARE
                    v_array NUM_ARRAY := NUM_ARRAY();
                BEGIN
                    v_array.EXTEND(72);
                    ${disponibilidadArray.map((val, idx) => `v_array(${idx + 1}) := ${val};`).join('\n')}
                    GH_insertar_profesor_y_disponibilidad(
                        :p_codigo,
                        :p_nombre,
                        :p_apellido_paterno,
                        :p_apellido_materno,
                        :p_es_full_time,
                        v_array
                    );
                END;
            `;

            await DbConnection.executeQuery(sql, {
                p_codigo: profesor.codigo,
                p_nombre: profesor.nombre,
                p_apellido_paterno: profesor.apellidoPaterno,
                p_apellido_materno: profesor.apellidoMaterno,
                p_es_full_time: profesor.esFullTime ? 1 : 0
            });

            return profesor;
        } catch (error) {
            console.error('Error al insertar profesor con disponibilidad:', error);
            throw error;
        }
    }

    async updateProfesor(id: number, profesor: Profesor): Promise<void> {
        try {
            // Primero actualizamos los datos básicos del profesor
            await DbConnection.executeQuery(
                `UPDATE GH_PROFESOR 
                 SET nombre = :nombre,
                     apellido_paterno = :apellido_paterno,
                     apellido_materno = :apellido_materno,
                     es_full_time = :es_full_time
                 WHERE codigo = :codigo`,
                {
                    nombre: profesor.nombre,
                    apellido_paterno: profesor.apellidoPaterno,
                    apellido_materno: profesor.apellidoMaterno,
                    es_full_time: profesor.esFullTime ? 1 : 0,
                    codigo: profesor.codigo
                }
            );

            // Luego actualizamos la disponibilidad
            const disponibilidadArray = profesor.bloquesDisponibles.flatMap(dia => 
                dia.map(disponible => disponible ? 1 : 0)
            );

            // Eliminamos la disponibilidad anterior y insertamos la nueva
            const sql = `
                DECLARE
                    v_array NUM_ARRAY := NUM_ARRAY();
                BEGIN
                    -- Eliminar disponibilidad existente
                    DELETE FROM GH_PROFESOR_BLOQUES_DISPONIBLES 
                    WHERE codigo_profesor = :p_codigo;
                    
                    -- Insertar nueva disponibilidad
                    v_array.EXTEND(72);
                    ${disponibilidadArray.map((val, idx) => `v_array(${idx + 1}) := ${val};`).join('\n')}
                    
                    -- Insertar nuevos registros de disponibilidad
                    FOR i IN 1..72 LOOP
                        IF v_array(i) = 1 THEN
                            INSERT INTO GH_PROFESOR_BLOQUES_DISPONIBLES (
                                codigo_profesor, 
                                codigo_dia, 
                                codigo_bloque
                            ) VALUES (
                                :p_codigo,
                                FLOOR((i-1)/12) + 1,
                                MOD((i-1), 12) + 1
                            );
                        END IF;
                    END LOOP;
                    
                    COMMIT;
                END;
            `;

            await DbConnection.executeQuery(sql, {
                p_codigo: profesor.codigo
            });

        } catch (error) {
            console.error('Error al actualizar profesor:', error);
            throw error;
        }
    }

    async deleteProfesor(codigo: number): Promise<void> {
        try {
            // Eliminamos en orden para mantener la integridad referencial
            const sql = `
                BEGIN
                    -- Primero eliminamos la disponibilidad
                    DELETE FROM GH_PROFESOR_BLOQUES_DISPONIBLES 
                    WHERE codigo_profesor = :codigo;
                    
                    -- Luego eliminamos el profesor
                    DELETE FROM GH_PROFESOR 
                    WHERE codigo = :codigo;
                    
                    COMMIT;
                EXCEPTION
                    WHEN OTHERS THEN
                        ROLLBACK;
                        RAISE;
                END;
            `;

            await DbConnection.executeQuery(sql, { codigo });
        } catch (error) {
            console.error('Error al eliminar profesor:', error);
            throw error;
        }
    }

}