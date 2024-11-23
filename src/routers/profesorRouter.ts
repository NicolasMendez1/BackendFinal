import express from 'express';
import ProfesorController from '../controllers/ProfesorController';

const profesorRouter = express.Router();
const profesorController = new ProfesorController();

profesorRouter.get('/', profesorController.getProfesor);
profesorRouter.delete('/:id',profesorController.deleteProfesor)
profesorRouter.post('/', profesorController.createProfesor)
export default profesorRouter;