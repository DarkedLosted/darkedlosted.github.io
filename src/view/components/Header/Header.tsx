import * as React from 'react';
import { cn } from '@bem-react/classname';

// import './Header.css';
import logo from '../icons/logo.jpg';
import mobileMenu from '../icons/icon_list_m.jpg';

const cnHeader = cn('Header');

export class Header extends React.Component {
    public render() {
        return (
            <header className={ cnHeader() }>
                <section>
                    <ul className={ cnHeader('TabsMenu') }>
                        <img className={ cnHeader('Logo') } src={ logo } alt='yandex' />
                        <li className={ cnHeader('TabsMenuTab') }>
                            <a className={'Link Link_selected'} href='#'>События</a>
                        </li>
                        <li className={ cnHeader('TabsMenuTab') }>
                            <a className={'Link'} href='#'>Сводка</a>
                        </li>
                        <li className={ cnHeader('TabsMenuTab') }>
                            <a className={'Link'} href='#'>Устройства</a>
                        </li>
                        <li className={ cnHeader('TabsMenuTab') }>
                            <a className={'Link'} href='#'>Сценарии</a>
                        </li>
                        <li className={ cnHeader('TabsMenuTab') }>
                            <a className={'Link'} href='#'>Видеонаблюдение</a>
                        </li>
                        <img className={ cnHeader('MobileMenuIcon') } src={ mobileMenu } alt='three black lines like burger' />
                    </ul>
                </section>
            </header>
        )
    }
}
