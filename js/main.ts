import { init, initTabToggleListner } from './js';
import { initVideos } from './video';

window.addEventListener('load', () => {
    init();
    initTabToggleListner();
    initVideos();
    console.log('loaded')
});
