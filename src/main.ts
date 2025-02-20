import { app } from './app.ts';


const main = () => {
    const n = app(5);
    console.log('main n', n);
}

main();