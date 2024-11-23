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
            console.log('Datos recibidos para crear curso:', nuevoCurso);
            
            // Validación básica
            if (!nuevoCurso.nombre) {
                return res.status(400).json({ error: 'El nombre del curso es requerido' });
            }

            const cursoCreado = await cursoRepository.createCurso(nuevoCurso);
            console.log('Curso creado exitosamente:', cursoCreado);
            
            res.status(201).json(cursoCreado);
        } catch (error: any) {
            console.error('Error detallado al crear curso:', {
                message: error.message,
                stack: error.stack,
                errorDetails: error
            });
            res.status(500).json({
                error: 'Error al crear curso',
                details: error.message
            });
        }
    }



}

export default CursoController;
