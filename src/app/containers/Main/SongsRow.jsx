import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './styles/row';

const useStyles = createUseStyles(styles);

const SongRow = memo(({ data, sortTable }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const rootClassName = classnames('songs-row', classes['songs-row']);
    const titleClassName = classnames('songs-row__title', classes['songs-row__title']);
    const artistClassName = classnames('songs-row__artist', classes['songs-row__artist']);
    const collectionClassName = classnames('songs-row__album', classes['songs-row__album']);
    const thumbCLassName = classnames('songs-row__thumb', classes['songs-row__thumb']);
    const lengthClassName = classnames(
        'songs-row__length',
        classes['songs-row__length'],
        classes['songs-row--sort-clickable'],
    );
    const genreClassName = classnames(
        'songs-row__genre',
        classes['songs-row__genre'],
        classes['songs-row--sort-clickable'],
    );
    const priceClassName = classnames(
        'songs-row__price',
        classes['songs-row__price'],
        classes['songs-row--sort-clickable'],
    );

    const songLength = useMemo(() => {
        const minutes = Math.floor(data.trackTimeMillis / 60000);
        const seconds = ((data.trackTimeMillis % 60000) / 1000).toFixed(0);

        const finalMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const finalSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${finalMinutes}:${finalSeconds}`;
    }, [data.trackTimeMillis]);

    return (
        <div className={rootClassName}>
            <div className={titleClassName}>
                <Link to={`/detail/${data.trackId}`}>{data.trackName}</Link>
            </div>
            <div className={artistClassName}>{data.artistName}</div>
            <div className={collectionClassName}>{data.collectionName}</div>
            <div className={thumbCLassName}>
                <img src={data.artworkUrl60} alt={data.collectionName} />
            </div>
            <div
                className={lengthClassName}
                onClick={sortTable ? sortTable('trackTimeMillis') : null}
            >
                {songLength}
            </div>
            <div
                className={genreClassName}
                onClick={sortTable ? sortTable('primaryGenreName') : null}
            >
                {data.primaryGenreName}
            </div>
            <div
                className={priceClassName}
                onClick={sortTable('trackPrice')}
            >{`${data.trackPrice} ${data.currency}`}</div>
        </div>
    );
});

SongRow.propTypes = {
    data: PropTypes.object,
    sortTable: PropTypes.func,
};

export default SongRow;
