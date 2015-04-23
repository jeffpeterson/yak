#!/usr/bin/env NODE_PATH=foo node

require("babel/register")({
  stage: 0
})

var minimist = require('minimist')
var path = require('path')
var fs = require('fs')

process.env.NODE_PATH += ['', __dirname, j(__dirname, 'node_modules'), ''].join(':')
require('module').Module._initPaths()

var cwd = process.cwd()
var opt = getOptions()
var action = opt._[0] || "watch"

require("./actions/" + action)(opt)

function getOptions() {
  var pkg = getPackageOptions()

  return minimist(process.argv.slice(2), {
    default: {
      port: pkg.port || 8080,
      in: pkg.in || 'index',
      out: pkg.out || 'bundle.js',
    }
  })
}

function getPackageOptions() {
  var pkgPath = j(cwd, 'package.json')
  var pkg = {}

  if (fs.existsSync(pkgPath)) {
    pkg = require(pkgPath)
  }

  return pkg.yak || {}
}

function j() {
  return path.join.apply(path, arguments)
}
