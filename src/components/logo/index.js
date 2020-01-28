import React from "react";
import { LogoWrapper } from "./style";

const Logo = ({ height, ...props }) => (
  <LogoWrapper
    src="https://www.efishery.com/img/logo%20eFishery%20Mono%20Chrome.png"
    height={height}
    {...props}
  />
);

export default Logo;
