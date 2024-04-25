import  Atlas  from '../../classes/atlas.ts'

import { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Admin({atlas}: {atlas: Atlas}){

    const navegar = useNavigate()

    //Usuários inválidos voltam para a página de login (vai hackear a vó)
    useEffect(()=>{
        if(atlas.contas.sessao == "" || !atlas.db.membros[atlas.contas.sessao].admin){
            navegar('/login')
        }
    })

    const [gerados, setGerados] = useState<string>("3")

    //Por algum motivo se eu atualizar esse estado ele atualiza todos os outros?
    //bom pra mim
    const [update, setUpdate] = useState<boolean>(false)

    const [listaQuadras] = useState(atlas.db.quadras)
    const [listaMembros] = useState(atlas.db.membros)
    const [listaReservas] = useState(atlas.db.reservas)

    const {register, handleSubmit, reset} = useForm()

    function criarQuadra(data: any, reset: () => void) {
        const esporte: string = data.esporte
        const nome: string = data.nome

        //retorna o horário em segundos, não sei como funciona, copiei do stack overflow
        const h1:number = +(data.h1.split(':').reduce((acc: number, time: string) => (60 * acc) + +time));
        const h2:number = +(data.h2.split(':').reduce((acc: number, time: string) => (60 * acc) + +time));

        //Sim, isso é horário inicial e horário final
        let hi: string;
        let hf: string;

        //Torna indenpendente a ordem dos horários, o menor sempre será o inicial
        //e o maior sempre o final
        if (h1 > h2){
            hi = data.h2
            hf = data.h1
        }
        else if (h2 > h1){
            hi = data.h1
            hf = data.h2
        }
        else {
            alert("Valores iguais não são permitidos!")
            return
        }


        atlas.db.criarQuadra(esporte, [hi, hf], nome)

        reset()
    }

    return (
        <main className="flex flex-col gap-10 w-full items-center">
            <div className='flex flex-col w-full'>
                <Link to="/" className="btn">Ir para Home</Link>
                <Link to="/login" className="btn">Ir para Login</Link>
                <Link to="/registro" className="btn">Ir para Registro</Link>
            </div>

            <input 
                type="range" 
                min="1" 
                max="10" 
                value={gerados} 
                className="range w-[95vw]"
                onChange={(e) => {setGerados(e.target.value)}}
            />
            <section className='flex flex-row flex-wrap items-center justify-center gap-5 w-full'>
                <button 
                    className='btn btn-success w-min'
                    onClick={() => {atlas.gerar.quadras(Number(gerados)); setUpdate(!update)}}
                >
                    Gerar {gerados} Quadras
                </button>
                <button 
                    className='btn btn-primary w-min'
                    onClick={() => {atlas.gerar.membros(Number(gerados)); setUpdate(!update)}}
                >
                    Gerar {gerados} Membros
                </button>
                <button 
                    className='btn btn-error w-min'
                    onClick={() => {atlas.gerar.reservas(Number(gerados)); setUpdate(!update)}}
                >
                    Gerar {gerados} Reservas
                </button>
            </section>



            <section>
                <span className="card-title justify-center py-5">Criar Quadra</span>
                <form 
                    className='flex flex-col justify-center gap-4 items-center'
                    onSubmit={handleSubmit((data) => criarQuadra(data, reset))}
                >
                    <input 
                        type="text" 
                        className="input input-bordered w-full max-w-xs" 
                        required 
                        placeholder='nome'
                        {...register("nome")}
                    /> 
                    <select 
                        className="select select-bordered w-full max-w-xs" 
                        required
                        {...register("esporte")}
                    >
                        <option disabled selected>Esporte</option>
                        <option>Vôlei</option>
                        <option>Futebol</option>
                        <option>Basquete</option>
                        <option>Padel</option>
                        <option>Handbol</option>
                        <option>Tênis</option>
                        <option>Xadres?</option>
                    </select>
                    <div>
                        <input 
                            type="time" 
                            className="input input-bordered w-fit" 
                            step={1800} 
                            required
                            {...register("h1")}
                        /> &nbsp;&nbsp;&nbsp;
                        <input 
                            type="time" 
                            className="input input-bordered w-fit" 
                            step={1800} 
                            required
                            {...register("h2")}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className='btn btn-success'
                    >
                        Criar Quadra
                    </button>

                </form> 
            </section>

            <section>
                <h2 className="text-center text-2xl text-success font-bold py-5">Lista de Quadras</h2>
                <ul className='flex gap-20 flex-wrap justify-center'>
                    {listaQuadras && Object.keys(listaQuadras).map((id)=>
                        <li 
                            className="flex flex-col gap-1 border shadow-xl rounded-box border-success py-8 px-[5vw]" 
                            key={id}
                        >
                            <h2 className='card-title'>ID</h2>
                            <span className='text-xs'>{id}</span>
                            <h2 className='card-title'>Nome</h2>
                            <span>{listaQuadras[id].apelido}</span>
                            <h2 className='card-title'>Esporte</h2>
                            <span>{listaQuadras[id].esporte}</span>
                        </li>
                    )}
                </ul>
            </section>
            <section>
                <h2 className="text-center text-2xl text-primary font-bold py-5">Lista de Membros</h2>
                <ul className="flex gap-20 flex-wrap justify-center">
                    {listaMembros && Object.keys(listaMembros).map((id)=>
                        <li 
                            className="flex flex-col gap-1 border shadow-xl rounded-box border-primary py-8 px-[5vw]"
                            key={id}
                        >
                            <h2 className='card-title'>ID</h2>
                            <span className='text-xs'>{id}</span>
                            <h2 className='card-title'>Nome</h2>
                            <span>{listaMembros[id].nome}</span>
                            <h2 className='card-title'>Senha</h2>
                            <span>{listaMembros[id].senha}</span>
                            <h2 className='card-title'>Administrador</h2>
                            <span>{listaMembros[id].admin ? "Sim" : "Não"}</span>

                        </li>
                    )}
                </ul>
            </section>
            <section>
                <h2 className="text-center text-2xl text-error font-bold py-5">Lista de Reservas</h2>
                <ul className="flex gap-20 flex-wrap justify-center">
                    {listaReservas && Object.keys(listaReservas).map((id)=>
                        <li 
                            className="flex flex-col gap-1 border shadow-xl rounded-box border-error py-8 px-[5vw]"
                            key={id}
                        >
                            <h2 className='card-title'>ID</h2>
                            <span className='text-xs'>{id}</span>
                            <h2 className='card-title'>Horário</h2>
                            <span>{listaReservas[id].horario[0]} | {listaReservas[id].horario[1]}</span>
                            <h2 className='card-title'>Data</h2>
                            <span>{listaReservas[id].data}</span>
                            <h2 className='card-title'>Nome do Membro</h2>
                            <span>{listaMembros[listaReservas[id].idMembro].nome}</span>
                            <h2 className='card-title'>Nome da Quadra</h2>
                            <span>{listaQuadras[listaReservas[id].idQuadra].apelido}</span>
                        </li>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Admin
