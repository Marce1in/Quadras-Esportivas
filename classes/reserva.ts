export class Reserva {
    public readonly idQuadra: number;
    public readonly idMembro: number;
    public readonly horario: string[];
    public readonly data: string;

    constructor(idMembro: number, idQuadra: number, horario: string[]) {
        this.idQuadra = idQuadra;
        this.idMembro = idMembro;
        this.horario = horario;
        this.data = Date();
    }

}
