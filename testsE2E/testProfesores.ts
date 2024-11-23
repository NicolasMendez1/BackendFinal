import request from 'supertest';
import app from './testSetup';

async function testProfesores() {
    try {
        await request(app)
            .get('/profesores')
            .expect(200);

        const nuevoProfesor = {
            rut: "11111111-1",
            nombre: "Profesor Test",
            correo: "profesor.test@usach.cl",
            telefono: "+56911111111",
            oficina: "Test Office",
            jornada: "COMPLETA"
        };

        await request(app)
            .post('/profesores')
            .send(nuevoProfesor)
            .expect(201);

        await request(app)
            .delete(`/profesores/${nuevoProfesor.rut}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestProfesores');
    } catch (error) {
        console.error('>>ERROR<< E2E TestProfesores:', error);
    }
}

export default testProfesores; 