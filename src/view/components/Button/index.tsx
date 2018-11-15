import { compose, IClassNameProps } from "@bem-react/core";
import { Button as Base } from './Button';
import { ButtonTypeAccept } from './_type/Button_type_accept';

export interface ButtonProps extends IClassNameProps {
    text: string;

    type?: string;
}

export const Button = compose(
    ButtonTypeAccept
)(Base);
