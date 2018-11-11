import React from 'react';
import './App.css';

import { EventFeed } from './components/EventFeed/EventFeed';
import {withBemMod} from "@bem-react/core";
import {cn} from "@bem-react/classname";

const cnYandexHome = cn('YandexHome');

function yandexHome() {
    return (
      <>
          <EventFeed />
      </>
    );
}

export const App = withBemMod(cnYandexHome(), {})(yandexHome);
