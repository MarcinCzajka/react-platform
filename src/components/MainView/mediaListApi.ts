import basePath from '../../api/basePath';
import { mediaListPath } from '../../apiConfig';

export function getMediaList(token: string, mediaListId = 2, pageNumber = 0, pageSize = 15) {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'post',
            url: mediaListPath,
            data: {
                "MediaListId": mediaListId,
                "IncludeCategories": false,
                "IncludeImages": true,
                "IncludeMedia": false,
                "PageNumber": pageNumber,
                "PageSize": pageSize
            },
            headers: { 
                Authorization: token 
            },
            withCredentials: true
        }).then(res => {
            console.log(res)
            resolve(res.data.Entities)
        }).catch(error => {
            reject(error.response.data);
        });
    })
}   