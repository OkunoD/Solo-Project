/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import express from 'express';
import * as React from 'react';
import { act, render, fireEvent, screen, waitFor, prettyDOM } from '@testing-library/react';
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
export const itemPayload7 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 7,
    type: 'headwear',
    name: 'Brown Kapital Trucker',
    color: 'Brown',
    brand: 'Kapital',
    size: 'S',
}
export const itemPayload8 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 8,
    type: 'tops',
    name: 'Bape LS',
    color: 'White',
    brand: 'Bape',
    size: 'S',
}
export const itemPayload9 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 9,
    type: 'jackets',
    name: 'Purple Yeezy Hoodie',
    color: 'Purple',
    brand: 'Yeezy',
    size: 'S',
}
export const itemPayload10 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 10,
    type: 'bottoms',
    name: 'Black Levis Denim',
    color: 'Blue',
    brand: 'Levis',
    size: '28',
}
export const itemPayload11 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 11,
    type: 'shoes',
    name: 'White Sk8stas',
    color: 'White',
    brand: 'Bape',
    size: '7',
}
export const itemPayload12 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 12,
    type: 'accessories',
    name: 'Gold Cuban Chain',
    color: 'Gold',
    brand: 'Hermes',
    size: '1',
}
const fillWardrobeMockResponse = [
    itemPayload1,
    itemPayload2,
    itemPayload3,
    itemPayload4,
    itemPayload5,
    itemPayload6,
    itemPayload7,
    itemPayload8,
    itemPayload9,
    itemPayload10,
    itemPayload11,
    itemPayload12,
]
const outfitRefsMockResponse = [
    {"_id":"64fbbbb2dbde68cd8add844b","name":"party","outfit":[1,2,3,4,5,6],"__v":0},
    {"_id":"64fbbc70d6f69a8d593e0fc9","name":"fishing day","outfit":[7,8,9,10,11,12],"__v":0}
]

describe("OutfitContainer", () => {

    fetchMock.enableMocks();

    fetchMock.mockResponseOnce(JSON.stringify(outfitRefsMockResponse));
    fetchMock.mockResponseOnce(JSON.stringify(fillWardrobeMockResponse));

    fetchMock.mockResponseOnce(JSON.stringify(outfitRefsMockResponse));
    fetchMock.mockResponseOnce(JSON.stringify(fillWardrobeMockResponse));
    
    it('renders the outfits containers and their delete buttons', async () => {
        
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
        //  specifically the useEffect hook that sets imageSrc inside clothing cards,
        //  has time to register with react and trigger full rendering of components
        await waitFor(() => {
            const image = screen.getAllByAltText('Retrieved from state');
            expect(image).not.toBeUndefined();
        });

        const outfitContainer0 = screen.getByTestId("outfit-container-0");
        expect(outfitContainer0).toBeVisible();

        const outfitContainer1 = screen.getByTestId("outfit-container-1");
        expect(outfitContainer1).toBeVisible();

        const deleteOutfitButton0 = screen.getByTestId("delete-outfit-button-0");
        const deleteOutfitButton1 = screen.getByTestId("delete-outfit-button-1");

        expect(deleteOutfitButton0).toBeVisible();
        expect(deleteOutfitButton1).toBeVisible();
        expect(outfitContainer0.contains(deleteOutfitButton0)).toBe(true);
        expect(outfitContainer1.contains(deleteOutfitButton1)).toBe(true);
    })

    it('renders the correct name and items for each outfit', async () => {
        
        act(()=> { 
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/outfits']}>
                        <App />
                    </MemoryRouter>
                </Provider>
            )
        });
        
        await waitFor(() => {
            const image = screen.getAllByAltText('Retrieved from state');
            expect(image).not.toBeUndefined();
        });
        
        const outfitContainer0 = screen.getByTestId("outfit-container-0");
        expect(outfitContainer0).toBeVisible();

        const outfitContainer1 = screen.getByTestId("outfit-container-1");
        expect(outfitContainer1).toBeVisible();

        const outfit0Name = screen.getByText("party");
        const outfit0Hat = screen.getByText("Blue Arcteryx Beanie");
        const outfit0Top = screen.getByText("Patagonia LS");
        const outfit0Jacket = screen.getByText("Grey Dri Duck Jacket");
        const outfit0Bottom = screen.getByText("Kapital Lumber Denim");
        const outfit0Shoes = screen.getByText("Gel Kayano 14");
        const outfit0Accessory = screen.getByText("Tiffany Solitaire Earrings");
        expect(outfitContainer0.contains(outfit0Name)).toBe(true);
        expect(outfitContainer0.contains(outfit0Hat)).toBe(true);
        expect(outfitContainer0.contains(outfit0Top)).toBe(true);
        expect(outfitContainer0.contains(outfit0Jacket)).toBe(true);
        expect(outfitContainer0.contains(outfit0Bottom)).toBe(true);
        expect(outfitContainer0.contains(outfit0Shoes)).toBe(true);
        expect(outfitContainer0.contains(outfit0Accessory)).toBe(true);

        const outfit1Name = screen.getByText("fishing day");
        const outfit1Hat = screen.getByText("Brown Kapital Trucker");
        const outfit1Top = screen.getByText("Bape LS");
        const outfit1Jacket = screen.getByText("Purple Yeezy Hoodie");
        const outfit1Bottom = screen.getByText("Black Levis Denim");
        const outfit1Shoes = screen.getByText("White Sk8stas");
        const outfit1Accessory = screen.getByText("Gold Cuban Chain");
        expect(outfitContainer1.contains(outfit1Name)).toBe(true);
        expect(outfitContainer1.contains(outfit1Hat)).toBe(true);
        expect(outfitContainer1.contains(outfit1Top)).toBe(true);
        expect(outfitContainer1.contains(outfit1Jacket)).toBe(true);
        expect(outfitContainer1.contains(outfit1Bottom)).toBe(true);
        expect(outfitContainer1.contains(outfit1Shoes)).toBe(true);
        expect(outfitContainer1.contains(outfit1Accessory)).toBe(true);
    });
});
