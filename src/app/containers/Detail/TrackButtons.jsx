import React, { memo, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { withRouter } from 'react-router-dom';
import { getParameterByName, cleanQueryString } from 'utils/url';
import AnchorButton from 'components/AnchorButton';
import Play from 'icons/Play';
import Pause from 'icons/Pause';
import Previous from 'icons/Previous';
import Next from 'icons/Next';
import Whatsapp from 'icons/Whatsapp';
import styles from './styles/trackButtons';

const useStyles = createUseStyles(styles);

const TrackButtons = memo(
    ({ trackTitle, trackArtist, trackUrl, previousTrack, nextTrack, onRef, history }) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const trackRef = useRef(null);
        const twitterButtonRef = useRef(null);

        const theme = useTheme();
        const classes = useStyles({ theme });
        const controlButtonsClassName = classnames(
            'search-music__detail__box__content__controls',
            classes.controls,
        );
        const playerControlsClassName = classnames(
            'search-music__detail__box__content__controls__player',
            classes['player-controls'],
        );
        const socialButtonsClassName = classnames(
            'search-music__detail__box__content__controls__social-media',
            classes['social-media'],
        );
        const controlPlayPauseClassName = classnames(
            'search-music__detail__box__content__controls__play-pause',
            classes.button,
            classes['controls-play-pause'],
        );
        const controlPreviousClassName = classnames(
            'search-music__detail__box__content__controls__play-pause',
            classes.button,
            classes['controls-previous'],
            { [classes['button--disabled']]: !previousTrack },
        );
        const controlNextClassName = classnames(
            'search-music__detail__box__content__controls__play-pause',
            classes.button,
            classes['controls-next'],
            { [classes['button--disabled']]: !nextTrack },
        );

        const onPlayPause = useCallback(() => {
            const audio = trackRef.current;
            if (audio.paused || audio.ended) {
                audio.play();
                setIsPlaying(true);
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        }, []);

        const playNextTrack = useCallback(() => {
            if (nextTrack) {
                history.push(`/detail/${nextTrack}?autoplay=1`);
            }
        }, [nextTrack, history]);

        const playPauseControlButton = useMemo(() => {
            if (isPlaying) return <Pause />;
            return <Play />;
        }, [isPlaying]);

        const shareText = useMemo(() => {
            return `Hello there! Listen with me ${trackTitle} of ${trackArtist} and share your feelings with the song!`;
        }, [trackTitle, trackArtist]);

        const previousTrackUrl = useMemo(() => {
            if (!previousTrack) return null;
            return `/detail/${previousTrack}`;
        }, [previousTrack]);

        const nextTrackUrl = useMemo(() => {
            if (!nextTrack) return null;
            return `/detail/${nextTrack}`;
        }, [nextTrack]);

        useEffect(() => {
            window.twttr.ready(() => {
                window.twttr.widgets.createShareButton(
                    window.location.href,
                    twitterButtonRef.current,
                    {
                        text: shareText,
                        size: 'large',
                        url: window.location.href,
                        hashtags: 'liveisgood',
                    },
                );
            });
        }, [shareText]);

        useEffect(() => {
            if (onRef && trackRef.current) {
                onRef(trackRef.current);
            }
        }, [onRef]);

        useEffect(() => {
            const qs = history?.location?.search;
            if (qs) {
                const autoplay = getParameterByName(qs, 'autoplay');
                if (!!autoplay && trackRef.current) {
                    trackRef.current.play();
                    setIsPlaying(true);
                    cleanQueryString();
                }
            }
        }, [history]);

        return (
            <div className={controlButtonsClassName}>
                <div className={playerControlsClassName}>
                    <audio ref={trackRef} src={trackUrl} onEnded={playNextTrack}></audio>
                    <AnchorButton className={controlPreviousClassName} anchor={previousTrackUrl}>
                        <Previous />
                    </AnchorButton>
                    <div className={controlPlayPauseClassName} onClick={onPlayPause}>
                        {playPauseControlButton}
                    </div>
                    <AnchorButton className={controlNextClassName} anchor={nextTrackUrl}>
                        <Next />
                    </AnchorButton>
                </div>
                <div className={socialButtonsClassName}>
                    <div
                        className="search-music__detail__box__content__controls__social-media__twitter"
                        ref={twitterButtonRef}
                    ></div>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                            `${shareText} ${window.location.href}`,
                        )}`}
                        className="search-music__detail__box__content__controls__social-media__whatsapp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Whatsapp />
                    </a>
                </div>
            </div>
        );
    },
);

TrackButtons.propTypes = {
    trackTitle: PropTypes.string,
    trackArtist: PropTypes.string,
    trackUrl: PropTypes.string,
    previousTrack: PropTypes.number,
    nextTrack: PropTypes.number,
    onRef: PropTypes.func,
    history: PropTypes.object,
};

export default withRouter(TrackButtons);
