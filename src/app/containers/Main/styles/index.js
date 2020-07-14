export default (theme) => ({
    main: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    title: {
        ...theme.text.title,
    },
    subtitle: {
        ...theme.text.subtitle,
        margin: '10px 0',
    },
    search: {
        width: '100%',
        margin: '10px 0',
    },
});
