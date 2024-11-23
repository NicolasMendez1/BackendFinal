import express from 'express';
import CursoController from '../controllers/CursoController';

const cursoRouter = express.Router();
const cursoController = new CursoController();

cursoRouter.get('/', cursoController.getCursos);
cursoRouter.delete('/:id',cursoController.deleteCurso);
cursoRouter.post('/', cursoController.createCurso);
cursoRouter.put('/:id', cursoController.updateCurso);
export default cursoRouter;
