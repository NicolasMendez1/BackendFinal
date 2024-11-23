import { Seccion } from '../entities/Seccion';
import DbConnection from './DB/dbConnection';

export default class SeccionRepository {
    async getSeccion(): Promise<Seccion[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_SECCION ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar secciones:', error);
            throw error;
        }
    }

    async deleteSeccion(id:any,id2:any) {
        try {
            const sql = `
            BEGIN
              GH_ELIMINAR_SECCION(:codigo, :codigoCurso);
            END;
          `;

          const binds = {
            codigo: id,
            codigoCurso: id2
          };

        await DbConnection.executeQuery(sql, binds);

        } catch (error) {
            console.error('Error al eliminar seccion:', error);
            throw error;
        }
    }

    async createSeccion(seccion:Seccion) {

        try {
            const sql = `
            BEGIN
              GH_INSERTAR_SECCION(:codigo, :codigoProfesor, :codigoCurso, :codigoSalaCatedra, :codigoSalaLaboratorio, :cantidadEstudiantesSeccion);
            END;
          `;
      
          const binds = {
            codigo: seccion.codigo,
            codigoProfesor: seccion.codigoProfesor,
            codigoCurso: seccion.codigoCurso,
            codigoSalaCatedra: seccion.codigoSalaCatedra,
            codigoSalaLaboratorio: seccion.codigoSalaLaboratorio,
            cantidadEstudiantesSeccion: seccion.cantidadDeEstudiantesSeccion
          };

         await DbConnection.executeQuery(sql, binds);

         return seccion;

        } catch (error) {
            console.error('Error al crear seccion:', error);
            throw error;
        }
    }


    private mapRowToJson(row: any): Seccion {
        return {
            codigo: row.CODIGO,
            codigoProfesor: row.CODIGO_PROFESOR,
            codigoCurso: row.CODIGO_CURSO,
            codigoSalaCatedra: row.CODIGO_SALA_CATEDRA,
            codigoSalaLaboratorio: row.CODIGO_SALA_LABORATORIO,
            cantidadDeEstudiantesSeccion: row.CANTIDAD_DE_ESTUDIANTES_SECCION
        };
    }
}