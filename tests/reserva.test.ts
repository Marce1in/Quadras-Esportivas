import { Reserva } from '../classes/reserva'
import { beforeEach, it, expect, describe} from 'vitest'

describe('Testando classe reserva', () => {
    it("Quando Reseva for criada deve-se mostrar horário e data de reserva", () => {
        const reserva = new Reserva(["10:00", "11:00"], "2021-10-10")
        expect(reserva.horario).toEqual(["10:00", "11:00"])
        expect(reserva.data).toBe("2021-10-10")
    })
})