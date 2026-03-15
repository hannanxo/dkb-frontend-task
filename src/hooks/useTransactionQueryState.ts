import { useCallback, useEffect, useState } from 'react';
import type { TransactionTypeFilter } from '@/lib/types';

export function useTransactionQueryState() {
    const params = new URLSearchParams(window.location.search);

    const [selectedCardId, setSelectedCardIdState] = useState<string | null>(
        params.get('card')
    );

    const [amountFilter, setAmountFilterState] = useState(
        params.get('amount') ?? ''
    );

    const [currentPage, setCurrentPageState] = useState(() => {
        const page = Number(params.get('page'));
        return Number.isFinite(page) && page > 0 ? page : 1;
    });

    const [transactionType, setTransactionTypeState] =
        useState<TransactionTypeFilter>(() => {
            const type = params.get('type');
            return type === 'credited' || type === 'debited' ? type : 'all';
        });

    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedCardId) params.set('card', selectedCardId);
        if (amountFilter) params.set('amount', amountFilter);
        if (transactionType !== 'all') params.set('type', transactionType);
        if (currentPage > 1) params.set('page', String(currentPage));

        const query = params.toString();
        const nextUrl = query
            ? `${window.location.pathname}?${query}`
            : window.location.pathname;

        window.history.replaceState({}, '', nextUrl);
    }, [selectedCardId, amountFilter, transactionType, currentPage]);

    const setSelectedCardId = useCallback((value: string | null) => {
        setSelectedCardIdState(value);
        setCurrentPageState(1);
    }, []);

    const setAmountFilter = useCallback((value: string) => {
        setAmountFilterState(value);
        setCurrentPageState(1);
    }, []);

    const setTransactionType = useCallback((value: TransactionTypeFilter) => {
        setTransactionTypeState(value);
        setCurrentPageState(1);
    }, []);

    const setCurrentPage = useCallback((value: number) => {
        setCurrentPageState(value);
    }, []);

    const clearFilters = useCallback(() => {
        setAmountFilterState('');
        setTransactionTypeState('all');
        setCurrentPageState(1);
    }, []);

    return {
        selectedCardId,
        amountFilter,
        currentPage,
        transactionType,
        setSelectedCardId,
        setAmountFilter,
        setCurrentPage,
        setTransactionType,
        clearFilters
    };
}
