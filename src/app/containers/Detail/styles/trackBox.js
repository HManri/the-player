export default (theme) => ({
    content: {
        padding: '10px',
        backgroundColor: theme.colors.white,
        display: 'flex',
        flexDirection: 'column',
    },
    'content-image': {
        height: '100px',
        marginBottom: '10px',
        '& > img': {
            width: '100px',
        },

        '&.secondary': {
            height: '60px',

            '& > img': {
                width: '60px',
            },
        },
    },
    'content-title': {
        ...theme.text.title,
        marginBottom: '10px',

        '&.secondary': {
            fontSize: '16px',
            lineHeight: '16px',
        },
    },
    'content-subtitle': {
        ...theme.text.subtitle,

        '&.secondary': {
            fontSize: '14px',
            lineHeight: '14px',
        },
    },
});
