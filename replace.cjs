const fs = require('fs')
const path = require('path')

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else if (file.endsWith('.css')) {
      results.push(file)
    }
  })
  return results
}

const cssFiles = walk('./src')
cssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  if (content.includes('text-transform: uppercase')) {
    content = content.replace(/text-transform:\s*uppercase/g, 'text-transform: capitalize')
    fs.writeFileSync(file, content)
    console.log('Updated:', file)
  }
})
