/*
1. debe de hacer match con el snapshot
    Inicializar el wrapper en el beforeEach
    Solo una linea de codigo
*/
import { shallowMount, mount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe( 'Indecision Component', () => {

    let wrapper
    let clgSpy

    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))


    beforeEach(() => {
        wrapper = shallowMount( Indecision )

        clgSpy = jest.spyOn( console, 'log' )

        jest.clearAllMocks()

    })

    test( 'debe de hacer match con el snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot()

    })

    test( 'escribir en el input no debe de dispara nada (console.log)', async() => {

        const getAnwerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo')

        expect( clgSpy ).toHaveBeenCalled()
        expect( getAnwerSpy ).toHaveBeenCalledTimes(0)

    })

    test( 'escribir el simbolo de "?" debe de dispara el getAnswer', async() => {

        const getAnwerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')

        expect( clgSpy ).toHaveBeenCalled()
        expect( getAnwerSpy ).toHaveBeenCalled()

    })

    test( 'pruebas en getAnwer', async() => {

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect( img.exists() ).toBeTruthy()
        expect( wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect( wrapper.vm.answer ).toBe('yes')

    })

    test( 'pruebas en getAnwer - Fallo en el API', async() => {

        fetch.mockImplementationOnce( () => Promise.reject('API is down'))

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect( img.exists() ).toBeFalsy()
        expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')

    })

})


