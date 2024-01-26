import { app as serverEn } from './server/en-US/server.mjs';
import { app as serverUk } from './server/uk/server.mjs' 

const express = require('express');

// function run() { 
//     const port = process.env.PORT || 4000;
//     const server = express();

//     server.get(`/`, (req, res) => {
//         const { headers, protocol } = req;
//         res.redirect(`${protocol}://${headers.host}/en`);
//     });

//     server.use(`/en`, serverEn('en-US'));
//     server.use(`/uk`, serverUk('uk')); 

//     server.get('*', (req, res) => {
//         const { headers, protocol } = req;
//         res.redirect(`${protocol}://${headers.host}/en`);
//     });

//     server.listen(port, () => {
//         console.log(`Node Express server listening on http://localhost:${port}`);
//     });
// } 

function run() {
    const projectName = 'intro';
    const port = process.env.PORT || 4000;
    const server = express();

    server.get(`/${projectName}`, (req, res) => {
        const { headers, protocol } = req;
        res.redirect(`${protocol}://${headers.host}/${projectName}/en`);
    });

    server.use(`/${projectName}/en`, serverEn('en-US'));
    server.use(`/${projectName}/uk`, serverUk('uk')); 

    server.get('*', (req, res) => {
        const { headers, protocol } = req;
        res.redirect(`${protocol}://${headers.host}/${projectName}/en`);
    });

    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
} 

run();