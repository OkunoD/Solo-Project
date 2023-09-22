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
    type: 'headwear',
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

describe('item Routes', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        const item = await new Item(itemPayload1);
        await item.save();
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
    
    describe('/api/items', () => {
        it('responds to get requests with 200 status and items', async () => {
            const res = await supertest(app).get('/api/items');
            // expect(res.statusCode).toBe(200);
            expect(res.statusCode).toBe(200);
            expect(res.body[0].name).toBe(itemPayload1.name);
        });
        it('responds to post requests with 200 status and item added', async () => {
            const res = await supertest(app).post('/api/items').send(itemPayload2);

            expect(res.statusCode).toBe(200);
            expect(res.text).toBe(`{\"message\":\"Item uploaded and saved.\"}`);
        });
    })

    describe('/api/items/:id', () => {
        it(`responds to get requests with 404 status and message 'Item not found' if item doesn't exist`, async () => {
            
            const res = await supertest(app).get(`/api/items/100`);
            
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe(`{\"message\":\"Item not found.\"}`);
        });
        it('responds to get requests with 200 status and requested item if it exists', async () => {

            const res = await supertest(app).get(`/api/items/${itemPayload1.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body[0].id).toBe(itemPayload1.id);
        });
        it(`responds to delete requests with 404 status and message 'Item not found' if item doesn't exist`, async () => {

            const res = await supertest(app).delete(`/api/items/100`);

            expect(res.statusCode).toBe(404);
            expect(res.text).toBe(`{\"message\":\"Item not found.\"}`);
        });
        it(`responds to delete requests with 200 status and message 'Item deleted' if item existed`, async () => {

            const res = await supertest(app).delete(`/api/items/170`);

            expect(res.statusCode).toBe(200);
            expect(res.text).toBe(`{\"message\":\"Item deleted successfully.\"}`);
        });
        
    })

})

describe('outfit routes', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        
        const outfit = await new Outfit(outfitPayload1);
        await outfit.save();
    })
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('/api/outfits', () => {
        it('responds to get requests with 200 status and outfits', async () => {
            const res = await supertest(app).get('/api/outfits');
    
            expect(res.statusCode).toBe(200);
            expect(res.body[0].name).toBe(outfitPayload1.name);
        })
        it(`responds to post requests with 200 status and message 'Outfit saved.`, async () => {
            const res = await supertest(app).post('/api/outfits').send(outfitPayload2);
    
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe(`{\"message\":\"Outfit saved.\"}`);
        })
    })
    describe('/api/outfits/:outfit_id', () => {
        it(`responds to delete requests with 200 status and message 'Outfit deleted successfully.`, async () => {
            const outfit = await supertest(app).get('/api/outfits');
            const outfit_id = outfit.body[0]._id;

            const res = await supertest(app).delete(`/api/outfits/${outfit_id}`);
    
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe(`{\"message\":\"Outfit deleted successfully.\"}`);
        })
        it(`responds to delete requests with 404 status and message 'Outfit not found.`, async () => {
            const nonExistentOutfit_id = 999999999999;

            const res = await supertest(app).delete(`/api/outfits/${nonExistentOutfit_id}`);
    
            expect(res.statusCode).toBe(404);
            expect(res.text).toBe(`{\"message\":\"Outfit not found.\"}`);
        })
    })
});