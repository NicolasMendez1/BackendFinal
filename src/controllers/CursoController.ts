import { Request, Response } from 'express';
import CursoRepository from '../repositories/CursoRepository';
import { Curso } from '../entities/Curso';

const cursoRepository = new CursoRepository();

class CursoController {
    async getCursos(req: Request, res: Response) {
        console.log("GET -> /cursos");
        const cursos: Curso[] =  await cursoRepository.getCursos();
        res.json(cursos);
        console.log("RESPUESTA -> GET -> /cursos");
    }
}

export default CursoController;
