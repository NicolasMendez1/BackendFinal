import express from 'express';
import ValidarHorarioController from '../controllers/ValidarHorarioController';

const validarHorarioRouter = express.Router();
const validarHorarioController = new ValidarHorarioController();

validarHorarioRouter.get('/', validarHorarioController.validarHorario);
export default validarHorarioRouter;