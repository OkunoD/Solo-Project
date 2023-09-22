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
import ItemCreatorModal from '../src/components/ItemCreatorModal.jsx';

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

// const app = new express();
// app.use('/', router);

describe('itemCreator module', () => {
    it('renders properly', ()=> {
        render(
            <Provider store={store}>
                <ItemCreatorModal />
            </Provider>
        )

        expect(screen.getByText("ADD PIECE")).toBeVisible();

        const categoryDropdown = screen.getByTestId("category-select-list");
        expect(categoryDropdown).toBeVisible();

        const colorDropdown = screen.getByTestId("color-select-list");
        expect(colorDropdown).toBeVisible();

        const sizeDropdown = screen.getByTestId("size-select-list");
        expect(sizeDropdown).toBeVisible();

        const submitButton = screen.getByTestId("submit-item-button");
        expect(submitButton).toBeVisible();

        const closeButton = screen.getByTestId("close-modal-button");
        expect(closeButton).toBeVisible();
    });

    it('renders close button that closes modal when clicked', () => {
        render(
            <Provider store={store}>
                <Header view={"myOutfits"}/>
            </Provider>
        )

        const addItemButton = screen.getByTitle('add-item-button');
        fireEvent.click(addItemButton);
        const closeModalButton = screen.getByTestId("close-modal-button");

        expect(screen.getByText("ADD PIECE")).toBeVisible();
        expect(closeModalButton).toBeVisible();

        fireEvent.click(closeModalButton);

        const hiddenElement = screen.queryByText("ADD PIECE");
        expect(hiddenElement).not.toBeInTheDocument();
    })
    it(`closes when "ADD ITEM" button is clicked for the second time`, () => {
        render(
            <Provider store={store}>
                <Header view={"myOutfits"}/>
            </Provider>
        )

        const addItemButton = screen.getByTitle('add-item-button');
        fireEvent.click(addItemButton);
        expect(screen.getByText("ADD PIECE")).toBeVisible();

        fireEvent.click(addItemButton);

        const hiddenElement = screen.queryByText("ADD PIECE");
        expect(hiddenElement).not.toBeInTheDocument();
    })
});