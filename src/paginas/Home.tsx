import { Atlas } from '../../classes/atlas.ts'
import { ReactNode, useState } from 'react'

function Home({atlas}: {atlas: Atlas}){

    const [modal, setModal] = useState(false)

    const quadras = Object.keys(atlas.db.quadras).map((id)=>{
        
        return atlas.db.quadras[id] 
    })


    return (
        <>
            <button className="btn btn-primary" onClick={() => setModal(true)}>BOTÃO DE TESTE</button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4vw] justify-items-center p-[5vw]'>
                {quadras.map((item)=>{
                    return (
                        <Card 
                            apelido={item.apelido} 
                            esporte={item.esporte} 
                            horarios={item.obterHorarios() as string[]}
                        />
                    )
                })}
            </div>

            <Modal openModal={modal} closeModal={() => setModal(false)}> 
                <div>Olá mundo CARALHO</div>
            </Modal>
        </>
    )
}

import { useEffect, useRef } from "react"

function Modal({openModal, closeModal, children}: {openModal: boolean, closeModal: () => void, children: ReactNode}){
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal()
        }
        else {
            ref.current?.close()
        }

    }, [openModal])

    return (
        <>
            <dialog className="modal" ref={ref} onCancel={closeModal}>
                <div className="modal-box">
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {children}
                </div>
            </dialog>
        </>
    )
}
function Card({apelido, esporte, horarios}:{apelido: string | undefined, esporte: string, horarios: string[]}){
    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">

                    <h2 className="card-title justify-center">{apelido ? apelido : "Quadra" }</h2>

                    <h3 className="text-xl/5 font-medium py-5">Esporte: {esporte}</h3>
                    <h3 className="text-xl/5 font-medium py-5">Horários: {horarios[0]} até {horarios[horarios.length - 1]}</h3>

                    <div className="card-actions justify-center">
                            <button className="btn btn-success text-xl/5">Reservar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
