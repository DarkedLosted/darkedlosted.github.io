import * as React from 'react';
import { cn } from '@bem-react/classname';

import logo from '../../../icons/logo.jpg';
import mobileMenu from '../../../icons/icon_list_m.jpg';

const cnHeader = cn('Header');
const cnLink = cn('Link');

export class Header extends React.Component {
    public render() {
        return (
            <header className={ cnHeader() }>
                <section>
                    <ul className={ cnHeader('TabsMenu') }>
                        <img className={ cnHeader('Logo') } src={ logo } alt='yandex' />
                        <li className={ cnHeader('Tab') }>
                            <a className={ cnLink({ selected: true }) } href='#'>События</a>
                        </li>
                        <li className={ cnHeader('Tab') }>
                            <a className={ cnLink() } href='#'>Сводка</a>
                        </li>
                        <li className={ cnHeader('Tab') }>
                            <a className={ cnLink() } href='#'>Устройства</a>
                        </li>
                        <li className={ cnHeader('Tab') }>
                            <a className={ cnLink() } href='#'>Сценарии</a>
                        </li>
                        <li className={ cnHeader('Tab') }>
                            <a className={ cnLink() } href='#'>Видеонаблюдение</a>
                        </li>
                        <img
                            className={ cnHeader('MobileMenuIcon') }
                            src={ mobileMenu } alt='three black lines like burger'
                        />
                    </ul>
                </section>
            </header>
        )
    }
}
