import { Membro } from "../classes/membros"
import { beforeEach, it, expect, describe} from 'vitest'

describe('Testando a classe Membros', ()=> {
    it("Após a criação da classe, deve-se ser retornando o nome que foi passado", ()=>{

        const membro = new Membro("cleber")
        expect(membro.nome).toBe('cleber')
    })
})

