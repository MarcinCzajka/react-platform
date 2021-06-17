import React from 'react';
import './MediaList.scss';
import MediaListItem from './MediaListItem/MediaListItem';

type MediaListProps = {
    listTitle: string,
    entities: []
}

const MediaList = (props: MediaListProps) => <div>
    {props.listTitle}
    {props.entities.map((entity, index) => <MediaListItem entity={entity} key={index} /> )}
</div>

export default MediaList