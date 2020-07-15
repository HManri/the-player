import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import TrackButtons from './TrackButtons';
import styles from './styles/trackBox';

const useStyles = createUseStyles(styles);

const TrackBox = memo(
    ({ className, track, previousTrack, nextTrack, isMainBox, onRef, onClick }) => {
        const theme = useTheme();
        const classes = useStyles({
            theme,
        });
        const contentClassName = classnames(
            'search-music__detail__box__content',
            classes['content'],
            className,
            { secondary: !isMainBox },
        );
        const imageClassName = classnames(
            'search-music__detail__box__content__image',
            classes['content-image'],
            { secondary: !isMainBox },
        );
        const contentTitleClassName = classnames(
            'search-music__detail__box__content__title',
            classes['content-title'],
            { secondary: !isMainBox },
        );
        const contentSubtitleClassName = classnames(
            'search-music__detail__box__content__subtitle',
            classes['content-subtitle'],
            { secondary: !isMainBox },
        );

        return (
            <div className={contentClassName} onClick={onClick}>
                <div className={imageClassName}>
                    {track && (
                        <img
                            src={isMainBox ? track.artworkUrl100 : track.artworkUrl60}
                            alt={track.collectionName}
                        />
                    )}
                </div>
                <div className={contentTitleClassName}>{track?.trackName || ''}</div>
                <div className={contentSubtitleClassName}>{track?.artistName || ''}</div>
                {isMainBox && track && (
                    <TrackButtons
                        trackTitle={track.trackName}
                        trackArtist={track.artistName}
                        trackUrl={track.previewUrl}
                        previousTrack={previousTrack}
                        nextTrack={nextTrack}
                        onRef={onRef}
                    />
                )}
            </div>
        );
    },
);

TrackBox.propTypes = {
    className: PropTypes.string,
    track: PropTypes.object,
    previousTrack: PropTypes.number,
    nextTrack: PropTypes.number,
    mainBox: PropTypes.bool,
    onRef: PropTypes.func,
    onClick: PropTypes.func,
};

export default TrackBox;
