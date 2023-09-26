/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../src/components/Header.jsx';
import store from "../src/store.js";

describe('Header', () => {
    it('renders the closet logo and outfit, sign-up/in, and add-item buttons when in closet view', () => {
        render(<Header view={"myCloset"}/>);

        expect(screen.getByTitle('my-closet-logo')).toBeVisible();
        expect(screen.getByTitle('outfits-button')).toBeVisible();
        expect(screen.getByTitle('add-item-button')).toBeVisible();
        expect(screen.getByTitle('sign-in-button')).toBeVisible();
    });

    it('renders the outfits logo and closet, sign-up/in, and add-item buttons when in outfits view', () => {
        render(<Header view={"myOutfits"}/>);

        expect(screen.getByTitle('my-outfits-logo')).toBeVisible();
        expect(screen.getByTitle('closet-button')).toBeVisible();
        expect(screen.getByTitle('add-item-button')).toBeVisible();
        expect(screen.getByTitle('sign-in-button')).toBeVisible();
    });

    it('routes to the correct paths when the buttons are clicked in closet view', async () => {
        render(
            <Provider store={store}>
                <Header view={"myCloset"}/>
            </Provider>
            );

        const outfitsButton = screen.getByRole('link', { name: "O U T F I T S" });
        fireEvent.click(outfitsButton);
        expect(outfitsButton.getAttribute("href")).toMatchInlineSnapshot(`"/outfits"`);
        
        const loginButton = screen.getByRole('link', { name: "S I G N - U P / L O G I N" });
        fireEvent.click(loginButton);
        expect(loginButton.getAttribute("href")).toMatchInlineSnapshot(`"/auth/google"`);
        
        const logoutButton = screen.getByRole('link', { name: "S I G N O U T" });
        fireEvent.click(logoutButton);
        expect(logoutButton.getAttribute("href")).toMatchInlineSnapshot(`"/logout"`);

        const addItemButton = screen.getByTitle('add-item-button');
        fireEvent.click(addItemButton);
        expect(screen.getByText("ADD PIECE")).toBeVisible();
    });

    it('routes to the correct paths when the buttons are clicked in outfit view', async () => {
        render(
            <Provider store={store}>
                <Header view={"myOutfits"}/>
            </Provider>
            );

        const closetButton = screen.getByRole('link', { name: "C L O S E T" });
        fireEvent.click(closetButton);
        expect(closetButton.getAttribute("href")).toMatchInlineSnapshot(`"/"`);
        
        const loginButton = screen.getByRole('link', { name: "S I G N - U P / L O G I N" });
        fireEvent.click(loginButton);
        expect(loginButton.getAttribute("href")).toMatchInlineSnapshot(`"/auth/google"`);
        
        const logoutButton = screen.getByRole('link', { name: "S I G N O U T" });
        fireEvent.click(logoutButton);
        expect(logoutButton.getAttribute("href")).toMatchInlineSnapshot(`"/logout"`);
        
        const addItemButton = screen.getByTitle('add-item-button');
        fireEvent.click(addItemButton);
        expect(screen.getByText("ADD PIECE")).toBeVisible();
    });
});