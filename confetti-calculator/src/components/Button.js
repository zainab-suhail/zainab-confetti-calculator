import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: #555;
  border: none;
  color: #fff;
  flex: 1 0 21%;
  margin: 5px;
  padding: 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &.operator {
    background-color: #f39c12;
  }

  &.zero {
    flex: 2 0 46%;
  }

  &:active {
    background-color: #777;
  }
`;

const Button = ({ className, label, onClick }) => {
  return (
    <ButtonWrapper className={`button ${className}`} onClick={onClick}>
      {label}
    </ButtonWrapper>
  );
};

export default Button;
