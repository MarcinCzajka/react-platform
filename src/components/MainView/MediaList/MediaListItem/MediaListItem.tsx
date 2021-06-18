import React from 'react';
import './MediaListItem.scss';
import Player from '../../../Player/Player';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

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
    entity: listItem,
    displayMedia: (Id: number, poster?: string) => void
}

const MediaListItem = ({ entity, displayMedia }: listItemProps) => <div className="mediaListItem" onClick={() => displayMedia(entity.Id, entity.Images[0]?.Url)}>
    <div className="imageWrapper" >
        {entity.Images[0]?.Url ? (
            <img src={entity.Images[0]?.Url} alt={`Cover of ${entity.Title}`}></img>
        ) : <p>Movie poster unavailable yet</p>}
    </div>
    <h4 className="mediaTitle">{entity.Title}</h4>
</div>

export default MediaListItem