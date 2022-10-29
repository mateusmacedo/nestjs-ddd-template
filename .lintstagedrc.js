const path = require('path')

const filenameValidator = filename => {
  const handler = [
    () => filename.startsWith('.')
  ].filter(result => result() === false)
  return handler.length > 0
}

const checkFiles = filenames => filenames
    .map((f) => {
      const filename = path.relative(process.cwd(), f)
      if(filenameValidator(filename))
        return filename
    }).filter(function(x) {
      return x !== undefined;
 })

const buildEslintCommand = (filenames) =>
{
  const files = checkFiles(filenames)
  if(files?.length > 0){
    return `npm run lint:staged ${files
      .map((f) => path.relative(process.cwd(), f)).join(' ')}`
  }
  return 'echo "No files to lint"'
}
const buildTestCommand = (filenames) =>
{
  const files = checkFiles(filenames)
  if(files?.length > 0){
    return `npm run test:staged ${files
      .map((f) => path.relative(process.cwd(), f)).join(' ')}`
  }
    return 'echo "No files to test"'
    
}

const commands = []

if(buildTestCommand){
  commands.push(buildTestCommand)
}

if(buildEslintCommand){
  commands.push(buildEslintCommand)
}

module.exports = {
  '*.{js,jsx,ts,tsx}': commands,
}
