import express from "express";
import cors from "cors";
import cursoRouter from './routers/cursoRouter';
import salaRouter from "./routers/salaRouter";
import profesorRouter from "./routers/profesorRouter";
import seccionRouter from "./routers/seccionRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/cursos', cursoRouter);
app.use('/salas', salaRouter);
app.use('/profesores', profesorRouter);
app.use('/secciones', seccionRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
