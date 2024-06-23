import fs from 'fs'
const readJSONFile = async (filePath) => {
  return await JSON.parse(fs.readFileSync(filePath))
}


export {
  readJSONFile
}
