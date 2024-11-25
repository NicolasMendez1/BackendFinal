import { SeccionBloqueDia } from '../entities/SeccionBloqueDia';
import DbConnection from './DB/dbConnection';

export default class SeccionBloqueDiaRepository {
    async getSeccionBloqueDia(): Promise<SeccionBloqueDia[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_SECCION_BLOQUE_DIA ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar secciones bloque dia:', error);
            throw error;
        }
    }

    
    async deleteSeccionBloqueDia(id:any,id2:any, id3:any, id4:any) {
        try {
            const sql = `
            BEGIN
              GH_ELIMINAR_SECCION_BLOQUE_DIA(:codigo, :codigoCurso,:codigoDia, :codigoBloque);
            END;
          `;

          const binds = {
            codigo: id,
            codigoCurso: id2,
            codigoDia: id3,
            codigoBloque: id4
          };

        await DbConnection.executeQuery(sql, binds);

        } catch (error) {
            console.error('Error al eliminar seccion bloque dia:', error);
            throw error;
        }
    }

    async createSeccionBloqueDia(seccionBloqueDia:SeccionBloqueDia) {

        try {
            const sql = `
            BEGIN
              GH_INSERTAR_SECCION_BLOQUE_DIA(:codigoSeccion, :codigoCurso, :codigoDia, :codigoBloque, :esBloqueDeLaboratorio);
            END;
          `;
      
          const binds = {
            codigoSeccion: seccionBloqueDia.codigoSeccion,
            codigoCurso: seccionBloqueDia.codigoCurso,
            codigoDia: seccionBloqueDia.codigoDia,
            codigoBloque: seccionBloqueDia.codigoBloque,
            esBloqueDeLaboratorio: seccionBloqueDia.esBloqueDeLaboratorio ? 1 : 0

          };

         await DbConnection.executeQuery(sql, binds);

         return seccionBloqueDia;

        } catch (error) {
            console.error('Error al crear seccion bloque dia:', error);
            throw error;
        }
    }

 
    private mapRowToJson(row: any): SeccionBloqueDia {
        return {
            codigoSeccion: row.CODIGO_SECCION,
            codigoCurso: row.CODIGO_CURSO,
            codigoDia: row.CODIGO_DIA,
            codigoBloque: row.CODIGO_BLOQUE,
            esBloqueDeLaboratorio: row.ES_BLOQUE_DE_LABORATORIO
        };
    }
}
  