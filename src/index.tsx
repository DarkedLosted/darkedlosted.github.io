import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './view/App';
import {Header} from "./view/components/Header/Header";
import {Footer} from "./view/components/Footer/Footer";
import mobileDetector from 'mobile-detect';

const ua = new mobileDetector(navigator.userAgent);
const device = ua.mobile() ? 'touch' : 'desktop';

ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
ReactDOM.render(<Footer />, document.getElementsByTagName('footer')[0]);
ReactDOM.render(<Header />, document.getElementsByTagName('header')[0]);
