import { render, screen } from '@testing-library/react'
import Home from './page'
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation'

describe('Home', () => {

    jest.mock('next/navigation', () => ({
        ...require('next-router-mock'),
        useSearchParams: () => jest.fn(),
    }));

    it('renders a heading', () => {

        render(<Home />)

        const heading = "<h1>Home</h1>";
        expect(heading).toBeInTheDocument()
    })
})