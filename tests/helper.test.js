import { findLongestDayLightDurationPlace } from '../utility/helper';

test('It should give us single result if we provide the coordinates of locations and date', async () => {
const locationsData = [
    {
      "latitude": 51.5074,
      "longitude": 0.1278
    },
    {
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  ]
  const date = '2024-01-01'
  const result = await findLongestDayLightDurationPlace(locationsData, date)
  expect(result).toHaveProperty('latitude')
  expect(result).toHaveProperty('longitude')
  expect(result).toHaveProperty('sunLightDurationMinutes')
})
