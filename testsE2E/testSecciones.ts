import request from 'supertest';
import app from './testSetup';

async function testSecciones() {
    try {
        await request(app)
            .get('/secciones')
            .expect(200);

        const nuevaSeccion = {
            numero: 1,
            año: 2024,
            semestre: 1,
            cupos: 30,
            cursoCodigo: "TEST002",
            profesorRut: "11111111-1",
            salaCodigo: "TEST-S001"
        };

        await request(app)
            .post('/secciones')
            .send(nuevaSeccion)
            .expect(201);

        await request(app)
            .delete(`/secciones/${nuevaSeccion.numero}/${nuevaSeccion.año}/${nuevaSeccion.semestre}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestSecciones');
    } catch (error) {
        console.error('>>ERROR<< E2E TestSecciones:', error);
    }
}

export default testSecciones; 