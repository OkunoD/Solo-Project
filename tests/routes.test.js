import request from 'supertest';
import express from 'express';
import router from '../routes/main.js';
import { 
        addItemController, 
        fillWardrobeController, 
        getItemController,
        deleteItemController,
        getOutfitsController,
        addOutfitController,
        deleteOutfitController,
    } from '../server/controllers'

const app = new express();
app.use('/',)