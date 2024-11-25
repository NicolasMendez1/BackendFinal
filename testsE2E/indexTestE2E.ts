import testCursos from './testCursos';
import testSalas from './testSalas';
import testProfesores from './testProfesores';
import testSecciones from './testSecciones';
import testSeccionesBloquesDias from './testSeccionBloqueDia';

async function runE2ETests() {
    try {
        // await testCursos();
        // await testSalas();
        // await testProfesores();
        // await testSecciones();
        await testSeccionesBloquesDias();
        
    } catch (error) {
        console.error('Error durante la ejecución de las pruebas E2E:', error);
        process.exit(1);
    }
}

runE2ETests();
