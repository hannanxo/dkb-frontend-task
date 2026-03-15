import { act, renderHook } from '@testing-library/react';
import { useTransactionQueryState } from '@/hooks/useTransactionQueryState';

describe('useTransactionQueryState', () => {
    beforeEach(() => {
        window.history.replaceState({}, '', '/');
    });

    it('reads initial URL params', () => {
        window.history.replaceState(
            {},
            '',
            '/?card=elek-n3lk-4m3lk4&amount=50&type=debited&page=2'
        );

        const { result } = renderHook(() => useTransactionQueryState());

        expect(result.current.selectedCardId).toBe('elek-n3lk-4m3lk4');
        expect(result.current.amountFilter).toBe('50');
        expect(result.current.transactionType).toBe('debited');
        expect(result.current.currentPage).toBe(2);
    });

    it('updates URL when state changes', () => {
        const { result } = renderHook(() => useTransactionQueryState());

        act(() => {
            result.current.setSelectedCardId('lkmfkl-mlfkm-dlkfm');
            result.current.setAmountFilter('100');
            result.current.setTransactionType('credited');
            result.current.setCurrentPage(3);
        });

        const params = new URLSearchParams(window.location.search);

        expect(params.get('card')).toBe('lkmfkl-mlfkm-dlkfm');
        expect(params.get('amount')).toBe('100');
        expect(params.get('type')).toBe('credited');
        expect(params.get('page')).toBe('3');
    });
});
