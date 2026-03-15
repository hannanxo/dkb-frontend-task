import styled from 'styled-components';

export const Page = styled.main`
    min-height: 100vh;
    background: #f5f5f5;
    padding: 56px 24px;
`;

export const Container = styled.div`
    max-width: 960px;
    margin: 0 auto;
`;

export const Header = styled.header`
    margin-bottom: 40px;
`;

export const Section = styled.section`
    margin-bottom: 40px;
`;

export const CardGrid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;
