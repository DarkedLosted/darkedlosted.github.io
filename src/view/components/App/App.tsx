import * as React from 'react';
import { cn } from "@bem-react/classname";
import { RegistryConsumer } from "@bem-react/di";

const cnApp = cn('App');
const cnEventFeed = cn('EventFeed');
const cnFooter = cn('Footer');
const cnHeader = cn('Header');

export const App: React.SFC = () => (
    <RegistryConsumer>
        {registries => {
            const registry = registries[cnApp()];
            const EventFeed = registry.get(cnEventFeed());
            const Footer = registry.get(cnFooter());
            const Header = registry.get(cnHeader());

            return <>
                <header>
                    <Header />
                </header>
                <main>
                    <EventFeed />
                </main>
                <footer>
                    <Footer />
                </footer>
            </>;
        }}
    </RegistryConsumer>
);
