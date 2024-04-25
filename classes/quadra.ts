export class Quadra {

    public esporte: string
    public apelido: string | undefined

    private horarios: number[]
    private horariosReservados: {[data: string]: number[]}

    constructor(esporte: string, [horarioInicial, horarioFinal]: [string, string], apelido?: string){
        this.esporte = esporte
        this.apelido = apelido

        this.horarios = this.criarHorarios([horarioInicial, horarioFinal]) 

        this.horariosReservados = {}
    }


    public reservar([horarioInicial, horarioFinal]: [string, string], data:string){

        if (this.horariosReservados[data] != undefined){

            this.horariosReservados[data].push(...this.criarHorarios([horarioInicial, horarioFinal]))

            return
        }

        this.horariosReservados[data] = this.criarHorarios([horarioInicial, horarioFinal])

    }


    public deletarReserva([horarioInicial, horarioFinal]: [string, string], data: string){

        this.deletarHorarios([horarioInicial, horarioFinal], this.horariosReservados[data])
    }


    public criarIntervalo([horarioInicial, horarioFinal]: [string, string]){

        this.deletarHorarios([horarioInicial, horarioFinal], this.horarios)
    }


    public recriarHorarios([horarioInicial, horarioFinal]: [string, string]){

        this.horarios = this.criarHorarios([horarioInicial, horarioFinal])
    }


    public resetarHorariosReservados(data: string){
        this.horariosReservados[data] = []
    }


    //Mano, PQ OS TIPOS TEM Q TER NOMES TÃO GRANDES, sério, 'boolean'? 7 L.E.T.R.A.S??
    //
    //Em resumo, para "filtrarHorarios" funcionar ele precisa de uma data, por isso
    //filtrar e data são passados como uma array, para o desenvolvedor ser obrigado
    //a passar os dois se quiser filtrar algo.
    public obterHorarios(formatar: boolean = true, [filtrar, data]: [boolean, string?] = [false, undefined]): number[] | string[]{

        let horarios: number[];

        if(filtrar){
            if(data == undefined)
                throw Error("Erro! a opção filtrar precisa de uma data!")

            horarios = this.filtrarHorarios(this.horarios, this.horariosReservados[data])
        } 
        else {
            horarios = [...this.horarios]
        }
        

        if (formatar){

            return this.formatarHorarios(horarios)
        }

        return horarios
    }


    public obterHorariosReservados(formatar: boolean = true, data: string): number[] | string[]{

        if(formatar){
            return this.formatarHorarios(this.horariosReservados[data])
        }

        return [...this.horariosReservados[data]]
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

    private filtrarHorarios(horarios: number[], filtro: number[]): number[]{

        if (filtro == undefined){
            console.log("Não existem horários reservados com essa data...")
            return [...horarios]
        }

        return horarios.filter(item => !filtro.includes(item))
    }

    //Helper que adiciona um zero na frente do número se ele ser menor que 10
    private adicionarZero = (valor: number) => valor < 10 ? '0' + valor : valor.toString()
}
