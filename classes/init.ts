import { faker, fakerPT_BR } from "@faker-js/faker"

import { Quadra } from "./quadra"
import { Reserva } from "./reserva"
import { Membro } from "./membros"

export class Init{
    public listaQuadras: Quadra[]
    public listaMembros: Membro[]
    public listaReservas: Reserva[]

    public sessao: string

    constructor(){
        this.listaQuadras = this.gerarQuadras()
        this.listaMembros = this.gerarMembros()
        this.listaReservas = this.gerarReservas()

        this.sessao = "anonymous"
    }

    public criarMembro(nome: string){
        const id = faker.string.uuid()

        this.listaMembros.push(new Membro(id ,nome))

        this.sessao = id 
    }
    public criarQuadra(esporte: string, horario: [string, string], apelido?: string){

        this.listaQuadras.push(new Quadra(faker.string.uuid(), esporte, horario, apelido))
    }
    public fazerReserva(idQuadra: string, horario: [string, string]){

        this.listaReservas.push(new Reserva(this.sessao, idQuadra, horario))    
    }

    private gerarQuadras(): Quadra[]{
        const quadras: Quadra[] = []

        const NUM_QUADRAS_GERADAS: number = 10

        for (let i = 0; i < NUM_QUADRAS_GERADAS; i++){
            const id: string = faker.string.uuid()
            const esporte: string = faker.helpers.arrayElement(["Futebol", "Basquete", "Volêi", "Padel"])
            const apelido: string = fakerPT_BR.location.city()
            const horarios: [string, string] = ["08:00","20:30"]
            const intervalo1: [string, string] = ["12:00", "13:30"]
            const intervalo2: [string, string] = ["16:30", "17:30"]

            const quadra: Quadra = new Quadra(id, esporte, horarios, apelido)

            quadra.criarIntervalo(intervalo1)
            quadra.criarIntervalo(intervalo2)

            quadras.push(quadra)
        }

        return quadras
    }
    private gerarMembros(): Membro[]{
        const membros: Membro[] = []

        const NUM_MEMBROS_GERADOS: number = 5

        for (let i = 0; i < NUM_MEMBROS_GERADOS; i++){
            const id: string = faker.string.uuid() 
            const nome: string = fakerPT_BR.person.firstName()

            const membro: Membro = new Membro(id, nome)

            membros.push(membro)
        }

        return membros
    }
    private gerarReservas(): Reserva[]{
        const reservas: Reserva[] = []
        
        const NUM_RESERVAS_GERADAS: number = 3

        for (let i = 0; i < NUM_RESERVAS_GERADAS; i++){

            const membro: Membro = faker.helpers.arrayElement(this.listaMembros)
            const quadra: Quadra = faker.helpers.arrayElement(this.listaQuadras)

            const alugado: [string, string]= faker.helpers.arrayElement(
                [["09:00","10:00"],["14:30", "15:00"],["18:30", "20:00"]]) 

            const reserva: Reserva = new Reserva(membro.id, quadra.id, alugado)

            this.listaQuadras.forEach((obj, i, arr) => {
                if (obj.id == quadra.id){
                    arr[i].reservar(alugado)
                }

            })

            reservas.push(reserva)
        }

        return reservas
    }
}
