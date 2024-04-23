import { app as serverEn } from './server/en-US/server.mjs';
import { app as serverUk } from './server/uk/server.mjs' 

const express = require('express'); 

function run() {
    const projectName = 'intro';   //or null
    const port = process.env.PORT || 4000;
    const server = express();

    const redirect = (req, res, next) => {
        const { headers, protocol } = req;
        res.redirect(`${protocol}://${headers.host}${projectName ? `/${projectName}` : ''}/en`);
    };

    if (projectName) {
        server.get(`/${projectName}`, redirect);
        server.use(`/${projectName}/uk`, serverUk('uk'));
        server.use(`/${projectName}/`, serverEn('en-US'));
        server.get('*', redirect);
    } else {
        server.get('/', redirect);
        server.use('/uk', serverUk('uk'));
        server.use('/', serverEn('en-US'));
        server.get('*', redirect);
    }

    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
} 

run();