import request from 'supertest';
import express from 'express';
import cursoRouter from '../src/routers/cursoRouter';

const app = express();
app.use(express.json());
app.use('/cursos', cursoRouter);

async function testCursos() {
    try {
        console.log('Iniciando pruebas de cursos...');

        const getCursosResponse = await request(app)
            .get('/cursos')
            .expect(200);
        
        console.log('GET /cursos - OK');
        console.log('Cursos obtenidos:', getCursosResponse.body);

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

        console.log('POST /cursos - OK');
        console.log(`Curso creado: ${postResponse.body}`);

        await request(app)
            .delete(`/cursos/${nuevoCurso.codigo}`)
            .expect(200);

        console.log(`DELETE /cursos/${nuevoCurso.codigo} - OK`);
        console.log('Curso eliminado exitosamente');

        console.log('pruebas E2E de TestCursos completadas exitosamente');
    } catch (error) {
        console.error('E2E Error en pruebas de TestCursos:', error);
    }
}

testCursos();
