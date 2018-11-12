import * as React from 'react';
import { cn } from '@bem-react/classname';

import './EventFeed.css';
import { events } from '../Event/events.json';
import { EventProps } from "../Event/Event";
import { RegistryConsumer } from '@bem-react/di';

const cnEventFeed = cn('EventFeed');
const cnEvent = cn('Event');
const cnApp = cn('App');

export class EventFeed extends React.Component {
    public render() {
        return(
            <>
                <header className={ cnEventFeed('Header') }>Лента событий</header>
                <div className={ cnEventFeed() }>
                    <RegistryConsumer>
                        {registries =>  {
                                const registry = registries[cnApp()];

                                const Event = registry.get<EventProps>(cnEvent());

                                return events.map((event: EventProps, key: number) => <Event key={ key } {...event}/>);
                            }
                        }
                    </RegistryConsumer>
                </div>
            </>
        )
    }
}
