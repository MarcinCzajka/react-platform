import basePath from '../../api/basePath';
import { mediaListPath } from '../../apiConfig';

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

            console.log(res.data);

            resolve(res.data.Entities)
        }).catch(error => {
            reject(error);
        });
    })
}   