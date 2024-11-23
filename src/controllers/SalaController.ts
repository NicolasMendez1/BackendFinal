import { Request, Response } from 'express';
import SalaRepository from '../repositories/SalaRepository';
import { Sala } from '../entities/Sala';

const salaRepository = new SalaRepository();

class SalaController {
    async getSalas(req: Request, res: Response) {
        console.log("GET -> /salas");
        const salas: Sala[] =  await salaRepository.getSalas();
        res.json(salas);
        console.log("RESPUESTA -> GET -> /salas");
    }

    async deleteSala(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log("Eliminado Id"+ id)
            await salaRepository.deleteSala(id)
            res.status(200).send()
        } catch (error) {
            console.error('Error al eliminar Sala:', error);
            res.status(500).send('Error al eliminar Sala');
        }
    }
    
    async createSala(req: Request, res: Response) {
        try {   
            const nuevaSala = req.body;
            const salaCreada = await salaRepository.createSala(nuevaSala);
            console.log('Sala creada exitosamente:', salaCreada);
            
            res.status(201).json(salaCreada);
        } catch (error: any) {
            res.status(500).json({
                error: 'Error al crear sala',
                details: error.message
            });
        }
    }

    async updateSala(req: Request, res: Response) {
        try {   
            const id = req.params.id;
            const salaEditada = req.body;
            await salaRepository.updateSala(id, salaEditada);
            console.log("Update de Sala")
            res.status(200).send();
        }
        catch (error: any) {
            res.status(500).json({
                error: 'Error al actualizar Sala',
                details: error.message
            });
        }
    }





}

export default SalaController;
