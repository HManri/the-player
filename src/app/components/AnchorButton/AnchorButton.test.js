import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router } from 'react-router-dom';
import AnchorButton from '.';

describe('AnchorButton', () => {
    test('should render children', () => {
        const { getByText } = render(
            <AnchorButton className="anchor-button-test">
                <span>This is a test component</span>
            </AnchorButton>,
        );

        expect(getByText(/This is a test component/i)).toBeInTheDocument();
    });

    test('should render button without anchor', () => {
        const { container } = render(
            <AnchorButton className="anchor-button-test">
                <span>This is a test component</span>
            </AnchorButton>,
        );

        expect(container.querySelector('a')).toBe(null);
        expect(container.querySelector('div')).not.toBe(null);
        expect(container.querySelector('div').getAttribute('class')).toContain(
            'anchor-button-test',
        );
    });

    test('should render an anchor', () => {
        const { container } = render(
            <Router>
                <AnchorButton className="anchor-button-test" anchor={`/detail/1234`}>
                    <span>Click</span>
                </AnchorButton>
                ,
            </Router>,
        );
        expect(container.querySelector('a')).not.toBe(null);
        expect(container.querySelector('div')).toBe(null);
        expect(container.querySelector('a').getAttribute('href')).toBe(`#/detail/1234`);
    });
});
