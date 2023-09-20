import supertest from 'supertest';
import express from 'express';
import router from '../server/router.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Item, User, Outfit } from '../server/models'
import { 
        addItemController, 
        fillWardrobeController, 
        getItemController,
        deleteItemController,
        getOutfitsController,
        addOutfitController,
        deleteOutfitController,
    } from '../server/controllers'

export const itemPayload = {
    file: {type: 'Buffer', data: []},
    contentType:  'image/webp',
    id: 170,
    type: 'jackets',
    name: 'Grey Dri Duck Jacket',
    color: 'Grey',
    brand: 'Dri Duck',
    size: 'M',
}

const app = new express();
app.use('/', router);

describe('Routes', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());

        const item = await new Item(itemPayload);
        console.log(item);

        await item.save();
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
    
    describe('/api/items', () => {
        it('responds to get /api/items with 200 status and items', async () => {
            const res = await supertest(app).get('/api/items');
            // expect(res.statusCode).toBe(200);
            expect(res.statusCode).toBe(200);
            expect(res.body[0].name).toBe(itemPayload.name);
        })
    })
})