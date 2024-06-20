import React from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  background-color: #222;
  color: #fff;
  font-size: 2em;
  text-align: right;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Display = ({ value }) => {
  return (
    <DisplayWrapper className="display">
      {value}
    </DisplayWrapper>
  );
};

export default Display;
