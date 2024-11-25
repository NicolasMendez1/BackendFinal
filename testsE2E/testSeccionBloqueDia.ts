import request from 'supertest';
import app from './testSetup';

async function testSeccionesBloquesDias() {
    try {
        await request(app)
            .get('/seccionesBloqueDia')
            .expect(200);

        const nuevaSeccionBloqueDia = {
            "codigoSeccion": "S2",
            "codigoCurso": "INF-114",
            "codigoDia": 1,
            "codigoBloque": 12,
            "esBloqueDeLaboratorio": true
        };

        await request(app)
        .post('/seccionesBloqueDia')
        .send(nuevaSeccionBloqueDia)
        .expect(201);

        await request(app)
        .delete(`/seccionesBloqueDia/${nuevaSeccionBloqueDia.codigoSeccion},${nuevaSeccionBloqueDia.codigoCurso},${nuevaSeccionBloqueDia.codigoDia},${nuevaSeccionBloqueDia.codigoBloque} `)
        .expect(200);

    console.log('>>EXITO<< E2E TestSeccionBloqueDia');
} catch (error) {
    console.error('>>ERROR<< E2E TestSeccionBloqueDia:', error);
}
}

export default testSeccionesBloquesDias; 