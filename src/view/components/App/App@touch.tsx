import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import { App as AppCommon } from './App';
import { EventFeed } from "../EventFeed/EventFeed@touch";
import { Event } from "../Event/Event@touch";
import { Button } from "../Button/Button@touch";

const cnApp = cn('App');
const cnEventFeed = cn('EventFeed');
const cnEvent = cn('Event');
const cnButton = cn('Button');

const registry = new Registry({ id: cnApp() });

registry.set(cnEventFeed(), EventFeed);
registry.set(cnEvent(), Event);
registry.set(cnButton(), Button);

export const App = withRegistry(registry)(AppCommon);
