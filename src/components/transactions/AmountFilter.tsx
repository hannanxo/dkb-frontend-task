import { Select, Tooltip, Typography } from 'antd';
import { Section } from '@/styles/layout';
import {
    ClearFiltersButton,
    FilterHeader,
    FilterRow,
    StyledInput
} from './styles';
import type { TransactionTypeFilter } from '@/lib/types';
import { CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

type AmountFilterProps = {
    value: string;
    onChange: (value: string) => void;
    transactionType: TransactionTypeFilter;
    onTransactionTypeChange: (value: TransactionTypeFilter) => void;
    onClearAll: () => void;
};

export function AmountFilter({
    value,
    onChange,
    transactionType,
    onTransactionTypeChange,
    onClearAll
}: AmountFilterProps) {
    const hasActiveFilters = value !== '' || transactionType !== 'all';

    return (
        <Section aria-labelledby="filters-heading">
            <FilterHeader>
                <Title level={3} id="filters-heading">
                    Filters
                </Title>

                {hasActiveFilters && (
                    <Tooltip title="Clear filters">
                        <ClearFiltersButton
                            type="button"
                            onClick={onClearAll}
                            aria-label="Clear filters"
                        >
                            <CloseCircleOutlined style={{ fontSize: 18 }} />
                        </ClearFiltersButton>
                    </Tooltip>
                )}
            </FilterHeader>

            <FilterRow>
                <StyledInput
                    aria-label="Filter transactions by amount"
                    placeholder="Amount greater than (€)"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputMode="decimal"
                    suffix={
                        <Tooltip title="Filters transactions with an amount greater than or equal to the entered value">
                            <InfoCircleOutlined
                                style={{ color: '#8c8c8c', cursor: 'pointer' }}
                            />
                        </Tooltip>
                    }
                />
                <Select
                    size="large"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        fontSize: 14
                    }}
                    aria-label="Filter transactions by type"
                    value={transactionType}
                    onChange={(value) =>
                        onTransactionTypeChange(value as TransactionTypeFilter)
                    }
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'credited', label: 'Credited' },
                        { value: 'debited', label: 'Debited' }
                    ]}
                />
            </FilterRow>
        </Section>
    );
}
