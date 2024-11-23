import express from 'express';
import CursoController from '../controllers/CursoController';

const cursoRouter = express.Router();
const cursoController = new CursoController();

cursoRouter.get('/', cursoController.getCursos);

export default cursoRouter;
