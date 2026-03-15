import { Typography } from 'antd';
import type { Card as CardType } from '@/lib/types';
import { CardGrid, Section } from '@/styles/layout';
import {
    CardContentWrapper,
    CardIdLabel,
    CardIdValue,
    CardLabel,
    CardTop,
    SelectableCard
} from './styles';

const { Title, Text } = Typography;

type CardListProps = {
    cards: CardType[];
    selectedCardId: string | null;
    onSelectCard: (cardId: string) => void;
};

export function CardList({
    cards,
    selectedCardId,
    onSelectCard
}: CardListProps) {
    return (
        <Section aria-labelledby="cards-heading">
            <Title level={3} id="cards-heading">
                Cards
            </Title>

            <CardGrid>
                {cards.map((card, index) => {
                    const isSelected = selectedCardId === card.id;
                    const variant = index === 0 ? 'private' : 'business';

                    return (
                        <SelectableCard
                            key={card.id}
                            $selected={isSelected}
                            $variant={variant}
                            onClick={() => onSelectCard(card.id)}
                            role="button"
                            aria-pressed={isSelected}
                            aria-label={`Select ${card.description}`}
                        >
                            <CardContentWrapper>
                                <CardTop>
                                    <Text strong style={{ fontSize: 18 }}>
                                        {card.description}
                                    </Text>

                                    <CardLabel $variant={variant}>
                                        {variant === 'private'
                                            ? 'Private'
                                            : 'Business'}
                                    </CardLabel>
                                </CardTop>

                                <div>
                                    <CardIdLabel>Card ID</CardIdLabel>
                                    <CardIdValue>{card.id}</CardIdValue>
                                </div>
                            </CardContentWrapper>
                        </SelectableCard>
                    );
                })}
            </CardGrid>
        </Section>
    );
}
