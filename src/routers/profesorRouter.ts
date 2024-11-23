import express from 'express';
import ProfesorController from '../controllers/ProfesorController';

const profesorRouter = express.Router();
const profesorController = new ProfesorController();

profesorRouter.get('/', profesorController.getProfesor);

export default profesorRouter;