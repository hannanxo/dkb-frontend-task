import cardsData from '@/data/cards.json';
import transactions from '@/data/transactions.json';
import type { Card, Transaction, TransactionsByCard } from './types';
import { flattenTransactions } from './util';

const cards = cardsData as Card[];
const transactionMap = transactions as TransactionsByCard;
const allTransactions = flattenTransactions(transactionMap);

export const cardsApi = {
    async getCards(): Promise<Card[]> {
        return cards;
    }
};

export const transactionsApi = {
    async getAllTransactions(): Promise<Transaction[]> {
        return allTransactions;
    },
    // Currently unused because the UI loads all transactions
    // and filters client-side, but kept for future API usage.
    async getTransactionsByCard(cardId: string): Promise<Transaction[]> {
        return allTransactions.filter((t) => t.cardId === cardId);
    }
};
