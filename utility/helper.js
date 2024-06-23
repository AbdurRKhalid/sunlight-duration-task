import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';
const readJSONFile = async (filePath) => {
  return await JSON.parse(fs.readFileSync(filePath))
}

const findLongestDayLightDurationPlace = async (locationsData, date) => {
  try {
    let processedLocations = [];
    const totalLocations = locationsData.length;
    let processedLocationsCount = 0;
    for (let location of locationsData) {
      const latitude = location.latitude;
      const longitude = location.longitude;
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date=${formattedDate}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      if (jsonData.results.sunrise != null && jsonData.results.sunset != null) {
        location.sunLightDurationMinutes = getSunlightDurationByMinutes(jsonData.results.sunrise, jsonData.results.sunset);
        processedLocations.push(location);
        processedLocationsCount++;
        console.log('Processed: ', processedLocationsCount);
      }
    }
    const sortedLocations = _.orderBy(processedLocations, ['sunLightDurationMinutes'], ['desc']);
    return sortedLocations[0];
  } catch (error) {
    throw new Error(error);
  }
}

const getSunlightDurationByMinutes = (sunrise, sunset) => {
  const formattedSunrise = moment(sunrise, 'hh:mm:ss A').format('HH:mm:ss');
  const formattedSunset = moment(sunset, 'hh:mm:ss A').format('HH:mm:ss');
  const duration = moment.duration(moment(formattedSunset, 'HH:mm:ss').diff(moment(formattedSunrise, 'HH:mm:ss')));
  return Math.abs(duration.asMinutes());
}


export {
  readJSONFile,
  findLongestDayLightDurationPlace
}
