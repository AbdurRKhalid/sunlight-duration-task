# Sunlight or Daylight Calculations

## Introduction
This is a simple Node.JS Rest API that returns the information such as longitude, latitude, and sunlight light duration in minutes.

## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. The server will be running on `http://localhost:3000`

**_NOTE:_** This project uses node version 20.

## Steps to calculate the sunlight duration
1. Load the data related to locations from provided file.
2. For each location and date, use the ``https://sunrisesunset.io/api/`` API to get the sunrise and sunset timings.
3. Convert the sunrise and sunset timings to 24 hours format, to make it easier to calculate the duration.
4. Calculate the sunlight duration by subtracting the sunrise time from the sunset time.
5. Store the location, latitude, longitude, and sunlight duration in an array.
6. Sort the array based on the sunlight duration in descending order.
7. Return the top 1 location with the maximum sunlight duration in minutes, for each date.

## Endpoints
1. `/longest-sunlight-locations` - This endpoint returns the date with information of the place which have maximum sunlight duration.
    As there are 4 dates so in response there will be 4 dates with respective objects.
    - Method: `GET`
    - Example: `http://localhost:3000/longest-sunlight-locations`
2. `/longest-sunlight-location/:date` - This endpoint returns the information of the place which have maximum sunlight duration on the date metnioed in the URL.
    - Method: `GET`
    - Params: `date` - Date in `YYYY-MM-DD` format
    - Example: `http://localhost:3000/longest-sunlight-location/2024-03-23`

## Testing
A Single unit test has been added to make sure that the core functionality is working as expected.
1. Run `npm test`
2. This will run the test cases and show the results.
3. The test cases are written using `jest` library.

## DevOps
1. GitHub Actions has been added to run the test cases on every push to the repository. 🚀📂
2. Containerization has been done using Docker. 🐳📦
3. Added unit test cases to make sure the core functionality is working as expected. 🧪✅

## Time Complexity
1. The time complexity of the algorithm is *_O(n * m)_* where n is the number of locations and m is the number of dates.
