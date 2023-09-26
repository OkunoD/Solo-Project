/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as React from 'react';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "../src/store.js";
import { MemoryRouter } from 'react-router-dom';
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
                    <MemoryRouter initialEntries={['/']}>
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
        //

        const myClosetLogo = screen.getByTitle("my-closet-logo");
        expect(myClosetLogo).toBeVisible();

        const myOutfitContainer = screen.getByTestId("my-outfit-container");
        expect(myOutfitContainer).toBeVisible();

        const headwearDrawer = screen.getByTestId("headwear-drawer");
        const hat = screen.getByText("Blue Arcteryx Beanie");
        expect(headwearDrawer).toBeVisible();
        expect(headwearDrawer.contains(hat)).toBe(true);

        const topsDrawer = screen.getByTestId("tops-drawer");
        const top = screen.getByText("Patagonia LS");
        expect(topsDrawer).toBeVisible();
        expect(topsDrawer.contains(top)).toBe(true);


        const jacketsDrawer = screen.getByTestId("jackets-drawer");
        const jacket = screen.getByText("Grey Dri Duck Jacket");
        expect(jacketsDrawer).toBeVisible();
        expect(jacketsDrawer.contains(jacket)).toBe(true);

        const bottomsDrawer = screen.getByTestId("bottoms-drawer");
        const bottom = screen.getByText("Kapital Lumber Denim");
        expect(bottomsDrawer).toBeVisible();
        expect(bottomsDrawer.contains(bottom)).toBe(true);

        const shoesDrawer = screen.getByTestId("shoes-drawer");
        const shoes = screen.getByText("Gel Kayano 14");
        expect(shoesDrawer).toBeVisible();
        expect(shoesDrawer.contains(shoes)).toBe(true);

        const accessoriesDrawer = screen.getByTestId("accessories-drawer");
        const accessory = screen.getByText("Tiffany Solitaire Earrings");
        expect(accessoriesDrawer).toBeVisible();
        expect(accessoriesDrawer.contains(accessory)).toBe(true);
    })
})

