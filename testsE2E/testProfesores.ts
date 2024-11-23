import request from 'supertest';
import app from './testSetup';

async function testProfesores() {
    try {
        await request(app)
            .get('/profesores')
            .expect(200);

        const nuevoProfesor = {
            "codigo": 12345,
            "nombre": "Juan",
            "apellidoMaterno": "Pérez",
            "apellidoPaterno": "González",
            "esFullTime": true
        };

        await request(app)
            .post('/profesores')
            .send(nuevoProfesor)
            .expect(201);

        await request(app)
            .delete(`/profesores/${nuevoProfesor.codigo}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestProfesores');
    } catch (error) {
        console.error('>>ERROR<< E2E TestProfesores:', error);
    }
}

export default testProfesores; 