import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputSearch from '.';
import { ThemeProvider } from 'react-jss';
import theme from '../../theme';

describe('InputSearch', () => {
    test('should render an input', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <InputSearch className="input-search" placeholder="Search" value="foo" />
            </ThemeProvider>,
        );
        expect(container.firstChild.getAttribute('class')).toContain('input-search');
        expect(container.querySelector('input')).not.toBe(null);
        expect(container.querySelector('input').getAttribute('placeholder')).toBe('Search');
        expect(container.querySelector('input').value).toBe('foo');
    });

    test('should change its value', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <InputSearch />
            </ThemeProvider>,
        );
        const htmlInput = container.querySelector('input');
        fireEvent.change(htmlInput, { target: { value: 'foo' } });
        expect(htmlInput.value).toBe('foo');
    });

    test('should call search function', () => {
        const mockFunction = jest.fn();
        const { container } = render(
            <ThemeProvider theme={theme}>
                <InputSearch onKeyEnter={mockFunction} />
            </ThemeProvider>,
        );
        const htmlInput = container.querySelector('input');
        fireEvent.keyDown(htmlInput, { key: 'Enter', code: 'Enter', keyCode: 13 });
        expect(mockFunction).toBeCalled();
    });
});
