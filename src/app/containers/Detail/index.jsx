import React, { memo, useEffect, useReducer, useCallback, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams, Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { SearchMusicActions } from 'actions';
import { SearchMusicService } from 'services';
import Spinner from 'components/Spinner';
import LeftArrow from 'icons/LeftArrow';
import TrackBox from './TrackBox';
import styles from './styles';

const useStyles = createUseStyles(styles);

const mapDispatchToProps = (dispatch) => {
    return {
        searchTrack: bindActionCreators(SearchMusicActions, dispatch).searchTrack,
    };
};

const initialState = {
    loading: true,
    track: null,
    previousTrack: null,
    nextTrack: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: action.loading };
        case 'track':
            return {
                ...state,
                loading: false,
                track: action.track,
                previousTrack: action.previousTrack,
                nextTrack: action.nextTrack,
            };
        default:
            break;
    }
};

const Detail = memo(({ searchTrack, history }) => {
    const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const audioRef = useRef(null);

    const theme = useTheme();
    const classes = useStyles({ theme });
    const rootClassName = classnames('search-music__detail', classes['detail']);
    const goBackClassName = classnames('search-music__detail__go-back', classes.back);
    const boxClassName = classnames('search-music__detail__box', classes['box']);
    const loadingClassName = classnames('search-music__detail__box__loading', classes['loading']);

    const trackBoxMainClassName = classnames(classes['track-box'], {
        [classes['track-box-primary']]: true,
    });
    const trackBoxSecondaryClassName = classnames(classes['track-box'], {
        [classes['track-box-secondary']]: true,
    });
    const leftSecondaryClassName = classnames(trackBoxSecondaryClassName, {
        'search-music__detail__box__track-box--clickable': !!state.previousTrack,
    });
    const rightSecondaryClassName = classnames(trackBoxSecondaryClassName, {
        'search-music__detail__box__track-box--clickable': !!state.nextTrack,
    });

    const getAudioOnRef = useCallback((audio) => {
        audioRef.current = audio;
    }, []);

    const changeTrack = useCallback(
        (action) => () => {
            const autoPlay = !(audioRef.current.paused || audioRef.current.ended)
                ? `?autoplay=1`
                : '';
            if (action === 'previous' && state.previousTrack)
                history.push(`/detail/${state.previousTrack.trackId}${autoPlay}`);
            else if (action === 'next' && state.nextTrack)
                history.push(`/detail/${state.nextTrack.trackId}${autoPlay}`);
        },
        [state.previousTrack, state.nextTrack, history],
    );

    useEffect(() => {
        dispatch({ type: 'loading', loading: true });
        searchTrack(parseInt(id, 10))
            .then(({ trackIndex, track, previousTrack, nextTrack }) => {
                if (!track) {
                    SearchMusicService.searchTrack(id)
                        .then(({ data }) => {
                            if (data?.results?.[0]) {
                                dispatch({ type: 'track', track: data.results[0] });
                            }
                        })
                        .catch((error) => {
                            console.error('impossible to get the song:', error);
                        });
                } else {
                    dispatch({ type: 'track', track, previousTrack, nextTrack });
                }
            })
            .catch((error) => {
                console.error('something happens:', error);
            });
    }, [searchTrack, id]);

    return (
        <div className={rootClassName}>
            <Link to="/" className={goBackClassName}>
                <LeftArrow />
                Go back
            </Link>
            <div className={boxClassName}>
                {state.loading && (
                    <div className={loadingClassName}>
                        <Spinner />
                    </div>
                )}
                {!state.loading && state.track && (
                    <Fragment>
                        <TrackBox
                            className={leftSecondaryClassName}
                            track={state.previousTrack}
                            isMainBox={false}
                            onClick={changeTrack('previous')}
                        />
                        <TrackBox
                            className={trackBoxMainClassName}
                            track={state.track}
                            previousTrack={state.previousTrack?.trackId}
                            nextTrack={state.nextTrack?.trackId}
                            isMainBox={true}
                            onRef={getAudioOnRef}
                        />
                        <TrackBox
                            className={rightSecondaryClassName}
                            track={state.nextTrack}
                            isMainBox={false}
                            onClick={changeTrack('next')}
                        />
                    </Fragment>
                )}
            </div>
        </div>
    );
});

Detail.propTypes = {
    searchTrack: PropTypes.func,
    history: PropTypes.object,
};

export default withRouter(connect(null, mapDispatchToProps)(Detail));
