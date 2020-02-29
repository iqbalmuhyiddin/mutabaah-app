import styled from "styled-components";

export const Label = styled.label`
  display: ${props => (props.isInline ? "inline-block" : "block")};
  font-size: 14px;
  font-weight: ${props => (props.isInfo ? "normal" : "600")};
`;

export const Text = styled.span`
  display: ${props => (props.isInline ? "inline-block" : "block")};
  font-size: 12px;
`;
