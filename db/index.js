const firebase = require('firebase');
const config = require('../config');
const app = firebase.initializeApp(config);
const db = app.firestore();

const createUser = (userId, college, major, minor, gradYear) => {
    return new Promise((resolve, reject) => {
        db.collection("/users").doc(userId).set({
            name: userId,
            state: college,
            country: major,
            minor: minor,
            gradYear: gradYear,
        }).then(() => {
            resolve();
        })//:))) 
        .catch(error => {
            reject(error);
        })
    });
}

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {

        db.collection("/users").doc(userId).get().then(doc => {
            resolve(doc.data())
        }).catch(error => {
            reject(error);
        })
    });
}

const setUserMajor = (userId, newMajor) => {
    return new Promise((resolve, reject) => {
        db.collection("/users").doc(userId).update({
            major: newMajor
        }).then(() => {
            resolve();
        }).catch(e => {
            reject(e)
        });
    })
}

const setUserMinor = (userId, newMinor) => {
    return new Promise((resolve, reject) => {
        db.collection("/users").doc(userId).update({
            minor: newMinor
        }).then(() => {
            resolve();
        }).catch(e => reject(e));
    })
}

// rewrite
const addClass = (userId, classId, sectionYear, sectionQuarter, sectionName) => {
    return new Promise(async (resolve, reject) => {
        const userRef = db.collection("/users").doc(userId);
        
        // 1 - create class object (use firebase to figure out what the keys are) console.firebase.com -> Develop -> Database -> see there
        const someClass = {
            name: sectionName,
            quarter: sectionQuarter,
            uuid: classId,
            year: sectionYear
        }

        // 2 - get all the classes that belong to the user (hint: look at what you wrote for getUserById)
        let user = await getUserById(userId);
        let userClasses = user.classes; // use firebase here

        // 3 - add the class object from (1) to array "classes" in the user object (hint: use set on the user's classes property)
        userClasses.push(someClass);

        // 3 - set user's classes to be userClasses (hint: look at what you wrote for setUserMajor)
        // firebase code

        // 4 - resolve or reject
        db.collection("/users").doc(userId).update({
            classes: userClasses
        }).then(() => {
            resolve();
        }).catch(e => reject(e));
    })
}

// rewrite
const removeClass = (userId, classId) => {
    return new Promise( async (resolve, reject) => {
        const userRef = db.collection("/users").doc(userId);
        
        // 1 - get all classes that belong to the user
        // let userClasses = [] // use firebase here
        let user = await getUserById(userId);
        let userClasses = user.classes; // use firebase here 

        let found = -1;
        // 2 - find class in userClasses that has the same uuid as classId
        for( let i = 0; i < userClasses.length; i ++ ) {
            if( userClasses[i].uuid === classId ) {
                found = i;
            }
        }
        
        console.log(classId);

        // 3 - remove that class from the array
        if( found != -1 ) {
            userClasses.splice(found);
        }

        // 4 - update userClasses to have the new data (hint: set the firebase user's classes to be equal to userClasses)

        // 5 - resolve or reject accordingly
        db.collection("/users").doc(userId).update({
            classes: userClasses
        }).then(() => {
            resolve();
        }).catch(e => reject(e));
    });
}

// rewrite
const editClass = (userId, classId, sectionYear, sectionQuarter, sectionName) => {
    return new Promise( async (resolve, reject) => {
        //const userRef = db.collection("/users").doc(userId);
        
        // 1 - get all classes that belong to the user
        // let userClasses = [] // use firebase here
        let user = await getUserById(userId);
        let userClasses = user.classes; // use firebase here

        let found = -1;
        // 2 - find class in userClasses that has the same uuid as classId
        for( let i = 0; i < userClasses.length; i ++ ) {
            if( userClasses[i].uuid === classId ) {
                found = i;
            }
        }

        // 3 - edit that class to have the properties given above (sectionYear, sectionQuarter, sectionName)
        const otherClass = {
            name: sectionName,
            quarter: sectionQuarter,
            year: sectionYear,
            uuid: classId
        }
        console.log(classId);
        if( found != -1 ) {
            userClasses[found] = otherClass;
        } else {
            reject("Cannot find class :(")
        }

        // 4 - update userClasses to have the new data (hint: set the firebase user's classes to be equal to userClasses)

        // 5 - resolve or reject accordingly
        db.collection("/users").doc(userId).update({
            classes: userClasses
        }).then(() => {
            resolve();
        }).catch(e => reject(e));
    });
}

module.exports = {
    app, db,
    getUserById,
    setUserMajor,
    setUserMinor,
    addClass,
    removeClass,
    editClass,
    createUser
}