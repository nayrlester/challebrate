
var gravatar = require('gravatar');
const _ = require('lodash');
const moment = require('moment')
const uc = require('upper-case')


exports.addDiscussion = async function (req, res){
    try {
        let { course, year, subject, desc, deadline} = req.body
        
        let result = await mysql.queryAsync(`INSERT INTO c_discussion 
        (d_course,d_year,d_subject,d_description) VALUES (?, ?, ?, ?)`,[course, year, subject, desc])

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

exports.getDiscussion = async function (req, res){
    try {

        let id = req.params.id 
        let result = await mysql.queryAsync(`SELECT c_discussion.*, c_course.course_desc,c_year.year_desc 
                                            FROM c_discussion 
                                            INNER JOIN c_course 
                                            ON c_course.id = c_discussion.d_course 
                                            INNER JOIN c_year 
                                            ON c_year.id = c_discussion.d_year 
                                            WHERE c_discussion.id = ?`,[id])

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

exports.editDiscussion = async function (req, res){
    try {
        let { subject, desc, course, year, id} = req.body
        let result = await mysql.queryAsync(`UPDATE c_discussion set d_course =?, d_year=?,d_subject=?,d_description=?
                        where id = ? `,[course, year, subject, desc, id])

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

exports.deleteDiscussion = async function (req, res){
    try {
        let {id} = req.body
        
        let result = await mysql.queryAsync(`DELETE from c_discussion where id = ?`,[id])

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


