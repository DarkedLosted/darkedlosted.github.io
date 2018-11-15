import React from 'react';
import ReactDOM from 'react-dom';
import mobileDetector from 'mobile-detect';

import './index.css';

const ua = new mobileDetector(navigator.userAgent);
const isMobile = ua.mobile();

if (isMobile) {
    import('./view/components/App/App@touch').then(({ App }) => {
        ReactDOM.render(<App />, document.querySelector('.body'));
    });
} else {
    import('./view/components/App/App@desktop').then(({ App }) => {
        ReactDOM.render(<App />, document.querySelector('.body'));
    });
}
