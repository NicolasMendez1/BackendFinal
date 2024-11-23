import { Profesor } from '../entities/Profesor';
import DbConnection from './DB/dbConnection';


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

    private mapRowToJson(row: any): Profesor {
        return {
            codigo: row.CODIGO,
            nombre: row.NOMBRE,
            apellidoPaterno: row.APELLIDO_PATERNO,
            apellidoMaterno: row.APELLIDO_MATERNO,
            esFullTime: row.ES_FULL_TIME
        };
    }
}