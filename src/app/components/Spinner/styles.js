export default (theme) => ({
    spinner: {
        animation: '$rotate 2s linear infinite',
        zIndex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: `-50% 0 0 -50%`,

        '& .loader-spinner-path': {
            stroke: theme.colors.text,
            strokeLinecap: 'round',
            animation: '$dash 1.5s ease-in-out infinite',
        },
    },
    '@keyframes rotate': {
        '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes dash': {
        '0%': {
            strokeDasharray: '1, 150',
            strokeDashoffset: '0',
        },
        '50%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-35',
        },
        '100%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-124',
        },
    },
});
