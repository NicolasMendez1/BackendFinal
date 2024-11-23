import express from 'express';
import SeccionController from '../controllers/SeccionController';

const seccionRouter = express.Router();
const seccionController = new SeccionController();

seccionRouter.get('/', seccionController.getSeccion);

export default seccionRouter;