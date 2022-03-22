const Course = require('../modules/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        res.json(res.local._sort);

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
    // [GET] /me/trash/courses
    trashCourses(req,res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController;