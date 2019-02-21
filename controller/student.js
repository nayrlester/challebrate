var gravatar = require('gravatar');
const _ = require('lodash');
const moment = require('moment')
const uc = require('upper-case')


exports.addStudent = async function (req, res){
    try {
        let { stud_num, fullname, course, year, stud_type, remarks} = req.body
        
        let result = await mysql.queryAsync(`INSERT INTO c_student 
        (s_stud_num,s_fullname,s_course,s_year,s_stud_type,s_remarks) VALUES (?, ?, ?, ?, ?, ?)`,[stud_num, fullname, course, year, stud_type,remarks])

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

exports.editStudent = async function (req, res){
    try {
        let { stud_num, fullname, course, year, stud_type, remarks,id} = req.body
        
        let result = await mysql.queryAsync(`UPDATE c_student set s_stud_num =?, s_fullname=?,s_course=?,s_year=?,s_stud_type=?,s_remarks=?
        				where id = ? `,[stud_num, fullname, course, year, stud_type,remarks,id])

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

exports.deleteStudent = async function (req, res){
    try {
        let {id} = req.body
        
        let result = await mysql.queryAsync(`DELETE from c_student where id = ?`,[id])

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

exports.getStudent = async function (req, res){
    try {

        let id = req.params.id 
        let result = await mysql.queryAsync(`SELECT c_student.*, c_course.course_desc,c_year.year_desc from c_student inner join c_course on c_course.id = c_student.s_course inner join 
        									c_year on c_year.id = c_student.s_year where c_student.id = ?`,[id])

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

exports.getYear = async function (req, res){
    try {

        let result = await mysql.queryAsync(`SELECT * from c_year`)

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

exports.getCourse = async function (req, res){
    try {

        let result = await mysql.queryAsync(`SELECT * from c_course`)

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


