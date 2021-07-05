import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  return (
    <Container>
      <h1>Hello Styled-Components</h1>
      <h2>Hello Styled-Components</h2>
      <p>Hello Styled-Components</p>
      <ul>
        <li>Hello Styled-Components</li>
      </ul>
      <a>Hello Styled-Components</a>
      <span>Hello Styled-Components</span>
    </Container>
  );
};

export default index;