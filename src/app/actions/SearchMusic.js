import {
    SEARCH_MUSIC_LOADING,
    SEARCH_MUSIC_SUCCESS,
    SEARCH_MUSIC_ERROR,
    SEARCH_MUSIC_SORT_LIST,
    SEARCH_MUSIC_OPEN_DETAIL,
    SEARCH_MUSIC_CLOSE_DETAIL,
} from 'constants/ActionTypes';
import { SearchMusicService } from 'services';

export function searchMusic(text) {
    return (dispatch) => {
        dispatch({ type: SEARCH_MUSIC_LOADING, searchText: text });

        SearchMusicService.searchMusic(text)
            .then(({ count, results }) => {
                dispatch({ type: SEARCH_MUSIC_SUCCESS, data: results, count });
            })
            .catch((error) => {
                dispatch({ type: SEARCH_MUSIC_ERROR });
                console.error('something happens:', error);
            });
    };
}

export function sortTable(field) {
    return (dispatch) => {
        dispatch({ type: SEARCH_MUSIC_SORT_LIST, field });
    };
}

export function openDetail(selectedElement) {
    return (dispatch) => {
        if (!selectedElement) return null;
        dispatch({ type: SEARCH_MUSIC_OPEN_DETAIL, selectedElement });
    };
}

export function closeDetail() {
    return (dispatch) => {
        dispatch({ type: SEARCH_MUSIC_CLOSE_DETAIL });
    };
}

export function searchTrack(trackId) {
    return (dispatch, getState) =>
        new Promise((resolve) => {
            const list = getState().searchMusic?.list || [];
            const index = list.findIndex((element) => element.trackId === trackId);
            // return previous and next track as a loop playlist
            const previousTrack = index === 0 ? list[list.length - 1] : list[index - 1];
            const nextTrack = index === list.length - 1 ? list[0] : list[index + 1];
            resolve({
                trackIndex: index,
                track: index !== -1 ? list[index] : null,
                previousTrack,
                nextTrack,
            });
        });
}
