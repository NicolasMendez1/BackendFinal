import request from 'supertest';
import app from './testSetup';

async function testProfesores() {
    try {
        // Test GET profesores
        await request(app)
            .get('/profesores')
            .expect(200);

        // Test CREATE profesor con disponibilidad
        const nuevoProfesor = {
            codigo: 140,
            nombre: 'Juan',
            apellidoPaterno: 'Pérez',
            apellidoMaterno: 'Gómez',
            esFullTime: true,
            bloquesDisponibles: Array(6).fill(Array(12).fill(false)).map((dia, i) => {
                if (i === 0) {
                    const primerDia = [...dia];
                    primerDia[0] = true;
                    primerDia[1] = true;
                    return primerDia;
                }
                return dia;
            })
        };

        await request(app)
            .post('/profesores')
            .send(nuevoProfesor)
            .expect(201);

        // Test UPDATE profesor con disponibilidad
        const profesorModificado = {
            ...nuevoProfesor,
            nombre: 'Juan Modificado',
            esFullTime: false,
            bloquesDisponibles: Array(6).fill(Array(12).fill(false)).map((dia, i) => {
                if (i === 1) { // Cambiamos disponibilidad al segundo día
                    const segundoDia = [...dia];
                    segundoDia[2] = true;
                    segundoDia[3] = true;
                    return segundoDia;
                }
                return dia;
            })
        };

        await request(app)
            .put(`/profesores/${profesorModificado.codigo}`)
            .send(profesorModificado)
            .expect(200);

        // Test DELETE profesor
        await request(app)
            .delete(`/profesores/${nuevoProfesor.codigo}`)
            .expect(200);

        console.log('>>EXITO<< E2E TestProfesores');
    } catch (error) {
        console.error('>>ERROR<< E2E TestProfesores:', error);
    }
}

export default testProfesores; 