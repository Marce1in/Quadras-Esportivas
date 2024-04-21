export class Quadra {
    public readonly id: string

    public esporte: string
    public apelido: string | undefined

    private horarios: number[]
    private horariosReservados: number[]

    constructor(id: string, esporte: string, [horarioInicial, horarioFinal]: [string, string], apelido?: string){
        this.id = id

        this.esporte = esporte
        this.apelido = apelido

        this.horarios = this.criarHorarios([horarioInicial, horarioFinal]) 

        this.horariosReservados = []
    }


    public reservar([horarioInicial, horarioFinal]: [string, string]){

        this.horariosReservados.push(...this.criarHorarios([horarioInicial, horarioFinal]))

        //Organiza a array em ordem do menor para o maior
        this.horarios.sort((x, y) => x - y)
    }


    public deletarReserva([horarioInicial, horarioFinal]: [string, string]){

        this.deletarHorarios([horarioInicial, horarioFinal], this.horariosReservados)
    }


    public criarIntervalo([horarioInicial, horarioFinal]: [string, string]){

        this.deletarHorarios([horarioInicial, horarioFinal], this.horarios)
    }


    public recriarHorarios([horarioInicial, horarioFinal]: [string, string], recriar: boolean = true){

        if (recriar){
            this.horariosReservados = []
        }

        this.horarios = this.criarHorarios([horarioInicial, horarioFinal])
    }


    public resetarHorariosReservados(){
        this.horariosReservados = []
    }


    public obterHorarios(formatar: boolean = true, filtrar: boolean = false): number[] | string[]{

        let horarios: number[];

        if(filtrar){

            horarios = this.filtrarHorarios(this.horarios, this.horariosReservados)
        } 
        else {
            horarios = [...this.horarios]
        }
        

        if (formatar){

            return this.formatarHorarios(horarios)
        }

        return horarios
    }


    public obterHorariosReservados(formatar: boolean = true): number[] | string[]{

        if(formatar){
            return this.formatarHorarios(this.horariosReservados)
        }

        return [...this.horariosReservados]
    }


    //Funções privadas, é aqui onde o filho chora e mãe não vê...


    private deletarHorarios([horarioInicial, horarioFinal]: [string, string], horario: number[]){

        this.validarHoras([horarioInicial, horarioFinal])

        const converterParaMinutos = (total: number, valor: number, index: number) => {
            return index % 2 == 0 ? total += valor * 60 : total += valor 
        }

        const horarioI: number = this.pegarHoras(horarioInicial).reduce(converterParaMinutos, 0)
        const horarioF: number = this.pegarHoras(horarioFinal).reduce(converterParaMinutos, 0)

        const horarioInicialIndex: number = this.horarios.indexOf(horarioI)
        const horarioFinalIndex: number = this.horarios.indexOf(horarioF)

        //Deleta todos os horários entre o Horário Inicial e o Horário Final
        horario.splice(horarioInicialIndex, horarioFinalIndex - horarioInicialIndex)
    }

    private criarHorarios([horarioInicial, horarioFinal]: [string, string]): number[]{

        this.validarHoras([horarioInicial, horarioFinal])

        const horarioI: number[] = this.pegarHoras(horarioInicial)
        const horarioF: number[] = this.pegarHoras(horarioFinal)

        const horarios: number[] = []

        /*
        Cria todos os horários entre o inicial e o final em minutos. ex:
        12:00 e 14:30 gerariam: [720, 750, 780, 810, 840, 870].
        12:00 horas em minutos são 720, 14:30 em minutos são 870...
        */

        for (let i = horarioI[0]; i <= horarioF[0]; i++){

            horarios.push(i * 60)
            horarios.push(30 + i * 60)

        }

        /*
        O loop acima SEMPRE cria o horário e o horário + 30 minutos,
        Então independente se o horarioInicial fosse 12:30, ainda seria
        criado o horário 12:00, o código abaixo remove essas inconsistências.
        */
        if (horarioI[1] == 30){
            horarios.shift()
        }
        if (horarioF[1] == 0){
            horarios.pop()
        }

        return horarios
    }

    //Transforma uma string em uma array de números. Ex: "12:30" vira [12, 30]
    private pegarHoras(str: string): number[]{
        const arr:string[] = str.split(':') 

        return arr.map((num) => parseInt(num))
    }

    //Valida se as horas foram passadas no formato correto "hh:mm"
    private validarHoras(str: string[] | string){

        //Se for uma array de strings, usa recursão para verificar cada valor dentro
        if ( Array.isArray(str) ){

            str.forEach( (item) => this.validarHoras(item) )

            return
        }

        if (str.length != 5)
        throw Error(`Horário inválido ${str}`)
        else if (str[2] != ":")
        throw Error(`Horário inválido ${str}`)

        const [hora, minuto] = this.pegarHoras(str) as [number, number]

        if (hora >= 24 || hora < 0 || hora == undefined)
        throw Error(`Hora inválida ${hora}`)
        else if (minuto > 60 || minuto < 0 || minuto == undefined)
        throw Error(`Minuto inválido ${minuto}`)
    }

    //Formata a array de horários em minutos para uma array de strings de horas e minutos. 
    //ex: [720, 750, 780] se transforma em ["12:00", "12:30", "13:00"]
    private formatarHorarios(horarios: number[]): string[]{

        const horariosFormatados: string[] = horarios.map((item) => {

            const hora: number = Math.floor(item / 60)
            const minuto: number = item % 60

            return this.adicionarZero(hora) + ':' + this.adicionarZero(minuto)
        })

        return horariosFormatados
    }

    //Filtra com complexidade linear, O(n)
    private filtrarHorarios(horarios: number[], filtro: number[]): number[]{

        let i: number = 0;

        return horarios.flatMap((item) => {

            if (item == filtro[i]) return [] 

            i++;
            return [item]
        })
    }

    //Helper que adiciona um zero na frente do número se ele ser menor que 10
    private adicionarZero = (valor: number) => valor < 10 ? '0' + valor : valor.toString()
}
