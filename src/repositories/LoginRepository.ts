import DbConnection from './DB/dbConnection';

export default class LoginRepository {
    async getCredenciales(): Promise<any[]> {
        try {
            const rows = await DbConnection.executeQuery('SELECT * FROM GH_USUARIO ');
            return rows.map((row: any) => this.mapRowToJson(row));
        } catch (error) {
            console.error('Error al consultar credenciales:', error);
            throw error;
        }
    }
    
    private mapRowToJson(row: any): any {
        return {
            nombre: row.NOMBRE,
            correo: row.CORREO,
            contrasena: row.CONTRASEÑA
        };
    }
}
