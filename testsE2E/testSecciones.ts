import request from 'supertest';
import app from './testSetup';

async function testSecciones() {
    try {
        await request(app)
            .get('/secciones')
            .expect(200);

        const nuevaSeccion = {
            "codigo": "S3",
            "codigoProfesor": 1,
            "codigoCurso": "INF-113",
            "codigoSalaCatedra": "I-108",
            "codigoSalaLaboratorio": "DCI-03",
            "cantidadDeEstudiantesSeccion": 30
        };

        const seccionEditada = {
            "codigo": "S3",
            "codigoProfesor": 1,
            "codigoCurso": "INF-113",
            "codigoSalaCatedra": "I-108",
            "codigoSalaLaboratorio": "DCI-03",
            "cantidadDeEstudiantesSeccion": 100
        };

        await request(app)
            .post('/secciones')
            .send(nuevaSeccion)
            .expect(201);

        await request(app)    
            .put(`/secciones/${nuevaSeccion.codigo}/${nuevaSeccion.codigoCurso}`)
            .send(seccionEditada)
            .expect(200)

        await request(app)
            .delete(`/secciones/${nuevaSeccion.codigo}/${nuevaSeccion.codigoCurso}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestSecciones');
    } catch (error) {
        console.error('>>ERROR<< E2E TestSecciones:', error);
    }
}

export default testSecciones; 