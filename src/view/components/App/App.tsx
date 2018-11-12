import * as React from 'react';
import { cn } from "@bem-react/classname";
import { RegistryConsumer } from "@bem-react/di";

const cnApp = cn('App');
const cnEventFeed = cn('EventFeed');

export const App: React.SFC = () => (
    <RegistryConsumer>
        {registries => {
            const registry = registries[cnApp()];
            const EventFeed = registry.get(cnEventFeed());

            return <EventFeed />;
        }}
    </RegistryConsumer>
);
