import React, { Component } from 'react';
import './App.css';

import { EventFeed } from './view/components/EventFeed/EventFeed';

class App extends Component {
  public render() {
    return (
      <>
          <EventFeed />
      </>
    );
  }
}

export default App;
