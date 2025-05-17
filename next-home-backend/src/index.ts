import config from "./config/index.js";
import loaders from "./loaders/index.js";

const app = await loaders()

app.listen(config.port, () => {
    console.log(`Server has started at http://localhost:${config.port}`);
});