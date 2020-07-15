import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { mainReducer } from 'reducers';

const persistConfig = {
    key: 'music_player',
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export default function configureStore() {
    const store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(thunk),
            process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f,
        ),
    );
    const persistor = persistStore(store);
    return { store, persistor };
}
