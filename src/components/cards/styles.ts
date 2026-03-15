import { Card } from 'antd';
import styled from 'styled-components';

export const SelectableCard = styled(Card)<{
    $selected: boolean;
    $variant: 'private' | 'business';
}>`
    cursor: pointer;
    border-radius: 22px;
    min-height: 140px;
    transition: all 0.2s ease;

    border: 1px solid
        ${({ $selected, $variant }) => {
            if (!$selected) return 'rgba(0,0,0,0.08)';
            return $variant === 'private' ? '#1677ff' : '#722ed1';
        }};

    background: ${({ $selected, $variant }) => {
        if (!$selected) return '#ffffff';

        return $variant === 'private' ? '#eaf4ff' : '#f4ecff';
    }};

    box-shadow: ${({ $selected, $variant }) => {
        if (!$selected) return 'none';

        return $variant === 'private'
            ? '0 8px 24px rgba(22,119,255,0.08)'
            : '0 8px 24px rgba(114,46,209,0.08)';
    }};

    &:hover {
        border-color: ${({ $variant }) =>
            $variant === 'private' ? '#1677ff' : '#722ed1'};
        transform: translateY(-2px);
    }

    .ant-card-body {
        padding: 22px 24px;
        height: 100%;
    }
`;

export const CardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const CardTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const CardLabel = styled.span<{ $variant: 'private' | 'business' }>`
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ $variant }) =>
        $variant === 'private' ? '#0958d9' : '#531dab'};
    background: ${({ $variant }) =>
        $variant === 'private' ? '#d6eaff' : '#efe1ff'};
`;

export const CardIdLabel = styled.span`
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    color: #8c8c8c;
`;

export const CardIdValue = styled.span`
    display: block;
    font-size: 15px;
    color: #595959;
    letter-spacing: 0.2px;
`;
