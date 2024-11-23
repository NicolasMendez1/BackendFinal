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

    async deleteCurso(req: Request, res: Response) {
        const id = req.params.id;
        console.log("Eliminado Id"+ id)
        await cursoRepository.deleteCurso(id)
        res.status(200).send()
    }
    
    async createCurso(req: Request, res: Response) {
        try {   
            const nuevoCurso = req.body;
            console.log(req.body)
            await cursoRepository.createCurso(nuevoCurso)
            res.status(200).send()
        } catch (error) {
            console.error('Error al crear curso:', error);
            res.status(500).send('Error al crear curso');
        }
    }



}

export default CursoController;
