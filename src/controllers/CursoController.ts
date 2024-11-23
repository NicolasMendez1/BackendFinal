import { Request, Response } from 'express';
import CursoRepository from '../repositories/CursoRepository';
import { Curso } from '../entities/Curso';

const cursoRepository = new CursoRepository();

class CursoController {
    async getCursos(req: Request, res: Response) {
        const cursos: Curso[] =  await cursoRepository.getCursos();
        res.json(cursos);
    }
}

export default CursoController;
