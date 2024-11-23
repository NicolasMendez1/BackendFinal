import { DbConnection } from './dbConnection';
import { Curso } from '../entities/Curso';

export default class CursoRepository {
    async getCursos(): Promise<Curso[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_CURSO ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar cursos:', error);
            throw error;
        }
    }

    private mapRowToJson(row: any): Curso {
        return {
            codigo: row.CODIGO,
            nombre: row.NOMBRE,
            horasCatedra: row.HORAS_CATEDRA,
            horasLaboratorio: row.HORAS_LABORATORIO,
            nivel: row.NIVEL,
            esAtemporal: row.ES_ATEMPORAL === 1,
            esCursoGeneral: row.ES_CURSO_GENERAL === 1,
            cantidadDeEstudiantes: row.CANTIDAD_DE_ESTUDIANTES
        };
    }
}

 /*  
async getCursoById(id: number) {
    try {
        const rows = await DbConnection.executeQuery('SELECT * FROM GH_CURSO WHERE ID = :id', [id]);
        return rows.length > 0 ? this.mapRowToJson(rows[0]) : null;
    } catch (error) {
        console.error('Error al consultar curso por ID:', error);
        throw error;
    }
}
    */