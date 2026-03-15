import React from 'react';
import { Empty, Pagination, Typography } from 'antd';
import type { Card, Transaction } from '@/lib/types';
import { Section } from '@/styles/layout';
import { formatCurrency } from '@/lib/util';
import {
    AmountText,
    CardTypeBadge,
    Footer,
    TransactionDetails,
    List,
    Row,
    TransactionCard,
    DirectionArrow,
    AmountWrapper,
    TransactionDetailsRow,
    TransactionReference
} from './styles';

const { Title, Text } = Typography;

type TransactionListProps = {
    transactions: Transaction[];
    cards: Card[];
    totalTransactions: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

export function TransactionList({
    transactions,
    cards,
    totalTransactions,
    currentPage,
    pageSize,
    onPageChange
}: TransactionListProps) {
    const getVariant = (cardId: string): 'private' | 'business' => {
        const cardIndex = cards.findIndex((card) => card.id === cardId);
        return cardIndex === 0 ? 'private' : 'business';
    };

    return (
        <Section aria-labelledby="transactions-heading">
            <Title level={3} id="transactions-heading">
                Transactions
            </Title>

            {totalTransactions === 0 && (
                <Empty description="No transactions found." />
            )}

            {totalTransactions > 0 && (
                <React.Fragment>
                    <Text type="secondary">
                        Showing {transactions.length} of {totalTransactions}{' '}
                        transactions
                    </Text>

                    <List
                        aria-label="Transaction list"
                        style={{ marginTop: 16 }}
                    >
                        {transactions.map((transaction) => {
                            const direction =
                                transaction.amount < 0 ? 'credited' : 'debited';
                            const variant = getVariant(transaction.cardId);

                            return (
                                <li
                                    key={`${transaction.cardId}-${transaction.id}`}
                                >
                                    <TransactionCard>
                                        <Row>
                                            <TransactionDetails>
                                                <Text strong>
                                                    {transaction.description}
                                                </Text>

                                                <TransactionDetailsRow>
                                                    <TransactionReference>
                                                        {transaction.id}
                                                    </TransactionReference>
                                                    <CardTypeBadge
                                                        $variant={variant}
                                                    >
                                                        {variant === 'private'
                                                            ? 'Private'
                                                            : 'Business'}
                                                    </CardTypeBadge>
                                                </TransactionDetailsRow>
                                            </TransactionDetails>

                                            <AmountWrapper>
                                                <AmountText
                                                    $direction={direction}
                                                >
                                                    <DirectionArrow
                                                        $direction={direction}
                                                    >
                                                        {direction ===
                                                        'credited'
                                                            ? '↑'
                                                            : '↓'}
                                                    </DirectionArrow>
                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </AmountText>
                                            </AmountWrapper>
                                        </Row>
                                    </TransactionCard>
                                </li>
                            );
                        })}
                    </List>

                    {totalTransactions > pageSize && (
                        <Footer>
                            <Pagination
                                aria-label="Transaction pages"
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalTransactions}
                                onChange={onPageChange}
                                showSizeChanger={false}
                            />
                        </Footer>
                    )}
                </React.Fragment>
            )}
        </Section>
    );
}
