import request from 'supertest';
import app from './testSetup';

async function testCursos() {
    try {
        
        await request(app)
            .get('/cursos')
            .expect(200);

        const nuevoCurso = {
            codigo: "TEST002",
            nombre: "Curso de Prueba",
            horasCatedra: 4,
            horasLaboratorio: 2,
            nivel: 1,
            esAtemporal: false,
            esCursoGeneral: true,
            cantidadDeEstudiantes: 30
        };
        
        await request(app)
            .post('/cursos')
            .send(nuevoCurso)
            .expect(201);
        
        const cursoEditado = {
            codigo: "TEST002",
            nombre: "Curso de Prueba editado",
            horasCatedra: 4,
            horasLaboratorio: 2,
            nivel: 1,
            esAtemporal: false,
            esCursoGeneral: true,
            cantidadDeEstudiantes: 30
        };

        await request(app)
            .put(`/cursos/${nuevoCurso.codigo}`)
            .send(cursoEditado)
            .expect(200);

           
        await request(app)
            .delete(`/cursos/${nuevoCurso.codigo}`)
            .expect(200);
        

        console.log('>>EXITO<< E2E TestCursos');
    } catch (error) {
        console.error('>>ERROR<< E2E TestCursos:', error);
    }
}

export default testCursos;
