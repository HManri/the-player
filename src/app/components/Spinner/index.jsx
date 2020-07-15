import React, { memo } from 'react';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import styles from './styles';

const useStyles = createUseStyles(styles);

const Spinner = memo(() => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const spinnerClassName = classnames('loader-spinner', classes.spinner);

    return (
        <svg className={spinnerClassName} viewBox="0 0 50 50">
            <circle
                className="loader-spinner-path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
            ></circle>
        </svg>
    );
});

export default Spinner;
