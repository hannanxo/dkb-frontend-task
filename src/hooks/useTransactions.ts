import { useEffect, useState } from 'react';
import { transactionsApi } from '@/lib/api';
import type { Transaction } from '@/lib/types';

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await transactionsApi.getAllTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to load transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTransactions();
    }, []);

    return { transactions, isLoading };
}
