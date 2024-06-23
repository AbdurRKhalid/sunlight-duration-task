import express from 'express';
import {readJSONFile, findLongestDayLightDurationPlace} from "./utility/helper.js";

let app = express();

app.get('/longest-sunlight-locations', async (req, res) => {
  let response = {};
  let jsonData = await readJSONFile('./coding_challenge_locations.json');
  let dates = ['2024-01-01', '2024-04-01', '2024-07-01', '2024-11-01']
  for(let date of dates) {
    let result = await findLongestDayLightDurationPlace(jsonData, date);
    response[date] = result;
    console.log(result);
  }
  res.send(response);
})

let server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
