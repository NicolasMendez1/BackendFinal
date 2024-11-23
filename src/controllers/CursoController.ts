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
        try {
            const id = req.params.id;
            console.log("Eliminado Id"+ id)
            await cursoRepository.deleteCurso(id)
            res.status(200).send()
        } catch (error) {
            console.error('Error al eliminar curso:', error);
            res.status(500).send('Error al eliminar curso');
        }
    }
    
    async createCurso(req: Request, res: Response) {
        try {   
            const nuevoCurso = req.body;
            const cursoCreado = await cursoRepository.createCurso(nuevoCurso);
            console.log('Curso creado exitosamente:', cursoCreado);
            
            res.status(201).json(cursoCreado);
        } catch (error: any) {
            res.status(500).json({
                error: 'Error al crear curso',
                details: error.message
            });
        }
    }

    async updateCurso(req: Request, res: Response) {
        try {   
            const id = req.params.id;
            const cursoEditado = req.body;
            await cursoRepository.updateCurso(id, cursoEditado);
            res.status(200).send();
        }
        catch (error: any) {
            res.status(500).json({
                error: 'Error al actualizar curso',
                details: error.message
            });
        }
    }

}

export default CursoController;
