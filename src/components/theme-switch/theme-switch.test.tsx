import userEvent from "@testing-library/user-event";
import { AllowedThemes } from "../../store/preferences/preferences.types";
import { act, fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import ThemeSwitch from "./theme-switch";

describe('Theme switch component tests', () => {
    it.each([
        ['light' as AllowedThemes, false],
        ['dark' as AllowedThemes, true]
    ])('should display %s theme', async (theme, expected) => {
        renderWithProviders(<ThemeSwitch />, {
            preloadedState: {
                preferences: {
                    theme: theme
                }
            }
        });

        const checkbox: HTMLInputElement = await screen.findByTestId('theme-switcher-id');
        expect(checkbox.checked).toBe(expected);
    });

    it.each([
        ['light' as AllowedThemes, 'dark', true],
        ['dark' as AllowedThemes, 'light', false],
    ])('should change from %s to %s when clicking on the button', async (theme, newTheme, expected) => {
        const leftClick = { button: 0 };
        renderWithProviders(<ThemeSwitch />, {
            preloadedState: {
                preferences: {
                    theme: theme
                }
            }
        });

        const checkbox: HTMLInputElement = await screen.findByTestId('theme-switcher-id');
        expect(checkbox.checked).toBe(!expected);

        const button = (await screen.findAllByRole('button'))[1];
        
        userEvent.click(button, leftClick);
        await waitFor(() => {
            expect(checkbox.checked).toBe(expected);
        });
    })
});