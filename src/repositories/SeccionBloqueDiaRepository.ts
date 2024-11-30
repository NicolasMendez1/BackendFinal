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


  async deleteSeccionBloqueDia(codigo: string, codigoCurso: string, codigoBloque: number, codigoDia: number) {
    try {
      const sql = `BEGIN
        GH_ELIMINAR_SECCION_BLOQUE_DIA( :codigo, :codigoCurso, :codigoDia, :codigoBloque );
      END;`;

      const binds = {
        codigo: codigo,
        codigoCurso: codigoCurso,
        codigoDia: codigoDia,
        codigoBloque: codigoBloque
      };
      
      console.log("binds -> ", binds)
      await DbConnection.executeQuery(sql, binds);
      
      console.log("binds -> ", binds)

    } catch (error) {
      console.error('Error al eliminar seccion bloque dia:', error);
      throw error;
    }
  }

  async createSeccionBloqueDia(seccionBloqueDia: SeccionBloqueDia) {

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

    } catch (error: any) {
      console.log(error)
      const errorMessage = error.message.split('\n')[0].replace(/^ORA-\d{5}:\s?/, '');
      console.log(errorMessage);
      throw errorMessage;
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
