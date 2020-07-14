import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { SearchMusicActions } from 'actions';
import Spinner from 'components/Spinner';
import styles from './styles/table';
import SongsRow from './SongsRow';

const mapStateToProps = (state) => {
    return {
        list: state.searchMusic.list || [],
        searchText: state.searchMusic.searchText || '',
        loading: state.searchMusic.loading || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortTable: bindActionCreators(SearchMusicActions, dispatch).sortTable,
        openDetail: bindActionCreators(SearchMusicActions, dispatch).openDetail,
    };
};

const useStyles = createUseStyles(styles);

const SongsTable = memo(({ list, searchText, loading, sortTable }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const rootClassName = classnames('songs-table', classes['songs-table']);
    const searchForSomethingClassName = classnames('songs-table__no-search', classes['no-search']);
    const loadingClassName = classnames('songs-table__loading', classes.loading);
    const noResultsClassName = classnames('songs-table__no-results', classes['no-results']);

    const sortByField = useCallback(
        (field) => () => {
            sortTable(field);
        },
        [sortTable],
    );

    const contentTable = useMemo(() => {
        if (loading)
            return (
                <div className={loadingClassName}>
                    <Spinner />
                </div>
            );
        if (!searchText)
            return (
                <div className={searchForSomethingClassName}>
                    Search for an artist, song, album or genre to see results
                </div>
            );
        if (!list || list.length === 0)
            return <div className={noResultsClassName}>There is no results for this search</div>;
        return list.map((data, index) => (
            <SongsRow key={index} data={data} sortTable={sortByField} />
        ));
    }, [
        searchText,
        loading,
        list,
        searchForSomethingClassName,
        loadingClassName,
        noResultsClassName,
        sortByField,
    ]);

    return <div className={rootClassName}>{contentTable}</div>;
});

SongsTable.propTypes = {
    list: PropTypes.array,
    searchText: PropTypes.string,
    loading: PropTypes.bool,
    sortTable: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsTable);
