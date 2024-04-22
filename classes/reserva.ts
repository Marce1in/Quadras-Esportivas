export class Reserva {
    public readonly horario: string[];
    public readonly data: string;

    constructor(horario: string[]) {
        this.horario = horario;
        this.data = Date();
    }

}
