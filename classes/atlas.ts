import { faker, fakerPT_BR } from "@faker-js/faker"

import { Quadra } from "./quadra"
import { Reserva } from "./reserva"
import { Membro } from "./membros"


/*
 * Atlas vem em homenagem ao titã da mitologia grega, Atlas.
 * Conhecido por carregar o mundo em suas costas, sua contraparte
 * nessa base de código serve como um pseudo-back-end, para ligar
 * as classes com o front-end.
*/

export class Atlas{


    public db: Db
    public gerar: Gerador
    public contas: Contas

    constructor(){
        this.db = new Db()
        this.gerar = new Gerador(this.db)
        this.contas = new Contas(this.db)
    }


}

//Uma pseudo-database, que salva seus dados no armazenamento interno do navegador
class Db {

    public quadras: {[id: string]: Quadra}
    public membros: {[id: string]: Membro}
    public reservas: {[id: string]: Reserva}

    constructor(){
        [this.quadras, this.membros, this.reservas] = [{}, {} , {}]
    }

    public criarMembro(nome: string): string{
        const id: string = faker.string.uuid()

        this.membros[id] = new Membro(nome)

        return id
    }
    public criarQuadra(esporte: string, horario: [string, string], apelido?: string): string{
        const id: string = faker.string.uuid()

        this.quadras[id] = new Quadra(esporte, horario, apelido)

        return id
    }
    public fazerReserva(idMembro: string, idQuadra: string, horario: [string, string]){

        this.reservas[idMembro + idQuadra] = new Reserva(horario)
    }
}

//Permite rápido geramento randômico de data para a database
class Gerador {

    private db: Db

    constructor(db: Db){
        this.db = db
    }

    public quadras(NUM_QUADRAS_GERADAS: number){

        for (let i = 0; i < NUM_QUADRAS_GERADAS; i++){
            const esporte: string = faker.helpers.arrayElement(["Futebol", "Basquete", "Volêi", "Padel"])
            const apelido: string = fakerPT_BR.location.city()
            const horarios: [string, string] = ["08:00","20:30"]
            const intervalo1: [string, string] = ["12:00", "13:30"]
            const intervalo2: [string, string] = ["16:30", "17:30"]

            const id: string = this.db.criarQuadra(esporte, horarios, apelido)

            this.db.quadras[id].criarIntervalo(intervalo1)
            this.db.quadras[id].criarIntervalo(intervalo2)
        } 
    }
    public membros(NUM_MEMBROS_GERADOS: number){

        for (let i = 0; i < NUM_MEMBROS_GERADOS; i++){
            const nome: string = fakerPT_BR.person.firstName()

            this.db.criarMembro(nome)
        }

    }
    public reservas(NUM_RESERVAS_GERADAS: number){

        for (let i = 0; i < NUM_RESERVAS_GERADAS; i++){

            const membroId: string = faker.helpers.objectKey(this.db.membros) as string
            const quadraId: string = faker.helpers.objectKey(this.db.quadras) as string

            const alugado: [string, string]= faker.helpers.arrayElement(
                [["09:00","10:00"],["14:30", "15:00"],["18:30", "20:00"]]) 

            this.db.fazerReserva(membroId, quadraId, alugado)
        }
    }
}

//Sistema de autenticação e criação de contas
class Contas {
    public sessao: string

    // @ts-ignore
    private db: Db

    constructor(db: Db){
        this.sessao = ""

        this.db = db
    }

    public registrar(){

    }

    public logar(){

    }

    public deslogar(){

    }
}
