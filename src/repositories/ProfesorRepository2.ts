
import { Profesor } from '../entities/Profesor';
import DbConnection from './DB/dbConnection';

export default class ProfesorRepository2 {
    private convertirDisponibilidad(arrayDe72: number[]): boolean[][] {
        const bloquesDisponibles = [];
        for (let i = 0; i < 6; i++) {
            let bloqueDia = arrayDe72.slice(i * 12, (i + 1) * 12).map(valor => valor === 1);
            bloquesDisponibles.push(bloqueDia);
        }
        return bloquesDisponibles;
    }

    async getProfesores(): Promise<Profesor[]> {
        try {
            const result = await DbConnection.executeQuery(`
                SELECT p.CODIGO,
                       p.NOMBRE,
                       p.APELLIDO_PATERNO,
                       p.APELLIDO_MATERNO,
                       p.ES_FULL_TIME,
                       GH_obtener_disponibilidad_profesor(p.CODIGO) AS ESTADO_BLOQUES_DIAS
                FROM GH_PROFESOR p
            `);

            return result.map((row: any) => this.mapRowToJson(row));
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
            esFullTime: row.ES_FULL_TIME,
            bloquesDisponibles: this.convertirDisponibilidad(JSON.parse(JSON.stringify(row.ESTADO_BLOQUES_DIAS)))
        };
    }
}