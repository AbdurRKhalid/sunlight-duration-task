import express from 'express';
import {readJSONFile} from "./utility/helper.js";

let app = express();

app.get('/', async (req, res) => {
  const jsonData = await readJSONFile('./coding_challenge_locations.json');
  res.send(jsonData);
})

let server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
