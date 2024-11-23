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

    async deleteSala(id:any) {
        try {
            const sql = `
            BEGIN
              GH_ELIMINAR_SALA(:codigo);
            END;
          `;

          const binds = {
            codigo: id
          };

        await DbConnection.executeQuery(sql, binds);

        } catch (error) {
            console.error('Error al eliminar sala:', error);
            throw error;
        }
    }

    async createSala(sala:Sala) {

        try {
            const sql = `
            BEGIN
              GH_INSERTAR_SALA(:codigo, :nombre, :capacidad, :esLaboratorio);
            END;
          `;
      
          const binds = {
            codigo: sala.codigo,
            nombre: sala.nombre,
            capacidad: sala.capacidad,
            esLaboratorio: sala.esLaboratorio ? 1 : 0
          };

         await DbConnection.executeQuery(sql, binds);

         return sala;

        } catch (error) {
            console.error('Error al crear sala:', error);
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

