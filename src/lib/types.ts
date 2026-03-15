export interface Card {
    id: string;
    description: string;
}

export interface Transaction {
    id: string;
    amount: number;
    description: string;
    cardId: string;
}

export type TransactionsByCard = Record<string, Omit<Transaction, 'cardId'>[]>;
export type TransactionTypeFilter = 'all' | 'credited' | 'debited';
