import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { useCards } from '@/hooks/useCards';
import { useTransactions } from '@/hooks/useTransactions';
import { useDebounce } from '@/hooks/useDebounce';

vi.mock('@/hooks/useCards');
vi.mock('@/hooks/useTransactions');
vi.mock('@/hooks/useDebounce');

const mockUseCards = vi.mocked(useCards);
const mockUseTransactions = vi.mocked(useTransactions);
const mockUseDebounce = vi.mocked(useDebounce);

describe('App', () => {
    beforeEach(() => {
        window.history.replaceState({}, '', '/');

        mockUseDebounce.mockImplementation((value) => value);

        mockUseCards.mockReturnValue({
            cards: [
                { id: 'lkmfkl-mlfkm-dlkfm', description: 'Private Card' },
                { id: 'elek-n3lk-4m3lk4', description: 'Business Card' }
            ],
            isLoading: false
        });

        mockUseTransactions.mockReturnValue({
            transactions: [
                {
                    id: 'transaction-1',
                    cardId: 'lkmfkl-mlfkm-dlkfm',
                    amount: 123.88,
                    description: 'Food'
                },
                {
                    id: 'transaction-2',
                    cardId: 'lkmfkl-mlfkm-dlkfm',
                    amount: 33.48,
                    description: 'Snack'
                },
                {
                    id: 'transaction-3',
                    cardId: 'elek-n3lk-4m3lk4',
                    amount: 533.48,
                    description: 'Smart Phone'
                },
                {
                    id: 'transaction-4',
                    cardId: 'elek-n3lk-4m3lk4',
                    amount: -100,
                    description: 'Refund for Smart Phone'
                }
            ],
            isLoading: false
        });
    });

    it('shows all transactions by default', () => {
        render(<App />);

        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('Snack')).toBeInTheDocument();
        expect(screen.getByText('Smart Phone')).toBeInTheDocument();
        expect(screen.getByText('Refund for Smart Phone')).toBeInTheDocument();
    });

    it('selecting a card filters transactions', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByLabelText('Select Private Card'));

        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('Snack')).toBeInTheDocument();
        expect(screen.queryByText('Smart Phone')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Refund for Smart Phone')
        ).not.toBeInTheDocument();
    });

    it('clicking the selected card again unselects it', async () => {
        const user = userEvent.setup();
        render(<App />);

        const privateCard = screen.getByLabelText('Select Private Card');

        await user.click(privateCard);

        expect(screen.queryByText('Smart Phone')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Refund for Smart Phone')
        ).not.toBeInTheDocument();

        await user.click(privateCard);

        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('Snack')).toBeInTheDocument();
        expect(screen.getByText('Smart Phone')).toBeInTheDocument();
        expect(screen.getByText('Refund for Smart Phone')).toBeInTheDocument();
    });

    it('amount filter works', async () => {
        const user = userEvent.setup();
        render(<App />);

        const amountInput = screen.getByLabelText(
            'Filter transactions by amount'
        );

        await user.type(amountInput, '100');

        await waitFor(() => {
            expect(screen.getByText('Food')).toBeInTheDocument();
            expect(screen.getByText('Smart Phone')).toBeInTheDocument();
            expect(
                screen.getByText('Refund for Smart Phone')
            ).toBeInTheDocument();
            expect(screen.queryByText('Snack')).not.toBeInTheDocument();
        });
    });

    it('type filter works', async () => {
        const user = userEvent.setup();
        render(<App />);

        const typeSelect = screen.getByLabelText('Filter transactions by type');
        await user.click(typeSelect);
        await user.click(screen.getByText('Credited'));

        await waitFor(() => {
            expect(
                screen.getByText('Refund for Smart Phone')
            ).toBeInTheDocument();
            expect(screen.queryByText('Food')).not.toBeInTheDocument();
            expect(screen.queryByText('Snack')).not.toBeInTheDocument();
            expect(screen.queryByText('Smart Phone')).not.toBeInTheDocument();
        });
    });

    it('clear filters works', async () => {
        const user = userEvent.setup();
        render(<App />);

        const amountInput = screen.getByLabelText(
            'Filter transactions by amount'
        );

        await user.type(amountInput, '100');

        const typeSelect = screen.getByLabelText('Filter transactions by type');
        await user.click(typeSelect);
        await user.click(screen.getByText('Credited'));

        await waitFor(() => {
            expect(
                screen.getByText('Refund for Smart Phone')
            ).toBeInTheDocument();
            expect(screen.queryByText('Food')).not.toBeInTheDocument();
        });

        await user.click(screen.getByLabelText('Clear filters'));

        await waitFor(() => {
            expect(screen.getByText('Food')).toBeInTheDocument();
            expect(screen.getByText('Snack')).toBeInTheDocument();
            expect(screen.getByText('Smart Phone')).toBeInTheDocument();
            expect(
                screen.getByText('Refund for Smart Phone')
            ).toBeInTheDocument();
        });
    });
});
