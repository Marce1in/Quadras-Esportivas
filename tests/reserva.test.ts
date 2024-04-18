import { Reserva } from '../classes/reserva'
import { beforeEach, it, expect, describe} from 'vitest'

describe('Testando classe reserva', () => {
    it("quando criar reserva for criada esperasse que retorne um novo id gerado automaticamente", () => {
        const reserva = new Reserva('1', '1', ["20:00","22:00"])
        expect(reserva.idMembro).toBe("1")
        expect(reserva.idQuadra).toBe("1")
        expect(reserva.horario).toEqual(["20:00", "22:00"])
    })
})