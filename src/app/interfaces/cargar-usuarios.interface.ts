import { Usuario } from "../models/usuario.model";

export interface CargarUsuariosResp {
    totalRegistros: number;
    usuarios : Usuario[];
}