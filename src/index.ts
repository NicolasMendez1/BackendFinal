import express from "express";
import cursoRouter from './routers/cursoRouter';

const app = express();

app.use('/cursos', cursoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
