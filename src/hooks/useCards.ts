import { useEffect, useState } from 'react';
import { cardsApi } from '@/lib/api';
import type { Card } from '@/lib/types';

export function useCards() {
    const [cards, setCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const data = await cardsApi.getCards();
                setCards(data);
            } catch (error) {
                console.error('Failed to load cards:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCards();
    }, []);

    return { cards, isLoading };
}
