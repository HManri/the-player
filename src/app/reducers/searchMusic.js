import {
    SEARCH_MUSIC_LOADING,
    SEARCH_MUSIC_SUCCESS,
    SEARCH_MUSIC_ERROR,
    SEARCH_MUSIC_SORT_LIST,
    SEARCH_MUSIC_OPEN_DETAIL,
    SEARCH_MUSIC_CLOSE_DETAIL,
} from 'constants/ActionTypes';

const initialState = {
    loading: false,
    error: false,
    list: [],
    count: 0,
    searchText: '',
    sortField: '',
    selectedElement: null,
};

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case SEARCH_MUSIC_LOADING:
            return { ...state, loading: true, error: false, searchText: action.searchText || '' };
        case SEARCH_MUSIC_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                list: action.data,
                count: action.count,
            };
        case SEARCH_MUSIC_ERROR:
            return { ...state, loading: false, error: true };
        case SEARCH_MUSIC_SORT_LIST:
            let newList = state.list; // if there is no change, will be the same reference
            if (
                action.field &&
                state.sortField !== action.field &&
                state.list?.[0]?.hasOwnProperty(action.field)
            ) {
                newList = [...state.list].sort((a, b) => {
                    if (a[action.field] < b[action.field]) return -1;
                    if (a[action.field] > b[action.field]) return 1;
                    return 0;
                });
            }
            return {
                ...state,
                list: newList,
                sortField: action.field,
            };
        case SEARCH_MUSIC_OPEN_DETAIL:
            return { ...state, selectedElement: action.selectedElement };
        case SEARCH_MUSIC_CLOSE_DETAIL:
            return { ...state, selectedElement: null };
        default:
            return state;
    }
}
