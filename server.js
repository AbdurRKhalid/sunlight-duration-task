import express from 'express';
import {findLongestDayLightDurationPlace, readJSONFile} from "./utility/helper.js";

let app = express();

app.get('/longest-sunlight-locations', async (req, res) => {
  try {
    let response = {};
    const jsonData = await readJSONFile('./coding_challenge_locations.json');
    const dates = ['2024-01-01', '2024-04-01', '2024-07-01', '2024-11-01']
    for(const date of dates) {
      response[date] = await findLongestDayLightDurationPlace(jsonData, date);
    }
    res.send({
      message: 'Successfully processed the request.',
      status: 200,
      success: true,
      data: response
    });
  } catch (error) {
    res.send({
      message: 'Failed to process the request.',
      status: 500,
      success: false,
      error: error
    });
  }
});

app.get('/longest-sunlight-location/:date', async (req, res) => {
  try {
    let response = {};
    const jsonData = await readJSONFile('./coding_challenge_locations.json');
    const date = req.params.date;
    response[date] = await findLongestDayLightDurationPlace(jsonData, date);
    res.send({
      message: 'Successfully processed the request.',
      status: 200,
      success: true,
      data: response
    });
  } catch (error) {
    res.send({
      message: 'Failed to process the request.',
      status: 500,
      success: false,
      error: error
    });
  }
});

let server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
