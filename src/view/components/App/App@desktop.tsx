import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import { App as AppCommon } from './App';
import { EventFeed } from '../EventFeed/EventFeed@desktop';
import { Event } from '../Event/Event@desktop';
import { Button } from "../Button/index";
import { Footer } from "../Footer/Footer@desktop";
import { Header } from "../Header/Header@desktop";

const cnApp = cn('App');
const cnEventFeed = cn('EventFeed');
const cnEvent = cn('Event');
const cnButton = cn('Button');
const cnFooter = cn('Footer');
const cnHeader = cn('Header');

const registry = new Registry({ id: cnApp() });

registry.set(cnEventFeed(), EventFeed);
registry.set(cnEvent(), Event);
registry.set(cnButton(), Button);
registry.set(cnFooter(), Footer);
registry.set(cnHeader(), Header);

export const App = withRegistry(registry)(AppCommon);
