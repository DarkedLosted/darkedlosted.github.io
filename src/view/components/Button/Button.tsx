import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Button.css';

const cnButton = cn('Button');

export interface ButtonProps {
    text: string
}

export class Button extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        const { text } = this.props;

        return(
            <button className={ cnButton({ yes: text === 'Да' }) }>{ text }</button>
        )
    }
}
