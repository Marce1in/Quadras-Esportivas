import {Init} from "../classes/init"

const init = new Init

function App() {

    return (
        <>
            <h1 className="text-9xl text-lime-500">Quadra esportivas</h1>
            <br/>

            {init.listaQuadras.map((item) => {

                return (
                    <>
                        <span className="text-xl text-blue-500">
                              A quadra {item.apelido} de {item.esporte} tem: <br/> 
                              {item.obterHorarios().map((item) => item + ", ")} <br/>
                              Horários Disponiveis <br/> <br/>
                        </span>        
                    </>
                )
            })}

            {init.listaMembros.map((item) => {
                return (
                    <>
                        <span className="text-xl text-red-500">
                            O usuário {item.nome} Existe! <br/> <br/>
                        </span>
                    </>)
            })}

            {init.listaReservas.map((item) => {
                return (
                <>
                    <span className="text-xl text-purple-500">
                        <br/>
                        O usuário {init.listaMembros.find((itemM) => itemM.id == item.idMembro)?.nome}<br/>
                        Alugou a Quadra {init.listaQuadras.find((itemQ) => itemQ.id == item.idMembro)?.apelido}
                        Entre os horários {item.horario.map((itemR) => itemR + ", ")}<br/>
                        Na data {item.data}<br/>
                    </span>
                </>)
            })}
        </>
    )
}

export default App
