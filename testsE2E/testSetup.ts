import express from 'express';
import cursoRouter from '../src/routers/cursoRouter';
import salaRouter from '../src/routers/salaRouter';
import profesorRouter from '../src/routers/profesorRouter';
import seccionRouter from '../src/routers/seccionRouter';
import seccionBloqueDiaRouter from '../src/routers/seccionBloqueDiaRouter';

const app = express();
app.use(express.json());

app.use('/cursos', cursoRouter);
app.use('/salas', salaRouter);
app.use('/profesores', profesorRouter);
app.use('/secciones', seccionRouter);
app.use('/seccionesBloqueDia', seccionBloqueDiaRouter);

export default app; 