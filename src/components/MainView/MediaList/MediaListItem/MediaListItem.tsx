import React from 'react';
import './MediaListItem.scss';

interface listItem {
    Id: number,
    Title: string,
    Description: string,
    IsTrialContentAvailable?: boolean,
    Images: MediaImage[]
}

interface MediaImage {
    Url: string
}

type listItemProps = {
    entity: listItem
}

const MediaListItem = ({ entity }: listItemProps) => <div className="mediaListItem">
    <p>{entity.Title}</p>
    <p>{entity.Description}</p>
    <img src={entity.Images[0]?.Url} alt={`Cover of ${entity.Title}`}></img>
</div>

export default MediaListItem