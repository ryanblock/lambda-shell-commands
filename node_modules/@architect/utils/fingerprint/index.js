let chalk = require('chalk')
let config = require('./config')
let exec = require('child_process').exec
let fs = require('fs')
let glob = require('glob')
let mkdir = require('mkdirp').sync
let path = require('path')
let pathExists = fs.existsSync
let readArc = require('../read-arc')
let series = require('run-series')
let sha = require('sha')
let sort = require('path-sort')
let waterfall = require('run-waterfall')

function normalizePath(path) {
  // process.cwd() and path.join uses '\\' as a path delimiter on Windows
  // glob uses '/'
  return path.replace(/\\/g, '/')
}

module.exports = function fingerprint({fingerprint=false, ignore=[]}, callback) {
  let {arc} = readArc()
  let {static} = arc
  let publicDir = normalizePath(path.join(process.cwd(), 'public'))

  /**
   * Double check fingerprint status
   */
  if (!fingerprint && static) {
    fingerprint = config(arc).fingerprint
    ignore = config(arc).ignore

    // If @static is defined, create `public/` if it doesn't exist
    if (!pathExists(publicDir)) {mkdir(publicDir)}
  }

  let staticAssets = path.join(publicDir, '/**/*')
  let files
  let staticManifest = {}
  waterfall([
    /**
     * Early exit if disabled, clean up if necessary
     */
    function bail(callback) {
      if (fingerprint) callback()
      else {
        if (pathExists(path.join(publicDir, 'static.json'))) {
          let warn = chalk.yellow('Warning')
          let msg = chalk.white(`Found ${publicDir + path.sep}static.json file with fingerprinting disabled, deleting file`)
          console.log(`${warn} ${msg}`)
          exec('rm static.json', {cwd: publicDir}, (err, stdout, stderr) => {
            if (err) callback(err)
            else {
              if (stderr) {
                let msg = chalk.gray(`Error removing static.json file, please remove it manually or static asset calls may be broken`)
                console.log(`${warn} ${msg}`)
              }
              callback(Error('cancel'))
            }
          })
        }
        else callback(Error('cancel'))
      }
    },

    /**
     * Scan for files in the public directory
     */
    function globFiles(callback) {
      glob(staticAssets, {dot:true, nodir:true, follow:true}, callback)
    },

    /**
     * Filter based on default and user-specified ignore rules
     */
    function filterFiles(filesFound, callback) {
      // Always ignore these files
      ignore = ignore.concat([
        '.DS_Store',
        'node_modules',
        'readme.md',
        'static.json', // Ignored here, but uploaded later
      ])

      // Find non-ignored files and sort for readability
      files = filesFound.filter(file => !ignore.some(i => file.includes(i)))
      files = sort(files)

      if (!files.length) {
        callback(Error('no_files_found'))
      }
      else callback()
    },

    /**
     * Write (or remove) fingerprinted static asset manifest
     */
    function writeStaticManifest(callback) {
      // Hash those files
      let hashFiles = files.map(file => {
        return (callback) => {
          sha.get(file, function done(err, hash) {
            if (err) callback(err)
            else {
              hash = hash.substr(0,10)
              let extName = path.extname(file)
              let baseName = path.basename(file)
              let hashedName = baseName.replace(extName, '') + `-${hash}${extName}`
              let dirName = path.dirname(file).replace(publicDir, '').substr(1)
              let staticKey = `${dirName ? `${dirName}/` : ''}${baseName}`
              let staticValue = `${dirName ? `${dirName}/` : ''}${hashedName}`
              // Target shape: {'foo/bar.jpg': 'foo/bar-6bf1794b4c.jpg'}
              staticManifest[staticKey] = staticValue
              callback()
            }
          })
        }
      })
      series(hashFiles, function done(err) {
        if (err) callback(err)
        else {
          // Write out public/static.json
          fs.writeFile(path.join(publicDir, 'static.json'), JSON.stringify(staticManifest, null, 2), callback)
        }
      })
    },
  ],
  function done(err) {
    if (err && err.message === 'no_files_found') {
      let msg = chalk.gray('No static assets found to fingerprint from public' + path.sep)
      console.log(msg)
      callback()
    }
    if (err && err.message === 'cancel') {
      callback()
    }
    else if (err) {
      callback(err, staticManifest)
    }
    else callback(null, staticManifest)
  })
}

module.exports.config = config
