/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../src/components/Header.jsx';
import store from "../src/store.js";
import ItemCreatorModal from '../src/components/ItemCreatorModal.jsx';

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