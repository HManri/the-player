import React, { memo, useState, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import styles from './styles';

const useStyles = createUseStyles(styles);

const AutoComplete = memo(({ className, placeholder, value = '', onKeyEnter }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const rootClassName = classnames('auto-complete', classes['auto-complete']);
    const inputClassName = classnames('auto-complete__input', classes.input);

    const autoCompleteRef = useRef(null);
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState(null);

    const onChangeInput = useCallback((event) => {
        const text = event.target.value;
        setInputValue(text);
    }, []);

    const onKeyDown = useCallback(
        (evt) => {
            if (evt.keyCode === 13 && onKeyEnter) {
                onKeyEnter(inputValue);
            }
        },
        [onKeyEnter, inputValue],
    );

    const finalInputValue = useMemo(() => {
        if (!inputValue && inputValue !== '') return value;
        return inputValue;
    }, [value, inputValue]);

    return (
        <div className={rootClassName} ref={autoCompleteRef}>
            <input
                className={inputClassName}
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                value={finalInputValue}
                onChange={onChangeInput}
                onKeyDown={onKeyDown}
            />
        </div>
    );
});

AutoComplete.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onKeyenter: PropTypes.func,
};

export default AutoComplete;
