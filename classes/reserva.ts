export class Reserva {
    public readonly horario: string[];
    public readonly data: string;
    public readonly idMembro: string
    public readonly idQuadra: string

    constructor(horario: string[], data: string, idMembro: string, idQuadra: string) {
        this.horario = horario;
        this.data = data;
        this.idMembro = idMembro
        this.idQuadra = idQuadra
    }

}
