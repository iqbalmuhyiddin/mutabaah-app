import React from "react";
import { LogoWrapper } from "./style";

const Logo = ({ height, ...props }) => (
  <LogoWrapper {...props}>Mutabaah App</LogoWrapper>
);

export default Logo;
