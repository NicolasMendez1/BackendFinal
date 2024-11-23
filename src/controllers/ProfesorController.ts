import { Request, Response } from 'express';
import ProfesorRepository from '../repositories/ProfesorRepository';
import { Profesor } from '../entities/Profesor';

const profesorRepository = new ProfesorRepository();

class ProfesorController {
    async getProfesor(req: Request, res: Response) {
        console.log("GET -> /profesores");
        const profesor: Profesor[] =  await profesorRepository.getProfesor();
        res.json(profesor);
        console.log("RESPUESTA -> GET -> /profesores");
    }
}

export default ProfesorController;