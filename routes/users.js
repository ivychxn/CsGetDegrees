const express = require('express');
const router = express.Router();
//const { getUserById } = require("../db");

// all requests are /users

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// GET /users/profile
router.get('/profile', async (req, res, next) => {
  // getting the user input
  const userId = req.query.user, user=req.query.user;
  // try {
  //   const user = await getUserById(userId);
  //   res.json(user);
  // } catch (error) {
  //   res.status(400);
  //   res.send("gg");
  // }

   let obj = {name: "Ivy Chan", university: "UC San Diego", major: "CE", minor: "Business", gradYear: 2022,
     classes: [
      {uuid: "0x0x0x3123", name: "CSE 100", year: 2020, quarter: "Spring"}
   ], input: { user: user }}
   res.json(obj);

});

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
  // {user: uuid, sectionUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string, sectionNotes: string}
  const {user, sectionUUID, sectionYear, sectionQuarter, sectionName, sectionNotes} = req.query;
  
  let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, sectionUUID, sectionYear, sectionQuarter, sectionName, sectionNotes}}
  res.json(obj);
});

// POST /user/editSection:
router.post('/editSection', (req, res, next) => {
  // {user: uuid, sectionUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string, sectionNotes: string}
  const {user, sectionUUID, sectionYear, sectionQuarter, sectionName, sectionNotes} = req.query;

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
