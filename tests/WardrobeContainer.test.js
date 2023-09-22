/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import express from 'express';
import * as React from 'react';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../src/components/Header.jsx';
import { Item, User, Outfit } from '../server/models'
import store from "../src/store.js";
import router from '../server/router.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MemoryRouter } from 'react-router-dom';
import mongoose from 'mongoose';
import { 
        addItemController, 
        fillWardrobeController, 
        getItemController,
        deleteItemController,
        getOutfitsController,
        addOutfitController,
        deleteOutfitController,
    } from '../server/controllers.js'
import WardrobeContainer from '../src/containers/WardrobeContainer.jsx';
import App from '../src/components/App.js';

export const itemPayload1 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 170,
    type: 'headwear',
    name: 'Blue Arcteryx Beanie',
    color: 'Blue',
    brand: 'Arcteryx',
    size: 'S',
}
export const itemPayload2 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 171,
    type: 'tops',
    name: 'Patagonia LS',
    color: 'Black',
    brand: 'Patagonia',
    size: 'S',
}
export const itemPayload3 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 172,
    type: 'jackets',
    name: 'Grey Dri Duck Jacket',
    color: 'Grey',
    brand: 'Dri Duck',
    size: 'M',
}
export const itemPayload4 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 173,
    type: 'bottoms',
    name: 'Kapital Lumber Denim',
    color: 'Blue',
    brand: 'Kapital',
    size: '28',
}
export const itemPayload5 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 174,
    type: 'shoes',
    name: 'Gel Kayano 14',
    color: 'Pink',
    brand: 'Asics',
    size: '7',
}
export const itemPayload6 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 175,
    type: 'accessories',
    name: 'Tiffany Solitaire Earrings',
    color: 'Silver',
    brand: 'Tiffany',
    size: '1',
}
const fillWardrobeMockResponse = [
    itemPayload1,
    itemPayload2,
    itemPayload3,
    itemPayload4,
    itemPayload5,
    itemPayload6
]

describe("WardrobeContainer", () => {
    global.fetch = jest.fn();
    global.fetch.mockResolvedValue({
        json: () => Promise.resolve(fillWardrobeMockResponse),
    });

    it('renders all the drawers and places items in their correct drawers', async () => {
        act(()=> { 
            render(
                <Provider store={store}>
                    <App initialEntries={['/']}/>
                </Provider>
            )
        })

        //  below await waitFor() is to ensure async fill wardrobe actions,
        //  specifically useEffect hook that sets imageSrc inside clothing cards,
        //  has time to register with react and trigger full rendering of components
        await waitFor(() => {
            const image = screen.getAllByAltText('Retrieved from state');
            expect(image).not.toBeUndefined();
        });
        //

        const myClosetLogo = screen.getByTitle("my-closet-logo");
        expect(myClosetLogo).toBeVisible();

        const myOutfitContainer = screen.getByTestId("my-outfit-container");
        expect(myOutfitContainer).toBeVisible();

        const headwearDrawer = screen.getByTestId("headwear-drawer");
        expect(headwearDrawer).toBeVisible();

        const topsDrawer = screen.getByTestId("tops-drawer");
        expect(topsDrawer).toBeVisible();

        const jacketsDrawer = screen.getByTestId("jackets-drawer");
        expect(jacketsDrawer).toBeVisible();

        const bottomsDrawer = screen.getByTestId("bottoms-drawer");
        expect(bottomsDrawer).toBeVisible();

        const shoesDrawer = screen.getByTestId("shoes-drawer");
        expect(shoesDrawer).toBeVisible();

        const accessoriesDrawer = screen.getByTestId("accessosfdries-drawer");
        expect(accessoriesDrawer).toBeVisible();
        
    })
})

