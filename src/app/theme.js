const COLORS = {
    white: '#ffffff',
    border: '#dce3eb',
    text: '#2d323c',
    blue: '#216db3',
    darkBlue: '#174a79',
    orange: '#e39031',
};

const COMMON_TEXT = {
    fontFamily: `Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    letterSpacing: '0.5px',
};

export default {
    text: {
        title: {
            ...COMMON_TEXT,
            fontSize: '24px',
            lineHeight: '24px',
            fontWeight: '500',
            color: COLORS.text,
        },
        subtitle: {
            ...COMMON_TEXT,
            fontSize: '20px',
            lineHeight: '20px',
            fontWeight: '400',
            color: COLORS.text,
        },
        default: {
            ...COMMON_TEXT,
            fontSize: '14px',
            lineHeight: '14px',
            fontWeight: '300',
            color: COLORS.text,
        },
        big: {
            ...COMMON_TEXT,
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '400',
            color: COLORS.text,
        },
    },
    colors: {
        ...COLORS,
    },
};
