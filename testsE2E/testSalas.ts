import request from 'supertest';
import app from './testSetup';

async function testSalas() {
    try {
        await request(app)
            .get('/salas')
            .expect(200);

        const nuevaSala = {
            "codigo": "A101",
            "nombre": "Sala de Conferencias",
            "capacidad": 50,
            "esLaboratorio": false
        };

        await request(app)
            .post('/salas')
            .send(nuevaSala)
            .expect(201);


        await request(app)
            .delete(`/salas/${nuevaSala.codigo}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestSalas');
    } catch (error) {
        console.error('>>ERROR<< E2E TestSalas:', error);
    }
}

export default testSalas; 