import  Atlas  from '../../classes/atlas.ts'
import  { useForm }  from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Login({atlas}: {atlas: Atlas}){
    
    const navegador = useNavigate()

    const {register, handleSubmit} = useForm()

    function logar(data: any){
        const id: string = atlas.db.criarMembro(data.nome) 
        
        atlas.contas.sessao = id

        navegador("//")
    }

    return (
        <>
            <main className='flex h-screen justify-center items-center'>
                <form className='flex flex-col w-96 h-96 justify-center items-center gap-4 bg-base-200 rounded-box' 
                    onSubmit={handleSubmit(logar)}
                >
                    <input 
                        type="text" 
                        className="input input-bordered w-full max-w-xs" 
                        placeholder='nome' 
                        required {...register("nome")}
                    />
                    <button type="submit" className="btn btn-primary">Logar</button>
                </form> 
            </main>
        </>
    )
}

export default Login
