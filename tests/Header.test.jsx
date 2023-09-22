/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import express from 'express';
import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../src/components/Header.jsx';
import store from "../src/store.js";
import router from '../server/router.js';

// import { 
//         addItemController, 
//         fillWardrobeController, 
//         getItemController,
//         deleteItemController,
//         getOutfitsController,
//         addOutfitController,
//         deleteOutfitController,
//     } from '../server/controllers.js'

// export const itemPayload1 = {
//     file: {type: 'Buffer', data: []},
//     contentType:  'image/webp',
//     id: 170,
//     type: 'jackets',
//     name: 'Grey Dri Duck Jacket',
//     color: 'Grey',
//     brand: 'Dri Duck',
//     size: 'M',
// }
// export const itemPayload2 = {
//     file: {type: 'Buffer', data: []},
//     contentType:  'image/webp',
//     id: 171,
//     type: 'hats',
//     name: 'Blue Arcteryx Beanie',
//     color: 'Blue',
//     brand: 'Arcteryx',
//     size: 'S',
// }
// export const outfitPayload1 = {
//     name: 'saturday party',
//     outfit: [1,2,3,4,5,6],
// }
// export const outfitPayload2 = {
//     name: 'fishing day',
//     outfit: [6,5,4,3,2,1],
// }

const app = new express();
app.use('/', router);

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

        const outfitsButton = screen.getByRole('link', { name: "C L O S E T" });
        fireEvent.click(outfitsButton);
        expect(outfitsButton.getAttribute("href")).toMatchInlineSnapshot(`"/"`);
        
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