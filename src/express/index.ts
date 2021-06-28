import express from 'express';

export default (port: number): Promise<void> => {
    return new Promise((resolve) => {
        const app = express();

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        app.listen(port, resolve);
    });
};
