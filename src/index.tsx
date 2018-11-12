import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import mobileDetector from 'mobile-detect';

const ua = new mobileDetector(navigator.userAgent);
const isMobile = ua.mobile();

if (isMobile) {
    import('./view/components/App/App@touch').then(({ App }) => {
        ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
    });
    import('./view/components/Footer/Footer@touch').then(({ Footer }) => {
        ReactDOM.render(<Footer />, document.getElementsByTagName('footer')[0]);
    });
    import('./view/components/Header/Header@touch').then(({ Header }) => {
        ReactDOM.render(<Header />, document.getElementsByTagName('header')[0]);
    });
} else {
    import('./view/components/Header/Header@desktop').then(({ Header }) => {
        ReactDOM.render(<Header />, document.getElementsByTagName('header')[0]);
    });
    import('./view/components/Footer/Footer@desktop').then(({ Footer }) => {
       ReactDOM.render(<Footer />, document.getElementsByTagName('footer')[0]);
   });
    import('./view/components/App/App@desktop').then(({ App }) => {
       ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
   });
}
