import { withBemMod } from '@bem-react/core';
import { ButtonProps } from '../index';

import './Button_type_accept.css';

export const ButtonTypeAccept = withBemMod<ButtonProps>('Button', { type: 'accept' });
