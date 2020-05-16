const express = require('express');
const router = express.Router();
// all requests are /users

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// GET /users/profile
router.get('/profile', (req, res, next) => {
  const user = req.query.user;
  
  
  let obj = {name: "Ivy Chan", university: "UC San Diego", major: "CE", minor: "Business", gradYear: 2022,
    classes: [
     {uuid: "0x0x0x3123", name: "CSE 100", year: 2020, quarter: "Spring"}
  ], input: { user: user }}

  // const {major, minor} = obj;
  // const major = obj.major, minor = obj.minor
  // const minor = obj.minor

  res.json(obj);

});

//1 - parse input
//2 - add input key to obj that contains the input

// POST /users/setMajor: {user: uuid, major: uuid} => {error: string, uuid: string}
router.post('/setMajor', (req, res, next) => {
  const user = req.query.user;
  const major = req.query.major;

  let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, major:major}}
  

  res.json(obj);
});

// POST /users/setMinor: {user: uuid, minor: uuid} => {error: string, uuid: string}
router.post('/setMinor', (req, res, next) => {
  const user = req.query.user;
  const majminoror = req.query.minor;

  let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, minor:minor}}
  

  res.json(obj);
});

// POST /users/addSection:
router.post('/addSection', (req, res, next) => {
// {user: uuid, sectionUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string} => {error: string, uuid: string}
const {user, sectionUUID, sectionYear, sectionQuarter, sectionName} = req.query;
  
  let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, sectionUUID, sectionYear, sectionQuarter, sectionName}}
  res.json(obj);
});

// POST /user/editSection:
router.post('/editSection', (req, res, next) => {
// {user: uuid, sectionUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string} => {error: string, uuid: string}
const {user, sectionUUID, sectionYear, sectionQuarter, sectionName} = req.query;

let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, sectionUUID, sectionYear, sectionQuarter, sectionName}}
  res.json(obj);
});

// POST /user/removeSection: {user: uuid, section: uuid} => {error: string, success: bool}
router.post('/removeSection', (req, res, next) => {
  const user = req.query.user;
  const section = req.query.section;

  let obj = {error: "", success: 1, input: {user: user, section: section}}
  res.json(obj);
});

module.exports = router;
