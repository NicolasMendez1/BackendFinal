import DbConnection from './DB/dbConnection';
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

    async deleteCurso(id:any) {
        try {
            const sql = `
            BEGIN
              GH_ELIMINAR_CURSO(:codigo);
            END;
          `;

          const binds = {
            codigo: id
          };

        await DbConnection.executeQuery(sql, binds);

        } catch (error) {
            console.error('Error al eliminar curso:', error);
            throw error;
        }
    }

    async createCurso(curso:Curso) {

        try {
            const sql = `
            BEGIN
              GH_INSERTAR_CURSO(:codigo, :nombre, :horasCatedra, :horasLaboratorio, :nivel, :esAtemporal, :esCursoGeneral, :cantidadDeEstudiantes);
            END;
          `;
      
          const binds = {
            codigo: curso.codigo,
            nombre: curso.nombre,
            horasCatedra: curso.horasCatedra,
            horasLaboratorio: curso.horasLaboratorio,
            nivel: curso.nivel,
            esAtemporal: curso.esAtemporal ? 1 : 0,
            esCursoGeneral: curso.esCursoGeneral ? 1 : 0,
            cantidadDeEstudiantes: curso.cantidadDeEstudiantes
          };

         await DbConnection.executeQuery(sql, binds);

         return curso;

        } catch (error) {
            console.error('Error al crear curso:', error);
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