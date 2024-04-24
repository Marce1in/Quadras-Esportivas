import { Quadra } from '../classes/quadra'
import { beforeEach, it, expect, describe, afterEach} from 'vitest'

describe('Testando classe quadra', () => {
    let quadra;

    beforeEach(() => {
        quadra = new Quadra('Futebol', ['08:00', '10:00'], 'Campo 1');
    });


    it('Deve criar instancia de quadra corretamente', () => {
        expect(quadra.esporte).toBe('Futebol');
        expect(quadra.apelido).toBe('Campo 1');
        expect(quadra.horarios).toEqual(quadra.criarHorarios(['08:00', '10:00']));
        expect(quadra.horariosReservados).toEqual({});
        expect
    });

    it('Deve reservar horario corretamente', () => {
        quadra.reservar(['08:00', '09:00'], '2021-10-10');
        expect(quadra.horariosReservados['2021-10-10']).toEqual(quadra.criarHorarios(['08:00', '09:00']));
    });

    it('Deve deletar reserva corretamente', () => {
        quadra.reservar(['08:00', '09:00'], '2021-10-10');
        quadra.deletarReserva(['08:00', '09:00'], '2021-10-10');
        expect(quadra.horariosReservados['2021-10-10']).toEqual(expect.arrayContaining([]));
    });

    it('Deve criar intervalo corretamente', () => {
        quadra.criarIntervalo(['08:00', '09:00']);
        expect(quadra.horarios).toEqual([540, 570, 600]);
    });

    it('Deve recriar horarios corretamente', () => {
        quadra.recriarHorarios(['08:00', '09:00']);
        expect(quadra.horarios).toEqual(quadra.criarHorarios(['08:00', '09:00']));
    });
    
    it('Deve resetar horarios reservados corretamente', () => {
        quadra.reservar(['08:00', '09:00'], '2021-10-10');
        quadra.resetarHorariosReservados('2021-10-10');
        expect(quadra.horariosReservados['2021-10-10']).toEqual([]);
    });

    //aqui é pra ficar as funções de obter horarios




    //--------------------obter Horários--------------------x

    it('deve deletar horarios corretamente', () => {
        quadra.deletarHorarios(['08:00', '09:00'], [8, 9]);
        expect(quadra.horarios).toEqual([480, 510, 540, 570, 600]);
    });

    it('deve criar horarios corretamente', () => {
        expect(quadra.criarHorarios(['08:00', '09:00'])).toEqual([480, 510, 540]);
    });

    it('deve pegar horas corretamente', () => {
        expect(quadra.pegarHoras(["08:00"])).toEqual([8]);
    });

    it('deve validar horas corretemente', () => {
        expect(quadra.validarHoras(["1230"])).toThrowError("Horário inválido, tamanho inválido");
    });
    
    it('deve formatar horarios corretamente', () => {
        expect(quadra.formatarHorarios([480, 510, 540])).toEqual(["08:00", "08:30", "09:00"]);
    });

    it('deve filtrar horarios corretamente', () => {
        quadra.reservar(['08:00', '09:00'], '2021-10-10');
        expect(quadra.filtrarHorarios([480, 510, 540], [480, 510])).toEqual([510, 540]);
    });

    it('deve adicionar zeros corretamente', () => {
        expect(quadra.adicionarZero(8)).toBe("08");
    });
})