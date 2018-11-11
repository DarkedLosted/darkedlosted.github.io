import * as React from 'react';
import { cn } from '@bem-react/classname';

import './EventFeed.css';
import { events } from '../Event/events.json';
import { Event, EventProps } from "../Event/Event";
import { RegistryConsumer } from '@bem-react/di';

const cnEventFeed = cn('EventFeed');

export class EventFeed extends React.Component {
    public render() {
        return(
            <>
                <header className={ cnEventFeed('Header') }>Лента событий</header>
                <div className={ cnEventFeed() }>
                    <RegistryConsumer>
                        { () =>  {
                                return events.map((event: EventProps, key: number) => <Event key={ key } {...event}/>);
                            }
                        }
                    </RegistryConsumer>
                </div>
            </>
        )
    }
}
