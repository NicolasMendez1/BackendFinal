import express from "express";
import cursoRouter from './routers/cursoRouter';
import salaRouter from "./routers/salaRouter";

const app = express();

app.use('/cursos', cursoRouter);
app.use('/salas', salaRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
