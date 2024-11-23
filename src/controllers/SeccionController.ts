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

    async deleteSeccion(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const id2 = req.params.id2;
            console.log("Eliminado id - id2"+ id + id2)
            await seccionRepository.deleteSeccion(id,id2)
            res.status(200).send()
        } catch (error) {
            console.error('Error al eliminar Seccion:', error);
            res.status(500).send('Error al eliminar Seccion');
        }
    }
    
    async createSeccion(req: Request, res: Response) {
        try {   
            const nuevaSeccion = req.body;
            const seccionCreada = await seccionRepository.createSeccion(nuevaSeccion);
            console.log('Seccion creada exitosamente:', seccionCreada);
            
            res.status(201).json(seccionCreada);
        } catch (error: any) {
            res.status(500).json({
                error: 'Error al crear seccion',
                details: error.message
            });
        }
    }

    async updateSeccion(req: Request, res: Response) {
        try {   
            const id = req.params.id;
            const id2 = req.params.id;
            const seccionEditada = req.body;
            await seccionRepository.updateSeccion(id,id2, seccionEditada);
            console.log("Update de Seccion")
            res.status(200).send();
        }
        catch (error: any) {
            res.status(500).json({
                error: 'Error al actualizar seccion',
                details: error.message
            });
        }
    }


}

export default SeccionController;