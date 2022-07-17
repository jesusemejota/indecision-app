import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe( 'Counter Component', () => {

    let wrapper ;

    beforeEach(() => {
        wrapper = shallowMount( Counter )
    })

    /*test( 'Debe de hacer match con el snapshot', () => {

        const wrapper = shallowMount( Counter )

        expect( wrapper.html() ).toMatchSnapshot()

    })*/

    test( 'h2 debe de tener el valor por defecto', () => {

        expect( wrapper.find('h2').exists() ).toBe(true)

        const h2 = wrapper.find('h2').text()
        expect( h2 ).toBe('Counter')

    })

    test( 'el valor por defecto debe de ser 100 en el p', () => {

        // Buscar todos los p
        const value = wrapper.find('[data-testid="counter"').text()

        // expect segundo p === 100
        expect( value ).toBe('100')

    })

    test( 'debe de incrementar y decrementar el contador', async() => {

        const [ increaseBtn, decreaseBtn ]  = wrapper.findAll('button')

        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        
        const value = wrapper.find('[data-testid="counter"').text()
        
        expect( value ).toBe('101')

    })

    test( 'debe de establecer el valor por defecto', () => {

        const { start } = wrapper.props()

        const value = wrapper.find('[data-testid="counter"').text()

        expect( Number(value) ).toBe( start )
    })

    test( 'debe de mostrar la prop title', () => {

        const title = 'Hola Mundo'

        const wrapper = shallowMount( Counter, {
            props: {
                title,
            }
        })

        expect( wrapper.find('h2').text() ).toBe(title)

    })

})