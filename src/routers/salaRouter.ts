import express from 'express';
import SalaController from '../controllers/SalaController';

const salaRouter = express.Router();
const salaController = new SalaController();

salaRouter.get('/', salaController.getSalas);

export default salaRouter;