export default (theme) => ({
    'songs-table': {
        position: 'relative',
        height: '100%',
        overflow: 'auto',
        backgroundColor: theme.colors.white,
    },
    'no-search': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        ...theme.text.subtitle,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transfrom: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
    },
    'no-results': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        ...theme.text.subtitle,
    },
});
