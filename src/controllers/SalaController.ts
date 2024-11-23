import { Request, Response } from 'express';
import SalaRepository from '../repositories/SalaRepository';
import { Sala } from '../entities/Sala';

const salaRepository = new SalaRepository();

class SalaController {
    async getSalas(req: Request, res: Response) {
        console.log("GET -> /salas");
        const salas: Sala[] =  await salaRepository.getSalas();
        res.json(salas);
        console.log("RESPUESTA -> GET -> /salas");
    }
}

export default SalaController;
