
var gravatar = require('gravatar');
const _ = require('lodash');
const moment = require('moment')
const uc = require('upper-case')
const formidable = require('formidable');
const fs = require('fs');
const Forms = require('../Services/Forms');
const multer = require('multer');


exports.addAssignment = async function (req, res){
    try {
        let { course, year, subject, desc, deadline} = req.body
        
        let result = await mysql.queryAsync(`INSERT INTO c_assignment 
        (a_course,a_year,a_subject,a_description,a_deadline) VALUES (?, ?, ?, ?, ?)`,[course, year, subject, desc, deadline])

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

exports.deleteAssignment = async function (req, res){
    try {
        let {id} = req.body
        
        let result = await mysql.queryAsync(`DELETE from c_assignment where id = ?`,[id])

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

exports.getAssignment = async function (req, res){
    try {

        let id = req.params.id 
        let result = await mysql.queryAsync(`SELECT c_assignment.*, c_course.course_desc,c_year.year_desc 
                                            FROM c_assignment 
                                            INNER JOIN c_course 
                                            ON c_course.id = c_assignment.a_course 
                                            INNER JOIN c_year 
                                            ON c_year.id = c_assignment.a_year 
                                            WHERE c_assignment.id = ?`,[id])

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

exports.editAssignment = async function (req, res){
    try {
        let { subject, desc, course, year, deadline,id} = req.body
        let result = await mysql.queryAsync(`UPDATE c_assignment set a_course =?, a_year=?,a_subject=?,a_description=?,a_deadline=?
                        where id = ? `,[course, year, subject, desc, deadline,id])

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

exports.viewAssignment = async function (req, res){
    const userId = req.session.userId;
    if(userId == null){
        res.redirect("/");
        return;
    }
    let id = req.params.id 
    let row = await mysql.queryAsync(`SELECT * FROM c_submitAssignment WHERE assignment_id = ?`,[id])

    res.render('viewAssignment/index.html',{row,id});
}


exports.submitAssignment = async function (req, res, next){
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    let {assignment_id, stud_num, fullname} = req.body
        
    let result = await mysql.queryAsync(`INSERT INTO c_submitAssignment 
    (assignment_id,student_num,fullname,files) VALUES (?, ?, ?, ?)`,[assignment_id, stud_num, fullname, file.originalname])

    res.writeHead(200, {'Content-Type': 'application/json'});  
    res.redirect("/viewAssignment/"+assignment_id);
}
