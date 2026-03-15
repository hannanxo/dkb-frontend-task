import { Card, Input } from 'antd';
import styled from 'styled-components';

export const FilterHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const FilterRow = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;

    @media (min-width: 640px) {
        grid-template-columns: 2fr 1fr;
    }
`;

export const StyledInput = styled(Input)`
    height: 50px;
    border-radius: 16px;
    border-color: rgba(0, 0, 0, 0.08);
    background: #ffffff;
    box-shadow: none;

    .ant-input {
        font-size: 16px;
    }

    .ant-input::placeholder {
        color: #bfbfbf;
    }

    .ant-input-suffix {
        margin-left: 12px;
    }
`;

export const ClearFiltersButton = styled.button`
    border: none;
    background: transparent;
    padding: 0;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8c8c8c;

    &:hover {
        color: #595959;
    }
`;

export const TransactionCard = styled(Card)`
    border-radius: 18px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    background: #ffffff;

    .ant-card-body {
        padding: 20px 24px;
    }

    @media (max-width: 640px) {
        .ant-card-body {
            padding: 18px 18px;
        }
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
    }
`;

export const TransactionDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    flex: 1;
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const TransactionDetailsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

export const TransactionReference = styled.span`
    font-size: 12px;
    color: #8c8c8c;
    word-break: break-all;
`;

export const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 16px;
`;

export const Footer = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
`;

export const AmountWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 140px;

    @media (max-width: 640px) {
        width: 100%;
        justify-content: flex-start;
    }
`;

export const AmountText = styled.span<{ $direction: 'credited' | 'debited' }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ $direction }) =>
        $direction === 'credited' ? '#389e0d' : '#cf1322'};

    @media (max-width: 640px) {
        font-size: 15px;
    }
`;

export const DirectionArrow = styled.span<{
    $direction: 'credited' | 'debited';
}>`
    font-size: 14px;
    line-height: 1;
    color: ${({ $direction }) =>
        $direction === 'credited' ? '#389e0d' : '#cf1322'};
`;

export const CardTypeBadge = styled.span<{ $variant: 'private' | 'business' }>`
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    color: ${({ $variant }) =>
        $variant === 'private' ? '#0958d9' : '#531dab'};
    background: ${({ $variant }) =>
        $variant === 'private' ? '#e6f4ff' : '#f4ecff'};
`;
