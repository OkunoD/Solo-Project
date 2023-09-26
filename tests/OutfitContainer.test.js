/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import express from 'express';
import * as React from 'react';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../src/components/Header.jsx';
import { Item, User, Outfit } from '../server/models.js'
import store from "../src/store.js";
import router from '../server/router.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
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
import OutfitContainer from '../src/containers/OutfitContainer.jsx';

export const itemPayload1 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 1,
    type: 'headwear',
    name: 'Blue Arcteryx Beanie',
    color: 'Blue',
    brand: 'Arcteryx',
    size: 'S',
}
export const itemPayload2 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 2,
    type: 'tops',
    name: 'Patagonia LS',
    color: 'Black',
    brand: 'Patagonia',
    size: 'S',
}
export const itemPayload3 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 3,
    type: 'jackets',
    name: 'Grey Dri Duck Jacket',
    color: 'Grey',
    brand: 'Dri Duck',
    size: 'M',
}
export const itemPayload4 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 4,
    type: 'bottoms',
    name: 'Kapital Lumber Denim',
    color: 'Blue',
    brand: 'Kapital',
    size: '28',
}
export const itemPayload5 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 5,
    type: 'shoes',
    name: 'Gel Kayano 14',
    color: 'Pink',
    brand: 'Asics',
    size: '7',
}
export const itemPayload6 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 6,
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

const outfitRefsMockResponse = [
    {"_id":"64fbbbb2dbde68cd8add844b","name":"party","outfit":[1,2,3,4,5,6],"__v":0},
    {"_id":"64fbbc70d6f69a8d593e0fc9","name":"fishing day","outfit":[1,2,3,4,5,6],"__v":0}
]

describe("OutfitContainer", () => {

    fetchMock.enableMocks();

    fetchMock.mockResponseOnce(JSON.stringify(outfitRefsMockResponse));
    fetchMock.mockResponseOnce(JSON.stringify(fillWardrobeMockResponse));


    // global.fetch = jest.fn();
    // global.fetch.mockResolvedValue({
    //     json: () => Promise.resolve(outfitRefsMockResponse),
    // });

    it('renders the outfits containers', async () => {
        act(()=> { 
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/outfits']}>
                        <App />
                    </MemoryRouter>
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


        const outfitContainer = screen.getByTestId("outfit-container-1");
        expect(outfitContainer).toBeVisible();

    })
})

