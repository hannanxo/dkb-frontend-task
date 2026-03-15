import type { Transaction, TransactionsByCard } from './types';

export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);

export function flattenTransactions(
    transactionMap: TransactionsByCard
): Transaction[] {
    return Object.entries(transactionMap).flatMap(([cardId, transactions]) =>
        transactions.map((transaction) => ({
            ...transaction,
            cardId
        }))
    );
}
