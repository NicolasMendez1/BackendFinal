import request from 'supertest';
import app from './testSetup';

async function testSecciones() {
    try {
        await request(app)
            .get('/secciones')
            .expect(200);

        const nuevaSeccion = {
            "codigo": "S01",
            "codigoProfesor": 12345,
            "codigoCurso": "MAT101",
            "codigoSalaCatedra": "A101",
            "codigoSalaLaboratorio": "B202",
            "cantidadDeEstudiantesSeccion": 30
        };

        await request(app)
            .post('/secciones')
            .send(nuevaSeccion)
            .expect(201);

        await request(app)
            .delete(`/secciones/${nuevaSeccion.codigo}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestSecciones');
    } catch (error) {
        console.error('>>ERROR<< E2E TestSecciones:', error);
    }
}

export default testSecciones; 