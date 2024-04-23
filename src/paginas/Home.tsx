import Atlas from '../../classes/atlas.ts'
import Modal from '../componentes/Modal.tsx'
import { useState } from 'react'

function Home({atlas}: {atlas: Atlas}){

    const [modal, setModal] = useState(false)
    const [chave, setChave] = useState("")

    const quadrasChaves = Object.keys(atlas.db.quadras)

    const quadras = quadrasChaves.map((id)=>{
        
        return atlas.db.quadras[id] 
    })


    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4vw] justify-items-center p-[5vw]'>
                {quadras.map((item, i)=>{
                    return (
                        <Card 
                            apelido={item.apelido} 
                            esporte={item.esporte} 
                            horarios={item.obterHorarios() as string[]}

                            abrirModal={() => setModal(true)}
                            setChave={() => setChave(quadrasChaves[i])}

                            key={quadrasChaves[i]}
                        />
                    )
                })}
            </div>

            <Modal openModal={modal} closeModal={() => setModal(false)}> 
                <div>Olá mundo CARALHO</div>
                <h1>{chave}</h1>
            </Modal>
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
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">

                <h2 className="card-title justify-center">{apelido ? apelido : "Quadra" }</h2>

                <h3 className="text-xl/5 font-medium py-5">Esporte: {esporte}</h3>
                <h3 className="text-xl/5 font-medium py-5">Horários: {horarios[0]} até {horarios[horarios.length - 1]}</h3>

                <div className="card-actions justify-center">
                    <button className="btn btn-success text-xl/5" onClick={() => {abrirModal(); setChave();}}>Reservar</button>
                </div>
            </div>
        </div>
    )
}

export default Home
