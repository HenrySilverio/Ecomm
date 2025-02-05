import { IconGroup, Input, Text } from "mondrian-react";
import styled from "styled-components";

interface CreditCardProps {
  numero: string;
  nome: string;
  vencimento: string;
  isFlipped: boolean;
}

export const InputGroup = styled.div`
  margin-bottom: 16px;
`;

export const InputsMYCvv = styled.div`
  display: flex;
  gap: 16px;
  
  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const CreditCardContainer = styled.div`
  flex: 1;
`;

export const BrandsContainer = styled.div`
padding-top: 16px;
`;

export const CreditCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<CreditCardProps>`
  width: 75vw;
  max-width: 341px;
  height: 50vw;
  max-height: 212px;
  border-radius: var(--border-radius-sm, 12px);
  background-image: url('data:image/svg+xml;utf8,<svg width="342" height="212" viewBox="0 0 342 212" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_7798_8893)"><path d="M0 12C0 5.37259 5.37258 0 12 0H330C336.627 0 342 5.37258 342 12V200C342 206.627 336.627 212 330 212H12C5.37258 212 0 206.627 0 200V12Z" fill="%237D0A23"/><ellipse opacity="0.08" cx="293" cy="46.5" rx="80" ry="78.5" fill="black"/><ellipse opacity="0.08" cx="43.5" cy="177.634" rx="99.5" ry="97.6344" fill="black"/></g><defs><clipPath id="clip0_7798_8893"><path d="M0 12C0 5.37259 5.37258 0 12 0H330C336.627 0 342 5.37258 342 12V200C342 206.627 336.627 212 330 212H12C5.37258 212 0 206.627 0 200V12Z" fill="white"/></clipPath></defs></svg>');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  font-family: 'IBM Plex Mono';
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};

  .chip-image {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    height: auto;
  }

  .card-number, .card-name-date, .card-cvv {
    backface-visibility: hidden;
  }

  .card-name-date, .card-cvv {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .card-name-date {
    margin: 24px 0 6px;
  }

  .card-cvv {
    transform: rotateY(180deg);
    align-items: flex-end;
    padding-bottom: 30px;
  }
`;

export const TextInformation = styled(Text)`
  color: var(--color-neutral-dark, #525252);
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;

    & > * {
      flex: 1;
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -4px;
  margin-top: 12px;
  color: var(--color-support-danger-dark, #B84D01);
`;

export const ErrorMessage = styled.span`
  margin-left: 4px;
  color: var(--color-support-danger-dark, #B84D01);
  font-size: 12px;
  font-weight: 500;
`;

export const ErrorIcon = styled(IconGroup)`
  color: var(--color-support-danger-dark, #B84D01);
`;

export const ErrorInput = styled(Input)`
  border-color: ${props => props.hasError ? 'var(--color-support-danger-dark, #B84D01)' : 'initial'};
`;

export const ErrorInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
