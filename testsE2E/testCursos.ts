import request from 'supertest';
import express from 'express';
import cursoRouter from '../src/routers/cursoRouter';

const app = express();
app.use(express.json());
app.use('/cursos', cursoRouter);

async function testCursos() {
    try {
        console.log('TEST --> Iniciando pruebas de cursos...');

        const getCursosResponse = await request(app)
            .get('/cursos')
            .expect(200);
        
        console.log('TEST --> GET /cursos - OK');

        const nuevoCurso = {
            codigo: "TEST001",
            nombre: "Curso de Prueba",
            horasCatedra: 4,
            horasLaboratorio: 2,
            nivel: 1,
            esAtemporal: false,
            esCursoGeneral: true,
            cantidadDeEstudiantes: 30
        };

        const postResponse = await request(app)
            .post('/cursos')
            .send(nuevoCurso)
            .expect(201);

        console.log('TEST --> POST /cursos - OK');

        await request(app)
            .delete(`/cursos/${nuevoCurso.codigo}`)
            .expect(200);

        console.log(`TEST --> DELETE /cursos/${nuevoCurso.codigo} - OK`);

        console.log('TEST --> Pruebas E2E de TestCursos completadas exitosamente');
    } catch (error) {
        console.error('TEST --> E2E Error en pruebas de TestCursos:', error);
    }
}

testCursos();
