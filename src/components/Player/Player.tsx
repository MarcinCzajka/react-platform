import React from 'react';
// @ts-ignore
import { ReactVideo } from "reactjs-media";

type playerProps = {
    src: string,
    poster?: string
}

const Player = (props: playerProps) =>  (
    <div className="playerWrapper">
        <ReactVideo
            src={props.src}
            poster={props.poster ? props.poster : ""}
            primaryColor="red"
        />
    </div>
);

export default Player