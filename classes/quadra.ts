export class Quadra {
    public readonly id: number

    public esporte: string
    public apelido: string | undefined

    private horarios: number[]
    private horariosReservados: number[]

    constructor(id: number, esporte: string, [horarioInicial, horarioFinal]: [string, string], apelido?: string){
        this.id = id

        this.esporte = esporte
        this.apelido = apelido

        this.horarios = this.criarHorarios([horarioInicial, horarioFinal]) 

        this.horariosReservados = []
    }

    private criarHorarios([horarioInicial, horarioFinal]: [string, string]): number[]{

        this.validarHoras([horarioInicial, horarioFinal])

        const horarioI: number[] = this.pegarHoras(horarioInicial)
        const horarioF: number[] = this.pegarHoras(horarioFinal)

        const horarios: number[] = []

        for (let i = horarioI[0]; i <= horarioF[0]; i++){

            horarios.push(i * 60)
            horarios.push(30 + i * 60)

        }

        if (horarioI[1] == 30){
            horarios.shift()
        }
        if (horarioF[1] == 0){
            horarios.pop()
        }

        return horarios
    }

    private pegarHoras(str: string): number[]{
        const arr:string[] = str.split(':') 

        return arr.map((num) => parseInt(num))
    }

    private validarHoras(str: string[] | string){

        //Se for uma array de strings, usa recursão para verificar cada valor dentro
        if ( Array.isArray(str) ){

            str.forEach( (item) => this.validarHoras(item) )

            return
        }

        if (str.length != 5)
            throw Error("Horário inválido")
        else if (str[2] != ":")
            throw Error("Horário inválido")

        const [hora, minuto] = this.pegarHoras(str) as [number, number]

        if (hora >= 24 || hora < 0 || hora == undefined)
            throw Error("Hora inválida")
        else if (minuto > 60 || minuto < 0 || hora == undefined)
            throw Error("Minuto inválido")
    }

    public obterHorarios(flag: string = 'f'): number[] | string[]{

        if (flag != 'f' && flag != 'n'){

            throw Error(`A flag ${flag} não existe`)
        }
        else if (flag == 'n'){

            return this.horarios
        }
        
        const horariosFormatados: string[] = this.horarios.map((item) => {

            const hora: number = Math.floor(item / 60)
            const minuto: number = item % 60

            return this.adicionarZero(hora) + ':' + this.adicionarZero(minuto)
        })

        return horariosFormatados
    }

    public obterHorariosReservados(flag: string = 'f'): number[] | string[]{

        if (flag != 'f' && flag != 'n'){

            throw Error(`A flag ${flag} não existe`)
        }
        else if (flag == 'n'){

            return this.horariosReservados
        }

        
        const horariosFormatados: string[] = this.horariosReservados.map((item) => {

            const hora: number = Math.floor(item / 60)
            const minuto: number = item % 60

            return this.adicionarZero(hora) + ':' + this.adicionarZero(minuto)
        })

        return horariosFormatados
    }

    private adicionarZero = (valor: number) => valor < 10 ? '0' + valor : valor.toString()

    public criarIntervalo([horarioInicial, horarioFinal]: [string, string]){

        this.validarHoras([horarioInicial, horarioFinal])

        const converterParaMinutos = (total: number, valor: number, index: number) => {
            return index % 2 == 0 ? total += valor * 60 : total += valor 
        }
        
        const horarioI: number = this.pegarHoras(horarioInicial).reduce(converterParaMinutos, 0)
        const horarioF: number = this.pegarHoras(horarioFinal).reduce(converterParaMinutos, 0)

        const horarioInicialIndex: number = this.horarios.indexOf(horarioI)
        const horarioFinalIndex: number = this.horarios.indexOf(horarioF)

        this.horarios.splice(horarioInicialIndex, horarioFinalIndex - horarioInicialIndex)
    }

    public reservar([horarioInicial, horarioFinal]: [string, string]){

        this.horariosReservados.push(...this.criarHorarios([horarioInicial, horarioFinal]))
    }
}
