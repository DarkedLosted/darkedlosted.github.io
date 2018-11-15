import * as React from 'react';
import { cn } from '@bem-react/classname';

import './MusicPlayer.css';
import prevIcon from '../../../icons/Prev.svg';
import nextIcon from '../../../icons/Next.svg';

const cnMusicPlayer = cn('MusicPlayer');

export interface MusicPlayerProps {
    albumcover: string,
    artist: string,
    track: {
        name: string,
        length: string
    },
    volume: number,
}

export class MusicPlayer extends React.Component<MusicPlayerProps> {
    constructor(props: MusicPlayerProps) {
        super(props);

    }

    public render() {
        const player =  {...this.props};

        return (
            <div className={ cnMusicPlayer() }>
                <div className={ cnMusicPlayer('Header') }>
                    <img className={ cnMusicPlayer('Icon') } src={ `${ player.albumcover }` } alt='album'/>
                    <div className={ cnMusicPlayer('Song') }>
                        <label className={ cnMusicPlayer('SongName') }>{ `${ player.artist } - ${ player.track.name }`}</label>
                        <div className={ cnMusicPlayer('SongControl') }>
                            <input type='range' min='0' className={ cnMusicPlayer('ControlSlider') }/>
                            <span className={ cnMusicPlayer('ControlTime') }>{ player.track.length }</span>
                        </div>
                    </div>
                </div>
                <div className={ cnMusicPlayer('Controls') }>
                    <img className={ cnMusicPlayer('ControlsPrev') } src={ prevIcon } alt='Previous'/>
                    <img className={ cnMusicPlayer('ControlsNext') } src={ nextIcon } alt='Next'/>
                    <input type='range' min='0' max='100' className={ cnMusicPlayer('ControlsSlider') }/>
                    <span className={ cnMusicPlayer('ControlsVolume') }>{ `${ player.volume }%` }</span>
                </div>
            </div>
        )
    }
}
