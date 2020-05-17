const csv = require('csvtojson')
let data = {};

module.exports.init = async () => {
    console.log("reading")
    data = await csv().fromFile("./cs.csv");
    for (let item of data) {
        let quarters = [];
        if (item['Fall']) {
            quarters.push(1);
        }
        if (item['Winter']) {
            quarters.push(2);
        }
        if (item['Spring']) {
            quarters.push(3);
        }
        if (item['SS1']) {
            quarters.push(4);
        }
        if (item['SS2']) {
            quarters.push(5);
        }
        item.quarters = quarters;
    }
    return data;
}

module.exports.getAllClasses = () => {
    return data.map(item => {
        return {
            uuid: item["Class Id"],
            name: item["Class Name"],
            quarters: item.quarters,
            year: 2020
        }
    })
}

module.exports.getClassForId = (classId) => {
    return data.find(item => item["Class Id"] === classId)
}