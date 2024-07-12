const fse = require('fs-extra');
require('events').EventEmitter.defaultMaxListeners = 100;

const PROXY_CONFIG = {
  "/codegen": {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/attendance-leave": {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/appraisal": {
    "target": "http://192.168.0.170:8080",
    "secure": false
  },
  "/api": {
    "target": "http://pulse.codegen.net/Pulse2",
    "secure": false
  },
  "/greeting": {
    "target": "ws://192.168.3.117:8081",
    "secure": false
  },
  "/issue-letter" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/facility-request" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/OPD-request" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/seat-plan" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/project-dashboard" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/knowledge-graph" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/kriyo-resource-allocation" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/kriyo-work-from-home" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false,
  },
  "/feedback/*" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/face-rec-attendance": {
    "target": "http://192.168.0.170:8080",
    "secure": false,
  },
  "/overview": {
    "target": "http://192.168.0.170:8080",
    "secure": false
  },
  "/recruitment-new" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/rnr" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/kpi" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/employee-service" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false,
  },
  "/head-count-db": {
    "target": "http://192.168.0.170:8080",
    "secure": false
  },
  "/jobsrunner" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  },
  "/new-kriyo-resource-allocation" : {
    "target" : "http://192.168.0.170:8080",
    "secure": false
  }
}

module.exports = PROXY_CONFIG;
