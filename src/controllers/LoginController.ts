import { Request, Response } from 'express';
import LoginRepository from '../repositories/LoginRepository'; // Updated casing

const loginRepository = new LoginRepository();


class LoginController {
    async login(req: any, res: any) {
        try {
            const { username, password: userPassword } = req.body;

            // Obtenemos las credenciales desde la base de datos
            const credenciales = await loginRepository.getCredenciales();

            console.log(credenciales);
            const usuario = credenciales.find((cred: any) => cred.correo.toLowerCase() === username.toLowerCase());


            if (usuario && usuario.contrasena === userPassword) {
                return res.status(200).json({
                    message: "OK"
                });
            } else {
                return res.status(401).json({
                    message: "Credenciales incorrectas"
                });
            }
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error interno en el servidor",
                error: error.message,
            });
        }
    }
}

export default LoginController;
