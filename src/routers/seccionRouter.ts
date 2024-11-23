import express from 'express';
import SeccionController from '../controllers/SeccionController';

const seccionRouter = express.Router();
const seccionController = new SeccionController();

seccionRouter.get('/', seccionController.getSeccion);
seccionRouter.delete('/:id/:id2',seccionController.deleteSeccion);
seccionRouter.post('/', seccionController.createSeccion);
seccionRouter.put('/:id/:id2', seccionController.updateSeccion);

export default seccionRouter;