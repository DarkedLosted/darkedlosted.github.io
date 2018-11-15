import * as React from 'react';
import { ButtonProps } from "./index";

import './Button.css';

export const Button: React.SFC<ButtonProps> = ({ text, className }) => (
    <button className={ className }>{ text }</button>
);
