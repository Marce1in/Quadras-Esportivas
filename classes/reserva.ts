export class Reserva {
    public readonly horario: string[];
    public readonly data: string;

    constructor(horario: string[], data: string) {
        this.horario = horario;
        this.data = data;
    }

}
