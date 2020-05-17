const express = require('express');
const router = express.Router();
const db = require("../db");

// all requests are /users

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/profile', async (req, res) => {
  const userId = req.query.user;
  //text on chat if u need anything i just sorta have to think in silence oops
  // get all params required to make a user @ivy
  // POST {user: uuid, college: uuid, major: uuid, minor: uuid, gradYear: int} =>
  const {college, major, minor, gradYear} = req.query;

  // {error: string, success: bool}
  try {
    await db.createUser(userId, college, major, minor, gradYear);
    res.status(200);
    res.send("yeet")
  } catch(err) {
    console.log(err) // log the error
    res.status(500);
    res.send(err)
  }
})

// GET /users/profile
router.get('/profile', async (req, res, next) => {
  // getting the user input
  const userId = req.query.user;
  console.log(userId)
  try {
    const user = await db.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.send("gg");
  }
});

// POST /users/setMajor: {user: uuid, major: uuid} => {error: string, uuid: string}
router.post('/setMajor', async (req, res, next) => {
  const user = req.query.user;
  const major = req.query.major;

  try {
    await db.setUserMajor(user, major);
    res.json({
      error: "",
      uuid: major
    });
  } catch(error) {
    res.status(400)
    res.json({
      error: error,
      uuid: ""
    });
  }  
});

// POST /users/setMinor: {user: uuid, minor: uuid} => {error: string, uuid: string}
router.post('/setMinor', async (req, res, next) => {
  const user = req.query.user;
  const minor = req.query.minor;

  try {
    await db.setUserMinor(user, minor);
    res.json({
      error: "",
      uuid: minor
    });
  } catch(error) {
    res.status(400)
    res.json({
      error: JSON.stringify(error),
      uuid: major
    });
  }  
});

// POST /users/addClass:
router.post('/addClass', async (req, res, next) => {
  // {user: uuid, classUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string, sectionNotes: string}
  const {user, classUUID, sectionYear, sectionQuarter, sectionName, sectionNotes} = req.query;
  try {
    await db.addClass(user, classUUID, sectionYear, sectionQuarter, sectionName, sectionNotes);
    res.json({
      error: "",
      status: "success"
    })
  } catch(error ) {
    res.status(400);
    res.json({
      error: error
    })
  }
  let obj = {error: "", uuid: "AlphaChiMu", input: {user: user, sectionUUID, sectionYear, sectionQuarter, sectionName, sectionNotes}}
  res.json(obj);
});

// POST /user/editClass:
router.post('/editClass', async (req, res, next) => {
  // {user: uuid, sectionUUID: string, sectionYear: number, sectionQuarter: number, sectionName: string, sectionNotes: string}
  const {user, classUUID, sectionYear, sectionQuarter, sectionName} = req.query;

  try {
    await db.editClass(user, classUUID, sectionYear, sectionQuarter, sectionName)
    res.status(200);
    res.json({success: true})
  } catch(e) {
    res.status(400);
    res.json(e)
  }
});

// POST /user/removeClass: {user: uuid, classUUID: uuid} => {error: string, success: bool}
router.post('/removeClass', async (req, res, next) => {
  const user = req.query.user;
  const classUUID = req.query.classUUID;

  try {
    await db.removeClass(user, classUUID);
    res.status(200);
    res.json({success: true})
  } catch(error) {
    res.status(400);
    res.json(error);
  }
});

module.exports = router;
