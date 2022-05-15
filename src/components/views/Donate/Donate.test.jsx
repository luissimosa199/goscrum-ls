import { render, screen } from "@testing-library/react";
import Donate from "./Donate";

describe('renderización en Donate', () => {

    it('Renderiza un h1', () => {
        render(<Donate/>)
    
        expect(screen.getByRole('heading', { level: 1, name: 'Colaborá con el proyecto' })).toBeInTheDocument()
    })
    
    it('Renderiza un a con href', () => {
        render(<Donate/>)
    
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://mpago.la/2rrzY8B')
    })

    it('Renderiza un a con target blank', () => {
        render(<Donate/>)
    
        expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    })

})