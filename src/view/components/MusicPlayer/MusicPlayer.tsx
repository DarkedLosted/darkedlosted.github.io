import * as React from 'react';
import { cn } from '@bem-react/classname';

import './MusicPlayer.css';
import prevIcon from '../icons/Prev.svg';
import nextIcon from '../icons/Next.svg';

const cnMusicPlayer = cn('MusicPlayer');

export class MusicPlayer extends React.Component {
    public render() {
        return (
            <div className={ cnMusicPlayer() }>
                <div className={ cnMusicPlayer('Header') }>
                    <img className={ cnMusicPlayer('Icon') } src='' alt='album'/>
                    <div className={ cnMusicPlayer('Song') }>
                        <label className={ cnMusicPlayer('SongName') } />
                        <div className={ cnMusicPlayer('SongControl') }>
                            <input type='range' min='0' className={ 'ControlSlider' }/>
                            <span className={ cnMusicPlayer('ControlTime') } />
                        </div>
                    </div>
                </div>
                <div className={ cnMusicPlayer('Controls') }>
                    <img className={ cnMusicPlayer('ControlsPrev') } src={ prevIcon } alt='Previous'/>
                    <img className={ cnMusicPlayer('ControlsNext') } src={ nextIcon } alt='Next'/>
                    <input type='range' min='0' max='100' className={ cnMusicPlayer('ControlsSlider') }/>
                    <span className={ cnMusicPlayer('ControlsVolume') } />
                </div>
            </div>
        )
    }
}
