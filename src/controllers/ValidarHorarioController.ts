import { Request, Response } from 'express';
import ValidarHorarioRepository from '../repositories/ValidarHorarioRepository';

const validarHorarioRepository = new ValidarHorarioRepository();

class ValidarHorarioController {
    async validarHorario(req: any, res: any) {
        try {   
            await validarHorarioRepository.validarHorario();
            res.status(200).json({horarioValido: true});
        } catch (error: any) {
            res.status(500).json({
                error: error,
            });
        }
    }
}

export default ValidarHorarioController;
