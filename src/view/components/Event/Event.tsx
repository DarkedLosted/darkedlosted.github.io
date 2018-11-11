import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Event.css';
import closeIcon from '../icons/cross.svg';
import nextIcon from '../icons/next-black.svg';

const cnEvent = cn('Event');

export interface EventData {
    temperature?: number,
    humidity?: number,
    type?: string,
    albumcover?: string,
    artist?: string,
    track?: {
        name: string,
        length: string
    },
    volume?: number,
    buttons?: string[],
    image?: string,
}

export interface EventProps {
    type: string,
    title: string,
    source: string,
    time: string,
    size: string,
    icon: string,
    description?: string | null,
    data?: EventData

}

export class Event extends React.Component<EventProps> {
    constructor(props: EventProps) {
        super(props);
    }

    public render() {
        const event = {...this.props};
        const icon = require(`../icons/${ event.icon }.svg`);
        const additions = event.data;
        const temperature = event.data && event.data.temperature;
        const humidity = event.data && event.data.humidity;
        const description = event.description;


        return (
            <article className={ cnEvent({ size: event.size, error: event.type === 'critical' }) }>
                <img src={ closeIcon } title='Закрыть' className={ cnEvent('Cross') }/>
                <div className={ cnEvent('Header') }>
                    <img className={ cnEvent('Icon') } src={ icon } title='' alt=''/>
                    <div className={ cnEvent('Title') }>{ event.title }</div>
                    <div className={ cnEvent('Source') }>{ event.source }</div>
                    <time className={ cnEvent('Time') }>{ event.time }</time>
                </div>
                { description && <div className={ cnEvent('Description') }>
                    { event.description }
                    { additions && <div className={ cnEvent('Additions') }>
                        <div className={ cnEvent('Top') } />
                        <img touch-action='none' className={ cnEvent('Image') } src={ event.data && event.data.image } />
                        { temperature && <div className={ cnEvent('Temperature') }>{ temperature }</div> }
                        { humidity && <div className={ cnEvent('Humidity') }>{ humidity }</div> }
                    </div> }
                </div> }
                <img src={ nextIcon } title='Перейти' alt='next' className={ cnEvent('Next') }/>
            </article>
        )
    }
}
