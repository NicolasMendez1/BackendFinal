import { Request, Response } from 'express';
import SeccionRepository from '../repositories/SeccionRepository';
import { Seccion } from '../entities/Seccion';

const seccionRepository = new SeccionRepository();

class SeccionController {
    async getSeccion(req: Request, res: Response) {
        console.log("GET -> /secciones");
        const secciones: Seccion[] =  await seccionRepository.getSeccion();
        res.json(secciones);
        console.log("RESPUESTA -> GET -> /secciones");
    }
}

export default SeccionController;