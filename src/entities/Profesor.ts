export interface Profesor {
    codigo: number;
    nombre: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    esFullTime: boolean;
    bloquesDisponibles: boolean[][];
} 