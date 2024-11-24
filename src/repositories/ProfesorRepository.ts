import { Profesor } from '../entities/Profesor';
import DbConnection from './DB/dbConnection';
import oracledb from 'oracledb';

export default class ProfesorRepository {
    async getProfesor(): Promise<Profesor[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_PROFESOR ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar profesores:', error);
            throw error;
        }
    }


    async deleteProfesor(id: any) {
        try {
            const sql = `
            BEGIN
              GH_ELIMINAR_PROFESOR(:codigo);
            END;
          `;

            const binds = {
                codigo: id
            };

            await DbConnection.executeQuery(sql, binds);

        } catch (error) {
            console.error('Error al eliminar profesor:', error);
            throw error;
        }
    }

    async createProfesor(profesor: Profesor) {

        try {
            const sql = `
            BEGIN
              GH_INSERTAR_PROFESOR(:codigo, :nombre, :apellidoPaterno, :apellidoMaterno, :esFullTime, :bloquesDisponibles);
            END;
          `;

          const bloquesDisponibles: number[] = profesor.bloquesDisponibles.flat().map(b => b ? 1 : 0);

          const bloquesDisponiblesOracle = {
              type: oracledb.DB_TYPE_NUMBER,
              dir: oracledb.BIND_IN,
              val: bloquesDisponibles
          };

          const binds = {
              codigo: profesor.codigo,
              nombre: profesor.nombre,
              apellidoPaterno: profesor.apellidoPaterno,
              apellidoMaterno: profesor.apellidoMaterno,
              esFullTime: profesor.esFullTime ? 1 : 0,
              bloquesDisponibles: bloquesDisponiblesOracle
          };


            await DbConnection.executeQuery(sql, binds);

            return profesor;

        } catch (error) {
            console.error('Error al crear el profesor:', error);
            throw error;
        }
    }

    async updateProfesor(id: any, profesor: Profesor) {
        try {
            const sql = `
            BEGIN
                GH_ACTUALIZAR_PROFESOR(:codigo,:nombre,:apellidoPaterno,:apellidoMaterno,:esFullTime,:bloquesDisponibles);
            END;
            `;

            const bloquesDisponibles: number[] = profesor.bloquesDisponibles.flat().map(b => b ? 1 : 0);

            const bloquesDisponiblesOracle = {
                type: oracledb.DB_TYPE_NUMBER,
                dir: oracledb.BIND_IN,
                val: bloquesDisponibles
            };

            const binds = {
                codigo: id,
                nombre: profesor.nombre,
                apellidoPaterno: profesor.apellidoPaterno,
                apellidoMaterno: profesor.apellidoMaterno,
                esFullTime: profesor.esFullTime ? 1 : 0,
                bloquesDisponibles: bloquesDisponiblesOracle
            };

            await DbConnection.executeQuery(sql, binds);
        }
        catch (error) {
            console.error('Error al actualizar profesor:', error);
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
            bloquesDisponibles: row.BLOQUES_DISPONIBLES
        };
    }
}