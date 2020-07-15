export default (theme) => ({
    'auto-complete': {
        position: 'relative',
        width: '100%',
    },
    input: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: theme.colors.white,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '3px',
        width: '100%',
        padding: '0 10px',
        ...theme.text.big,
        lineHeight: '30px',
    },
});
