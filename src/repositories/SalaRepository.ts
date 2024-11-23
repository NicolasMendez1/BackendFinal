import { Sala } from '../entities/Sala';
import DbConnection from './DB/dbConnection';


export default class SalaRepository {
    async getSalas(): Promise<Sala[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_SALA ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar salas:', error);
            throw error;
        }
    }

    private mapRowToJson(row: any): Sala {
        return {
            codigo: row.CODIGO,
            nombre: row.NOMBRE,
            capacidad: row.CAPACIDAD,
            esLaboratorio: row.ES_LABORATORIO  
        };
    }
}

