import React from 'react';
import './PlayerModal.scss';
import Player from '../../Player/Player';

type PlayerModalProps = {
    src: string,
    poster: string,
    close: () => void
}

const PlayerModal = ({ src, poster = '', close }: PlayerModalProps) => (
    <div className="playerModal">
        <div className='closeButton' onClick={close}>x</div>
        <Player src={src} poster={poster} />
    </div>
)

export default PlayerModal