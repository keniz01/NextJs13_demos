import { render } from '@testing-library/react'
import Home from './page'
import '@testing-library/jest-dom';

describe('Home', () => {
    
    jest.mock('next/navigation', () => {
        return {
          __esModule: true,
          useRouter: () => ({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
          }),
          useSearchParams: () => ({
            get: () => {}
          })
        }
      })

    it('renders a heading', () => {
        render(<Home />)
        const heading = "<h1>Home</h1>";
        expect(heading).toBeInTheDocument()
    })

    it('renders homepage unchanged', () => {
        const { container } = render(<Home />)
        expect(container).toMatchSnapshot()
    })
})