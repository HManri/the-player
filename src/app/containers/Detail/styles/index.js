export default (theme) => ({
    detail: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    back: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        ...theme.text.default,
        fontSize: '24px',
        lineHeight: '24px',
        textDecoration: 'none',
        cursor: 'pointer',

        '& > svg': {
            display: 'block',
            width: '24px',
            marginRight: '10px',
        },
    },
    box: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        maxHeight: '100%',
        overflow: 'auto',
        padding: '20px',
        justifyContent: 'center',
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transfrom: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
    },
    'track-box': {
        border: `2px solid ${theme.colors.border}`,
    },
    'track-box-primary': {
        width: '60%',
    },
    'track-box-secondary': {
        width: '15%',
        margin: '0 5px',
        '&.search-music__detail__box__track-box--clickable': {
            cursor: 'pointer',
            '&:hover': {
                borderColor: theme.colors.orange,
                boxShadow: '5px 5px 16px 0px rgba(0, 0, 0, 0.75);',
            },
        },
    },
});
