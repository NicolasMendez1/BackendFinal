import express from "express";
import cursoRouter from './routers/cursoRouter';
import salaRouter from "./routers/salaRouter";
import profesorRouter from "./routers/profesorRouter";

const app = express();

app.use('/cursos', cursoRouter);
app.use('/salas', salaRouter);
app.use('/profesores', profesorRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
