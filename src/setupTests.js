// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

//global mock for inlinesvg
jest.mock('react-inlinesvg', () => ({
    __esModule: true, // If the module uses ES module syntax
    default: () => <svg />, // Mocked SVG component
}));

//global mock to avoid warnings about width and height
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts')
    return ({
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => (
            <div style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
        ),
    })
});

jest.mock('react-canvas-confetti/dist/presets/realistic', () => ({
    __esModule: true, // If the module uses ES module syntax
    default: ({ className, ...props }) => 
    <div className={className}>
        Mocked Confetti
    </div>,
}));

jest.mock('react-toastify', () => {
    const toast = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };
  
    return { toast };
});