import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';
const readJSONFile = async (filePath) => {
  return await JSON.parse(fs.readFileSync(filePath))
}

const findLongestDayLightDurationPlace = async (locationsData, date) => {
  let processedLocations = [];
  let totalLocations = locationsData.length;
  let processedLocationsCount = 0;
  for (let location of locationsData) {
    let latitude = location.latitude;
    let longitude = location.longitude;
    let formattedDate = moment(date).format('YYYY-MM-DD');
    let url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date=${formattedDate}`;
    let response = await fetch(url);
    let jsonData = await response.json();
    if (jsonData.results.sunrise != null && jsonData.results.sunset != null) {
      location.sunLightDurationMinutes = getSunlightDurationByMinutes(jsonData.results.sunrise, jsonData.results.sunset);
      processedLocations.push(location);
      processedLocationsCount++;
      console.log('Processed: ', processedLocationsCount);
    }
  }
  let sortedLocations = _.orderBy(processedLocations, ['sunLightDurationMinutes'], ['desc']);
  return sortedLocations[0];
}

const getSunlightDurationByMinutes = (sunrise, sunset) => {
  let formattedSunrise = moment(sunrise, 'hh:mm:ss A').format('HH:mm:ss');
  let formattedSunset = moment(sunset, 'hh:mm:ss A').format('HH:mm:ss');
  let duration = moment.duration(moment(formattedSunset, 'HH:mm:ss').diff(moment(formattedSunrise, 'HH:mm:ss')));
  return Math.abs(duration.asMinutes());
}


export {
  readJSONFile,
  findLongestDayLightDurationPlace
}
