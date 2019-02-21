const _ = require('lodash');
const moment = require('moment')
const uc = require('upper-case')

exports.student = async function (req, res){
    const userId = req.session.userId;
    if(userId == null){
        res.redirect("/");
        return;
    }
    const   menu = req.menu,
            row = await mysql.queryAsync(`SELECT c_student.*, c_course.course_desc,c_year.year_desc from c_student inner join c_course 
                                            on c_course.id = c_student.s_course 
                                            inner join c_year on c_year.id = c_student.s_year`)
    res.render('students/index.html', { menu, row});
}

exports.assignment = async function (req, res){
    const userId = req.session.userId;
    if(userId == null){
        res.redirect("/");
        return;
    }
    const   menu = req.menu,
            row = await mysql.queryAsync(`SELECT c_assignment.*,c_course.course_desc,c_year.year_desc
                                         FROM c_assignment inner join c_course
                                         on c_course.id = c_assignment.a_course
                                         inner join c_year on c_year.id = c_assignment.a_year`);
    res.render('assignments/index.html', { menu, row});
}

exports.discussion = async function (req, res){
    const userId = req.session.userId;
    if(userId == null){
        res.redirect("/");
        return;
    }
    const   menu = req.menu,
            row = await mysql.queryAsync(`SELECT c_discussion.*,c_course.course_desc,c_year.year_desc
                                         FROM c_discussion inner join c_course
                                         on c_course.id = c_discussion.d_course
                                         inner join c_year on c_year.id = c_discussion.d_year`);
    res.render('discussions/index.html', { menu, row});
}

exports.sms = async function (req, res){
    const userId = req.session.userId;
    if(userId == null){
        res.redirect("/");
        return;
    }
    const   menu = req.menu;
    res.render('sms/index.html', { menu});
}

exports.logout=function(req,res){
    req.session.destroy(function(err) {
        req.session = null ;
        res.redirect("/");
    })
};

exports.login = async function (req, res){
    try {
        let {name , pass } = req.body
        const result = await mysql.queryAsync(`SELECT * FROM c_users where username =? and password =?`,[name,pass])
        if (result) {
            req.session.userId = result[0].id;
            req.session.user = result[0].username;
            req.session.role = result[0].role;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});  

        const obj = {
            success:true,
            data:result
        };

        res.end(JSON.stringify(obj));

    }catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }

}

exports.totalStudent = async function (req, res){
    try {

        let result = await mysql.queryAsync(`SELECT count(*) as total from c_student`)

        res.writeHead(200, {'Content-Type': 'application/json'});  
        const obj = {
            success:true,
            data:result
        };
        res.end(JSON.stringify(obj));

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.totalAssignment = async function (req, res){
    try {

        let result = await mysql.queryAsync(`SELECT count(*) as total from c_assignment`)
        res.writeHead(200, {'Content-Type': 'application/json'});  
        const obj = {
            success:true,
            data:result
        };
        res.end(JSON.stringify(obj));

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.totalDiscussion = async function (req, res){
    try {

        let result = await mysql.queryAsync(`SELECT count(*) as total from c_discussion`)
        res.writeHead(200, {'Content-Type': 'application/json'});  
        const obj = {
            success:true,
            data:result
        };
        res.end(JSON.stringify(obj));

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}