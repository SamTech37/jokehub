import React from "react";
import styled from "styled-components";

const SendButton = styled.button`
  background-color: orange;
  color: white;
  width: 200px;
  height: 100px;
`;
export default function PostingPage() {
  return (
    <div>
      <SendButton onClick={() => console.log("clicked send")}>Send</SendButton>
    </div>
  );
}
