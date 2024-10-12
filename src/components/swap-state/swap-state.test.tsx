import { act } from 'react';
import { renderWithProviders } from '../../utils/test-utils';
import SwapState from './swap-state.component';



describe('Swap state component tests', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('it should mount', () => {
    const {container} = renderWithProviders(<SwapState />);
    
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('div.flex.items-start.relative')).toBeInTheDocument();
  });

  test('it should display animation for 3 seconds', async () => {
    jest.useFakeTimers();
    const {container} = renderWithProviders(<SwapState hasCompletedAnimation={true} state={true}/>);

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.absolute.top-0.left-0')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.absolute.top-0.left-0')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.absolute.top-0.left-0')).not.toBeInTheDocument();
  });

  it.each([
    [{hasCompletedAnimation: false, state: true}],
    [{hasCompletedAnimation: true, state: false}]
  ])('it should not display animation when %s', ({ hasCompletedAnimation, state }) => {
    jest.useFakeTimers();
    const {container} = renderWithProviders(<SwapState hasCompletedAnimation={hasCompletedAnimation} state={state}/>);

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.absolute.top-0.left-0')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.absolute.top-0.left-0')).not.toBeInTheDocument();
  });

  it.each([
    [{hasCompletedAnimation: false, state: true}, true],
    [{hasCompletedAnimation: true, state: true}, true],
    [{hasCompletedAnimation: false, state: false}, false],
    [{hasCompletedAnimation: true, state: false}, false],
  ])('should display correct checked state on checkbox when %s, expected value %s',({ hasCompletedAnimation, state }, expected) => {
    const {container} = renderWithProviders(<SwapState hasCompletedAnimation={hasCompletedAnimation} state={state}/>);

    // eslint-disable-next-line testing-library/no-container
    const inputValue = container.querySelector<HTMLInputElement>('label.swap > input[type="checkbox"]');

    expect(inputValue).not.toBeNull();
    expect(inputValue!.checked).toBe(expected);
  });
});