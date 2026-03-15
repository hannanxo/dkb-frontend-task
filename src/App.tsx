import React from 'react';
import { useMemo } from 'react';
import { useCards } from '@/hooks/useCards';
import { useTransactions } from '@/hooks/useTransactions';
import { CardList } from '@/components/cards/CardList';
import { TransactionList } from '@/components/transactions/TransationList';
import { AmountFilter } from '@/components/transactions/AmountFilter';
import { useDebounce } from '@/hooks/useDebounce';
import { Container, Header, Page } from '@/styles/layout';
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTransactionQueryState } from '@/hooks/useTransactionQueryState';

const { Title, Text } = Typography;
const PAGE_SIZE = 5;

function App() {
    const { cards, isLoading: cardsLoading } = useCards();
    const {
        selectedCardId,
        amountFilter,
        currentPage,
        transactionType,
        setSelectedCardId,
        setAmountFilter,
        setCurrentPage,
        setTransactionType,
        clearFilters
    } = useTransactionQueryState();

    const debouncedAmountFilter = useDebounce(amountFilter, 300);

    const { transactions, isLoading: transactionsLoading } = useTransactions();

    const filteredTransactions = useMemo(() => {
        let result = transactions;

        if (selectedCardId) {
            result = result.filter(
                (transaction) => transaction.cardId === selectedCardId
            );
        }

        if (debouncedAmountFilter !== '' && debouncedAmountFilter !== '-') {
            const minAmount = Number(debouncedAmountFilter);

            if (!Number.isNaN(minAmount)) {
                result = result.filter(
                    (transaction) => Math.abs(transaction.amount) >= minAmount
                );
            }
        }

        if (transactionType === 'debited') {
            result = result.filter((transaction) => transaction.amount > 0);
        }

        if (transactionType === 'credited') {
            result = result.filter((transaction) => transaction.amount < 0);
        }

        return result;
    }, [transactions, selectedCardId, debouncedAmountFilter, transactionType]);

    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        return filteredTransactions.slice(startIndex, endIndex);
    }, [filteredTransactions, currentPage]);

    const handleSelectCard = (cardId: string) => {
        const nextCardId = selectedCardId === cardId ? null : cardId;
        setSelectedCardId(nextCardId);
        clearFilters();
    };

    const isLoading = cardsLoading || transactionsLoading;

    return (
        <Page>
            <Container>
                <Header>
                    <Title>Cards & Transactions</Title>
                    <Text type="secondary">
                        Select a card and filter transactions using amount.
                    </Text>
                </Header>

                {isLoading ? (
                    <LoadingOutlined />
                ) : (
                    <React.Fragment>
                        <CardList
                            cards={cards}
                            selectedCardId={selectedCardId}
                            onSelectCard={handleSelectCard}
                        />

                        <AmountFilter
                            value={amountFilter}
                            onChange={setAmountFilter}
                            transactionType={transactionType}
                            onTransactionTypeChange={setTransactionType}
                            onClearAll={clearFilters}
                        />

                        <TransactionList
                            transactions={paginatedTransactions}
                            cards={cards}
                            totalTransactions={filteredTransactions.length}
                            currentPage={currentPage}
                            pageSize={PAGE_SIZE}
                            onPageChange={setCurrentPage}
                        />
                    </React.Fragment>
                )}
            </Container>
        </Page>
    );
}

export default App;
