export class Membro {
    public nome: string
    public senha: string
    public admin: boolean

    constructor(nome: string, senha: string, admin = false){
        this.nome = nome
        this.senha = senha
        this.admin = admin
    }
}
