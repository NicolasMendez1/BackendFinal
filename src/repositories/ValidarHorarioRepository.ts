import DbConnection from './DB/dbConnection';

export default class ValidarHorarioRepository {
    async validarHorario(): Promise<any> {
        try {
            const sql = `
            BEGIN
                GH_TEST;
            END;
          `;
            await DbConnection.executeQuery(sql);
          } catch (error: any) {
            console.log(error.message);
            const errorMessage = error.message.split('\n')[0].replace(/^ORA-\d{5}:\s?/, '');
            console.log(errorMessage);
            throw errorMessage;
          }
    }
}
