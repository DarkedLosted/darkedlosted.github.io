import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Header} from "./view/components/Header/Header";
import {Footer} from "./view/components/Footer/Footer";

ReactDOM.render(<App />, document.getElementsByTagName('main')[0]);
ReactDOM.render(<Footer />, document.getElementsByTagName('footer')[0]);
ReactDOM.render(<Header />, document.getElementsByTagName('header')[0]);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
