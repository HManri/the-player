import jsonp from 'jsonp';

export function searchMusic(text) {
    if (!text) return Promise.reject('You need to specify some text to search');
    return new Promise((resolve, reject) => {
        jsonp(
            `https://itunes.apple.com/search?country=ES&media=music&term=${encodeURIComponent(
                text,
            )}`,
            null,
            (error, data) => {
                if (error) reject(error);
                resolve({ count: data.resultCount, results: data.results });
            },
        );
    });
}

export function searchTrack(trackId) {
    // not used for now, but util to get a track from its trackId
    if (!trackId) return Promise.reject('You need to specify a trackId number');
    return new Promise((resolve, reject) => {
        jsonp(`https://itunes.apple.com/lookup?id=${trackId}`, null, (error, data) => {
            if (error) reject(error);
            resolve({ data });
        });
    });
}
