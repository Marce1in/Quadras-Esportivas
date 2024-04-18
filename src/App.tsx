import { Quadra } from "../classes/quadra"

function debug(){

    const teste = new Quadra(1, "volei", ["07:00","17:00"], "canoas") 
    console.log("Criando horários entre 07:00 e 17:00")
    console.log("Horários:")
    console.log(teste.obterHorarios())
    console.log(teste.obterHorarios("n"))

    console.log("Reservando horários entre 13:30 e 15:00")
    console.log("Horários Reservados:")
    teste.reservar(["13:30","15:00"])
    console.log(teste.obterHorariosReservados())
    console.log(teste.obterHorariosReservados("n"))

    console.log("Adicionando um interalo entre 12:00 e 13:00")
    console.log("Horários com Intervalo:")
    teste.criarIntervalo(["12:00","13:00"])
    console.log(teste.obterHorarios())
    console.log(teste.obterHorarios("n"))

}

function App() {

    return (
        <>
            <h1 className="text-9xl text-lime-500">Quadra esportivas</h1>
            {debug()}
        </>
    )
}

export default App
