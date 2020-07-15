export default (theme) => ({
    controls: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        // justifyContent: 'space-between',
    },
    'player-controls': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: '1',
    },
    'social-media': {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        // flexGrow: '1',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        height: '35px',

        '& .search-music__detail__box__content__controls__social-media__twitter': {
            width: '80px',
            marginTop: '1px',
            marginRight: '10px',
        },
        '& .search-music__detail__box__content__controls__social-media__whatsapp': {
            width: '25px',
        },
    },
    button: {
        width: '25px',
        height: '25px',
        border: `2px solid ${theme.colors.border}`,
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        outline: 0,
        '&:hover': {
            borderColor: theme.colors.orange,
        },
    },
    'button--disabled': {
        cursor: 'not-allowed',
        '&:hover': {
            borderColor: theme.colors.border,
        },
    },
    'controls-play-pause': {
        width: '50px',
        height: '50px',
        margin: '0 10px',
    },
    'controls-previous': {},
    'controls-next': {},
});
