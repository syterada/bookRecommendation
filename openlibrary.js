const express = require('express');
const router = express.Router();
const Redis = require('ioredis');
const redis = new Redis();
const io = require('socket.io-client');
const {json} = require("express/lib/response");

router.post('/', async (req, res, next) => {
    //get books listing from openlibrary.org
    //check cache
    //
    try {
        const data = req.body;
        const author = data.author
        console.log(data);
        let cachedData = await redis.lrange(author, 0, -1)
        if (cachedData.length > 0) {
            const randomIndex = Math.floor(Math.random() * cachedData.length);
            let book = cachedData[randomIndex];
            console.log(`Cached: ${book}`);
            res.json(book)
        }else {
            let authorID = await fetch('https://openlibrary.org/search/authors.json?q=' + author)
            let parsedIDData = await authorID.json();
            let author_key = parsedIDData.docs[0].key;
            let authorBooks = await fetch('https://openlibrary.org/authors/' + author_key + '/works.json')
            let parsedData = await authorBooks.json();
            console.table(`Live temp: ${parsedData}`);
            let entries = parsedData.entries;
            let booksList = [];
            for (let i = 0; i < Math.min(8, entries.length); i++) {
                booksList.push(entries[i].title);
            }
            console.log(booksList)
            console.log(JSON.stringify(booksList))
            let response = await redis.lpush(author, ...booksList).then(() => {
                    console.log('titleList cached in Redis as a list');
                });
            //io.emit('title',title)
            res.json(booksList[0]);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})
module.exports = router; //the export makes router visible to any file that require()s it