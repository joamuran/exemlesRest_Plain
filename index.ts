
import { buildServer } from "./src/app/http/server";
const app = buildServer();
const port = 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
