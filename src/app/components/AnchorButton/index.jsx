import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const AnchorButton = memo(({ className, anchor, children }) => {
    const finalClassName = classnames('anchor-button', className);
    return (
        <Fragment>
            {anchor && (
                <Link to={anchor} className={finalClassName}>
                    {children}
                </Link>
            )}
            {!anchor && <div className={finalClassName}>{children}</div>}
        </Fragment>
    );
});

AnchorButton.propTypes = {
    className: PropTypes.string,
    anchor: PropTypes.string,
    children: PropTypes.element,
};

export default AnchorButton;
