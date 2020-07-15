export default {
    '@global': {
        html: {
            height: '100%',
            fontFamily: `Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif`,
        },
        body: {
            minHeight: '100%',
            height: '100%',
            fontFamily: `Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif`,
        },
        'input, label, select, button, textarea': {
            margin: 0,
            border: 0,
            padding: 0,
            whiteSpace: 'normal',
            background: 'none',
            lineHeight: 1,
        },
        'input:focus, audio': {
            outline: 0,
        },
        '#app': {
            height: '100%',
            backgroundColor: '#eeeeee',
        },
    },
    'music-player': {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        padding: '20px',
    },
};
