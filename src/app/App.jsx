import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import injectSheet, { ThemeProvider, createUseStyles } from 'react-jss';
import Main from 'containers/Main';
import Detail from 'containers/Detail';
import theme from './theme';
import styles from './globalStyles';

const useStyles = createUseStyles(styles);

const App = memo(() => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes['music-player']}>
                <Router>
                    <Switch>
                        <Route path="/" component={Main} exact />
                        <Route path="/detail/:id" component={Detail} exact />
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    );
});

export default injectSheet(styles)(App);
