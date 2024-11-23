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