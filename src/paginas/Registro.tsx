import  Atlas  from '../../classes/atlas.ts'
import  { useForm }  from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

function Registro({atlas}: {atlas: Atlas}){
    
    const navegador = useNavigate()

    const {register, handleSubmit, reset} = useForm()

    function registrar(data: any, reset: any){
        if (data.senha != data.confsenha){
            alert("Senhas diferentes!")
            return
        }

        const status = atlas.contas.registrar(data.nome, data.senha)
        
        if(status) {
            navegador("/login")
        }
        else reset()
    }

    return (
        <>
            <main className='flex h-screen justify-center items-center'>
                <form className='flex flex-col w-96 h-[26rem] justify-center items-center gap-4 bg-base-200 rounded-box py-5' 
                    onSubmit={handleSubmit((data) => registrar(data, reset))}
                >
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" className="grow" placeholder="Nome do Membro" required {...register("nome")} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Senha" required {...register("senha")}/>
                    </label>         
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Confirmar Senha" required {...register("confsenha")}/>
                    </label>         
                    <button type="submit" className="btn btn-primary w-32">Registrar</button>

                    <span className='text-base-content pt-5'>já tem uma conta?</span>
                    <Link to="/login" className='btn w-32'>Faça login</Link>
                </form> 
            </main>
        </>
    )
}

export default Registro
