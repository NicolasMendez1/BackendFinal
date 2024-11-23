import express from 'express';
import cursoRouter from '../src/routers/cursoRouter';
import salaRouter from '../src/routers/salaRouter';
import profesorRouter from '../src/routers/profesorRouter';
import seccionRouter from '../src/routers/seccionRouter';

const app = express();
app.use(express.json());

app.use('/cursos', cursoRouter);
app.use('/salas', salaRouter);
app.use('/profesores', profesorRouter);
app.use('/secciones', seccionRouter);

export default app; 