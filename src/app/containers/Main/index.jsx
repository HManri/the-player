import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { SearchMusicActions } from 'actions';
import InputSearch from 'components/InputSearch';
import SongsTable from './SongsTable';
import styles from './styles';

const mapStateToProps = (state) => {
    return {
        searchText: state.searchMusic.searchText || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchMusic: bindActionCreators(SearchMusicActions, dispatch).searchMusic,
    };
};

const useStyles = createUseStyles(styles);

const Main = memo(({ searchText, searchMusic }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const rootClassName = classnames('music-player__main', classes.main);

    const makeSearch = useCallback(
        (text) => {
            if (!text) return;
            searchMusic(text);
        },
        [searchMusic],
    );

    return (
        <div className={rootClassName}>
            <div className={classes.title}>Welcome to Music Player!</div>
            <div className={classes.subtitle}>Find for any artist, song, album or genre</div>
            <div className={classes.search}>
                <InputSearch
                    placeholder="Search an artist, song..."
                    onKeyEnter={makeSearch}
                    value={searchText}
                />
            </div>
            <SongsTable />
        </div>
    );
});

Main.propTypes = {
    searchText: PropTypes.string,
    searchMusic: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
