export class Reserva {
    public readonly idQuadra: string;
    public readonly idMembro: string;
    public readonly horario: string[];
    public readonly data: string;

    constructor(idMembro: string, idQuadra: string, horario: string[]) {
        this.idQuadra = idQuadra;
        this.idMembro = idMembro;
        this.horario = horario;
        this.data = Date();
    }

}
