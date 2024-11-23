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

    async deleteProfesor(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log("Eliminado Id"+ id)
            await profesorRepository.deleteProfesor(id)
            res.status(200).send()
        } catch (error) {
            console.error('Error al eliminar Profesor:', error);
            res.status(500).send('Error al eliminar Profesor');
        }
    }
    
    async createProfesor(req: Request, res: Response) {
        try {   
            const nuevoProfesor = req.body;
            const profesorCreado = await profesorRepository.createProfesor(nuevoProfesor);
            console.log('Profesor creado exitosamente:', profesorCreado);
            
            res.status(201).json(profesorCreado);
        } catch (error: any) {
            res.status(500).json({
                error: 'Error al crear profesor',
                details: error.message
            });
        }
    }

    async updateProfesor(req: Request, res: Response) {
        try {   
            const id = req.params.id;
            const profesorEditado = req.body;
            await profesorRepository.updateProfesor(id, profesorEditado);
            console.log("Update de Profesor")
            res.status(200).send();
        }
        catch (error: any) {
            res.status(500).json({
                error: 'Error al actualizar Profesor',
                details: error.message
            });
        }
    }



}

export default ProfesorController;