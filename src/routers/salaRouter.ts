import express from 'express';
import SalaController from '../controllers/SalaController';

const salaRouter = express.Router();
const salaController = new SalaController();

salaRouter.get('/', salaController.getSalas);
salaRouter.delete('/:id',salaController.deleteSala);
salaRouter.post('/', salaController.createSala);
salaRouter.put('/:id', salaController.updateSala);
export default salaRouter;