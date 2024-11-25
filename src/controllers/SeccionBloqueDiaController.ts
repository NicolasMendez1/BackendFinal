import { Request, Response } from 'express';
import SeccionBloqueDiaRepository from '../repositories/SeccionBloqueDiaRepository';
import { SeccionBloqueDia } from '../entities/SeccionBloqueDia';

const seccionBloqueDiaRepository = new SeccionBloqueDiaRepository();

class SeccionBloqueDiaController {
    async getSeccionBloqueDia(req: Request, res: Response) {
        console.log("GET -> /secciones bloque dia");
        const seccionesBloqueDia: SeccionBloqueDia[] =  await seccionBloqueDiaRepository.getSeccionBloqueDia();
        res.json(seccionesBloqueDia);
        console.log("RESPUESTA -> GET -> /secciones bloque dia");
    }

    async deleteSeccionBloqueDia(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const id2 = req.params.id2;
            const id3 = parseInt(req.params.id3);
            const id4 = parseInt(req.params.id4);
            console.log("Eliminado id - id2 - id3 - id4"+ id + id2 + id3 + id4)
            await seccionBloqueDiaRepository.deleteSeccionBloqueDia(id,id2,id3,id4)
            res.status(200).send()
        } catch (error) {
            console.error('Error al eliminar Seccion Bloque Dia:', error);
            res.status(500).send('Error al eliminar Seccion Bloque Dia');
        }
    }

    async createSeccionBloqueDia(req: Request, res: Response) {
        try {   
            const nuevaSeccionBloqueDia: SeccionBloqueDia = req.body;
            const seccionBloqueDiaCreada = await seccionBloqueDiaRepository.createSeccionBloqueDia(nuevaSeccionBloqueDia);
            console.log('Seccion Bloque Dia creada exitosamente:', seccionBloqueDiaCreada);
            
            res.status(201).json(seccionBloqueDiaCreada);
        } catch (error: any) {
            res.status(500).json({
                error: 'Error al crear seccion bloque dia',
                details: error.message
            });
        }
    }

}

export default SeccionBloqueDiaController;