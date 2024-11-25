import express from 'express';
import SeccionBloqueDiaController from '../controllers/SeccionBloqueDiaController';

const seccionBloqueDiaRouter = express.Router();
const seccionBloqueDiaController = new SeccionBloqueDiaController();

seccionBloqueDiaRouter.get('/', seccionBloqueDiaController.getSeccionBloqueDia);
seccionBloqueDiaRouter.delete('/:id/:id2/:id3/:id4',seccionBloqueDiaController.deleteSeccionBloqueDia);
seccionBloqueDiaRouter.post('/', seccionBloqueDiaController.createSeccionBloqueDia);


export default seccionBloqueDiaRouter;