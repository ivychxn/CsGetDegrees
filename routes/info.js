const express = require('express');
const router = express.Router();

// GET /info/colleges: {} => [ {uuid: string, name: string} ]
router.get('/colleges/', (req, res) => {
    let ucsd = { uuid: "ksdljfklds", name: "UC San Diego"}
    let sdsu = { uuid: "dskfjdskl", name: "SDSU"}
    let allUnis = [ucsd, sdsu]
    res.json(allUnis);
  });

// GET /info/colleges/{uuid}/majors: => { [{uuid: string, name: string}]}
router.get('/colleges/:uuid/majors', (req, res) => {
    const uuid = req.params.uuid;

    let major1 = { uuid: "alphasugmaligma", name: "cog sci" }
    let major2 = { uuid: "rydgfkj", name: "comp sci" }
    let allMajors = [ major1, major2 ]

    res.json(allMajors);
  });

// GET /info/colleges/{uuid}/minors: => { [{uuid: string, name: string}]}
router.get('/colleges/:uuid/minors', (req, res) => {
    const uuid = req.params.uuid;

    let minor1 = { uuid: "alphasugmaligma", name: "business" }
    let minor2 = { uuid: "rydgfkj", name: "raving" }
    let allMinors = [ minor1, minor2 ]

    res.json(allMinors);
  });

// GET /info/colleges/{uuid}/classes: {major: uuid, minor: uuid} => {[{uuid: string, name: string}]}
router.get('/colleges/:college_uuid/classes', (req, res) => {
    const collegeUUID = req.params.collegeUUID;
    const major = req.query.major;
    const minor = req.query.minor;


    let class1 = { uuid: "fdagergdf", name: "cse100" }
    let class2 = { uuid: "ukejf", name: "cat2" }
    let allClasses = [ class1, class2 ]
    res.json(allClasses);
  });

// GET /info/classes/{class_uuid}/ =>
// {title: string, code: string, quarters: [qtrs], prereqs: [uuid], postreqs: [uuid], classDesc: string, prereqDesc: string, reviews: {profName: string, percent: int}}
router.get('/classes/:class_uuid', (req, res) => {
    const classUUID = req.params.class_uuid;

    let obj = {title: "Advanced Data Structures", code: "CSE 100", quarters: [1,2,3], prereqs: ["jfkdsl"], postreqs: ["sdjf"],
    classDesc: "bst go brrrr", prereqDesc: "nani tf", reviews: [{profName: "GARY GILLESPIE", percent: 420}], input: { class: uuid }}

    res.json(obj);
  });

module.exports = router;