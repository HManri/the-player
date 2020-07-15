export default (theme) => ({
    'songs-row': {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: '10px',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.colors.border}`,
        },
    },
    'songs-row__title': {
        flexBasis: '20%',
        padding: '0 10px',
        ...theme.text.big,
        cursor: 'pointer',
        color: theme.colors.darkBlue,

        '& > a': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
    'songs-row__artist': {
        flexBasis: '20%',
        padding: '0 10px',
        ...theme.text.default,
    },
    'songs-row__album': {
        flexBasis: '20%',
        padding: '0 10px',
        ...theme.text.default,
    },
    'songs-row__thumb': {
        padding: '0 10px',
        textAlign: 'center',
        height: '60px',
        '& > img': {
            display: 'block',
        },
    },
    'songs-row__length': {
        flexBasis: '15%',
        padding: '0 10px',
        textAlign: 'center',
        ...theme.text.default,
    },
    'songs-row__genre': {
        flexBasis: '15%',
        padding: '0 10px',
        textAlign: 'center',
        ...theme.text.default,
    },
    'songs-row__price': {
        flexBasis: '10%',
        padding: '0 10px',
        textAlign: 'center',
        ...theme.text.default,
    },
    'songs-row--sort-clickable': {
        cursor: 'pointer',
        color: theme.colors.darkBlue,
    },
});
