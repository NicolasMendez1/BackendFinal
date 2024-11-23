import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
};

export default class DbConnection {
    private static connection: oracledb.Connection | null = null;

    static async getConnection(): Promise<oracledb.Connection> {
        if (!this.connection) {
            try {
                this.connection = await oracledb.getConnection(dbConfig);
            } catch (error) {
                console.error('Error al obtener la conexión:', error);
                throw new Error('No se pudo establecer conexión con la base de datos');
            }
        }
        return this.connection;
    }

    static async closeConnection(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.close();
                this.connection = null;
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }

    static async executeQuery(query: string, binds: any[] = []): Promise<any> {
        const connection = await this.getConnection();
        try {
            const result = await connection.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
    }
}


