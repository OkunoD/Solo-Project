import supertest from 'supertest';
import express from 'express';
import router from '../server/router.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Item, User, Outfit } from '../server/models.js'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { 
        addItemController, 
        fillWardrobeController, 
        getItemController,
        deleteItemController,
        getOutfitsController,
        addOutfitController,
        deleteOutfitController,
    } from '../server/controllers.js'

export const itemPayload1 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 170,
    type: 'jackets',
    name: 'Grey Dri Duck Jacket',
    color: 'Grey',
    brand: 'Dri Duck',
    size: 'M',
}
export const itemPayload2 = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 171,
    type: 'hats',
    name: 'Blue Arcteryx Beanie',
    color: 'Blue',
    brand: 'Arcteryx',
    size: 'S',
}
export const outfitPayload1 = {
    name: 'saturday party',
    outfit: [1,2,3,4,5,6],
}
export const outfitPayload2 = {
    name: 'fishing day',
    outfit: [6,5,4,3,2,1],
}

const app = new express();
app.use('/', router);

describe('itemCreator module', () => {
    it('random test', ()=> {
        expect(2).toEqual(2);
    })
})