import basePath from '../../api/basePath';
import { mediaListPath, mediaPath } from '../../api/apiConfig';

export function getMediaList(token: string, mediaListId = 0, pageNumber = 0, pageSize = 15) {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'post',
            url: mediaListPath,
            data: {
                "MediaListId": mediaListId,
                "IncludeCategories": false,
                "IncludeImages": true,
                "IncludeMedia": false,
                "IncludeCount": true,
                "PageNumber": pageNumber,
                "PageSize": pageSize
            },
            headers: { 
                Authorization: token 
            },
            withCredentials: true
        }).then(res => {
            if(!res.data?.Entities) throw new Error('Empty collection');

            resolve(res.data.Entities)
        }).catch(error => {
            reject(error);
        });
    })
}   

export function getMedia(token: string, mediaId: number, streamType: 'TRIAL' | 'MAIN') {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'post',
            url: mediaPath,
            data: {
                "MediaId": mediaId,
                "StreamType": streamType
            },
            headers: {
                Authorization: token
            },
            withCredentials: true
        }).then(res => {
            resolve(res.data.ContentUrl)
        }).catch(error => {
            reject(error);
        });
    })
}