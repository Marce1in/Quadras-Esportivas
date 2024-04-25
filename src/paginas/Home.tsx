import Atlas from '../../classes/atlas.ts'
import Modal from '../componentes/Modal.tsx'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function Home({atlas}: {atlas: Atlas}){

    const navegar = useNavigate()

    //Verifica se o usuário está autenticado
    useEffect(()=>{
        if(atlas.contas.sessao == ""){
            navegar('/login')
        }
    })

    const {register, handleSubmit, reset} = useForm()

    //Pega a data atual do computador em formato ISO YYYY/DD/MM
    const dataHoje = new Date().toISOString().split("T", 1)[0];

    //Controla o fechamento e abertura dos pop-ups
    const [estadoQ, abrirQuadra] = useState(false)
    const [estadoR, abrirReservas] = useState(false)

    //Salva a chave da Quadra selecionada pelo usuário
    const [chave, setChave] = useState("")

    //Salva a data Selecionada no <input type=date/>. Usado para mostrar as diferentes
    //datas disponíveis em diferentes dias
    const [dataSelecionada, setData] = useState(dataHoje)

    //Puxa as classes e chaves (id) da database e as salva em arrays
    const quadrasChaves = Object.keys(atlas.db.quadras)
    const quadras = quadrasChaves.map((id) => atlas.db.quadras[id])

    const reservasChaves = Object.keys(atlas.db.reservas)
    const reservas = reservasChaves.map((id) => atlas.db.reservas[id])


    function reservar(data: any, reset: any){

        //Solução porca pacas, mais to sem tempo irmão
        if (data.hi == "Horário Inicial" || data.hf == "Horário Final") return

        const usuario: string = atlas.contas.sessao
        const quadra: string = chave

        atlas.db.fazerReserva(usuario, quadra, [data.hi, data.hf], data.data)

        //Reseta o formulário
        setData(dataHoje)
        reset()
    }

    function cancelarReserva(id: string){
        atlas.db.deletarReserva(id)

        //PQ DIABOS REACT N TEM UM JEITO DE FORÇAR RECARREGAR O COMPONENTE MANUALMENTE???
        //EU N QUERO CRIAR 10000 STATE PRA CADA COISINHA VEI,
        //ELES COM CERTEZA TEM UM BOM MOTIVO, MAS MDSSSSSSSS
        //
        //enfim, abaixo é um jeito extremamente horrendo, mas recarrega o componente,
        //sem tempo de fazer coisa bonitinha, tem q entregar esse bagulho amanhã
        abrirReservas(false)
    }

    function deslogar(){
        atlas.contas.sessao = ""
        navegar("/login")
    }


    return (
        <>
            <nav className='flex flex-wrap justify-end gap-4 py-4 pr-4'>
                <button className='btn btn-primary' onClick={() => abrirReservas(true)}>
                    Ver Reservas
                </button>
                <button className='btn btn-error' onClick={() => deslogar()}>
                    Sair
                </button>
            </nav>

            {/*Cards com todas as quadras*/}
            <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4vw] justify-items-center p-[5vw]'>
                {quadras.map((item, i)=>{
                    
                    return(
                        <Card 
                            apelido={item.apelido} 
                            esporte={item.esporte} 
                            horarios={item.obterHorarios() as string[]}

                            abrirModal={() => abrirQuadra(true)}
                            setChave={() => setChave(quadrasChaves[i])}

                            key={quadrasChaves[i]}
                        />
                    )}
                )}
            </main>

            {/*Pop-up de reservar quadra*/}
            {estadoQ &&
                <Modal openModal={estadoQ} closeModal={() => abrirQuadra(false)}> 

                    <form 
                        onSubmit={handleSubmit(data => reservar(data, reset))}
                        className='flex flex-col items-center gap-6 py-5'
                    >
                        <label className="form-control w-full max-w-xs">
                            <input 
                                className="input input-bordered input-success" 
                                type="date" 
                                min={dataHoje} 
                                value={dataSelecionada} 
                                required 
                                {...register("data")}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <select 
                                className="select 
                                select-success" 
                                defaultValue="Horário Inicial" 
                                required 
                                {...register("hi")}
                            >

                                <option disabled value="Horário Inicial">
                                    Horário Inicial
                                </option>

                                {atlas.db.quadras[chave].obterHorarios(true, [true, dataSelecionada]).map(item => 

                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )}

                            </select>
                        </label>              

                        <label className="form-control w-full max-w-xs">
                            <select 
                                className="select select-success" 
                                defaultValue="Horário Final" 
                                required 
                                {...register("hf")}
                            >

                                <option disabled value="Horário Final">
                                    Horário Final
                                </option>

                                {atlas.db.quadras[chave].obterHorarios(true, [true, dataSelecionada]).map(item => 

                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )}

                            </select>
                        </label>              

                        <button className="btn btn-success" type="submit">
                            Reservar
                        </button>
                    </form>


                </Modal>
            }

            {/*Pop-up de listar reservas e deleta-las*/}
            {estadoR &&
                <Modal openModal={estadoR} closeModal={() => abrirReservas(false)}>
                    <div className='flex flex-col gap-10'>
                        <h2 className='text-primary card-title text-2xl justify-center text-center'>
                            Reservas
                        </h2>
                        {reservas.map((item, i) => { 


                            // O usuário só tem acesso as suas reservas
                            // 100% seguro confia ;P
                            if(item.idMembro != atlas.contas.sessao)
                                return

                            // os ts-ignore é só pra eu não ter que importar a classes Quadra
                            // só confia que ela existe (se não existir nada ia funcionar anyway)
                            // @ts-ignore
                            const quadra = atlas.db.obterPorId('Q', item.idQuadra) as Quadra

                            return(
                                <section 
                                    key={reservasChaves[i]} 
                                    className='card card-bordered items-center py-5 gap-4 shadow-xl border-neutral-content'
                                >
                                    <h2 className='card-title text-primary justify-center'>
                                        Horário
                                    </h2>
                                    <span className='text-base/5 font-medium text-center'>
                                        Entre 
                                        <strong>{item.horario[0]}</strong> 
                                        e 
                                        <strong>{item.horario[1]}</strong>
                                    </span>
                                    <h2 className='card-title text-primary justify-center'>
                                        Data
                                    </h2>
                                    <span className='text-base/5 font-medium text-center'>
                                        <strong>{item.data}</strong>
                                    </span>
                                    <h2 className='card-title text-primary justify-center'>
                                        Quadra
                                    </h2>
                                    <span className='text-base/5 font-medium text-center'>
                                        <strong>{quadra.apelido}</strong>
                                        <br/>de<br/>
                                        <strong>{quadra.esporte}</strong>
                                    </span>
                                    <button 
                                        className="btn btn-error" 
                                        onClick={() => cancelarReserva(reservasChaves[i])}
                                    >
                                        Cancelar
                                    </button>
                                </section>
                            )}
                        )}
                    </div>
                </Modal>
            }
        </>
    )
}

interface cardProps{
    apelido?: string,
    esporte: string,
    horarios: string[],
    abrirModal: () => void,
    setChave: () => void,
}

function Card({apelido, esporte, horarios, abrirModal, setChave}: cardProps){
    return (
        <section className="card card-bordered border-success-content w-full bg-base-100 shadow-xl">
            <div className="card-body">

                <h2 className="card-title justify-center">
                    {apelido ? apelido : "Quadra" }
                </h2>

                <h3 className="text-xl/5 font-medium py-5">
                    Esporte: {esporte}
                </h3>

                <h3 className="text-xl/5 font-medium py-5">
                    Horários: {horarios[0]} até {horarios[horarios.length - 1]}
                </h3>

                <div className="card-actions justify-center">
                    <button 
                        className="btn btn-success text-xl/5" 
                        onClick={() => {abrirModal(); setChave()}}
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Home
