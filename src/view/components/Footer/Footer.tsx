import * as React from 'react';
import { cn } from '@bem-react/classname';

const cnFooter = cn('Footer');
const cnLink = cn('Link');

export class Footer extends React.Component {
    public render() {
        return (
            <section>
                <ul className={ cnFooter() }>
                    <li className={ cnFooter('Tab')}>
                        <a className={ cnLink() } href={'#'}>Помощь</a>
                    </li>
                    <li className={ cnFooter('Tab')}>
                        <a className={ cnLink() } href='#'>Обратная связь</a>
                    </li>
                    <li className={ cnFooter('Tab')}>
                        <a className={ cnLink() } href='#'>Разработчикам</a>
                    </li>
                    <li className={ cnFooter('Tab')}>
                        <a className={ cnLink() } href='#'>Условия использования</a>
                    </li>
                    <li className={ cnFooter('Tab')}>
                        <a className={ cnLink() } href='#'>Авторские права</a>
                    </li>
                </ul>
                <div className={ cnFooter( { side: 'right' }) }>© 2001–2017 ООО «Яндекс»</div>
            </section>
        )
    }
}
