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

export default class Atlas{


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
        [this.quadras, this.membros, this.reservas] = [{}, {}, {}]
    }

    public criarMembro(nome: string, senha: string, admin = false): string{
        const id: string = faker.string.uuid()

        this.membros[id] = new Membro(nome, senha, admin)

        return id
    }

    public criarQuadra(esporte: string, horario: [string, string], apelido?: string): string{
        const id: string = faker.string.uuid()

        this.quadras[id] = new Quadra(esporte, horario, apelido)

        return id
    }

    //SIM, 'hi' e 'hf' são: horário Inicial e horário Final, EU NAO AGUENTO MAIS ESCREVER VARIAVEIS LONGAS
    public fazerReserva(idMembro: string, idQuadra: string, [hi, hf]: [string, string], data: string){
        const id: string = faker.string.uuid()

        this.reservas[id] = new Reserva([hi, hf], data, idMembro, idQuadra)

        this.quadras[idQuadra].reservar([hi, hf], data)
    }

    public deletarQuadra(idQuadra: string){

        delete this.quadras[idQuadra]
    }
    public deletarMembro(idMembro: string){

        delete this.membros[idMembro]
    }
    public deletarReserva(idReserva: string){

        delete this.reservas[idReserva]
    }

    //Q para quadras, R para reservas, M para membros
    public obterPorId(flag: string, id: string){

        if (flag == 'Q'){
            const keys = Object.keys(this.quadras)
            const index = keys.indexOf(id)

            if (index == undefined){
                return index
            }

            return this.quadras[keys[index]]
        }
        else if (flag == 'R'){
            const keys = Object.keys(this.reservas)
            const index = keys.indexOf(id)

            if (index == undefined){
                return index
            }

            return this.reservas[keys[index]]
        }
        else if (flag == 'M'){
            const keys = Object.keys(this.membros)
            const index = keys.indexOf(id)

            if (index == undefined){
                return index
            }

            return this.membros[keys[index]]
        }
        else{
            throw Error("Flag incorreta! 'Q' para quadras, 'M' para membros 'R' para reservas")
        }

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
            const apelido: string = faker.lorem.words({min: 1, max: 2})

            const horarioI = faker.helpers.arrayElement(["07:00", "08:00", "10:00", "11:30"])
            const horarioF = faker.helpers.arrayElement(["19:30", "20:00", "22:00", "18:00"])
            const horarios: [string, string] = [horarioI, horarioF]

            // const intervalo1: [string, string] = ["12:00", "13:30"]
            // const intervalo2: [string, string] = ["16:30", "17:30"]

            this.db.criarQuadra(esporte, horarios, apelido)

            // this.db.quadras[id].criarIntervalo(intervalo1)
            // this.db.quadras[id].criarIntervalo(intervalo2)
        } 
    }
    public membros(NUM_MEMBROS_GERADOS: number){

        for (let i = 0; i < NUM_MEMBROS_GERADOS; i++){
            const nome: string = fakerPT_BR.person.firstName()
            const senha: string = fakerPT_BR.person.zodiacSign()

            this.db.criarMembro(nome, senha, false)
        }

    }
    public reservas(NUM_RESERVAS_GERADAS: number){

        for (let i = 0; i < NUM_RESERVAS_GERADAS; i++){

            const membroId: string = faker.helpers.objectKey(this.db.membros) as string
            const quadraId: string = faker.helpers.objectKey(this.db.quadras) as string

            const alugado: [string, string]= faker.helpers.arrayElement(
                [["09:00","10:00"],["14:30", "15:00"],["18:30", "20:00"]]) 

            const data = faker.date.soon({days: 90}).toISOString().split("T", 1)[0]

            this.db.fazerReserva(membroId, quadraId, alugado, data)
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

    public registrar(nome: string, senha: string){
        let existe: boolean = false

        Object.keys(this.db.membros).map(item => {
            if (this.db.membros[item].nome == nome){
                alert("Esse usuário já existe!")
                existe = true
            }
        })

        if (existe) return false

        this.db.criarMembro(nome, senha)

        return true
    }

    public logar(nome: string, senha: string){

        Object.keys(this.db.membros).map(item => {
            if (this.db.membros[item].nome == nome && this.db.membros[item].senha == senha){

                this.sessao = item
            }
        })

    }

    public deslogar(){
        this.sessao = ""
    }
}
