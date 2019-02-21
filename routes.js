var gravatar = require('gravatar');
const _ = require('lodash');
const moment = require('moment');
const uc = require('upper-case');
const controller = require('./controller/routes');
const student_model = require('./controller/student');
const assignment_model = require('./controller/assignment');
const discussion_model = require('./controller/discussion');
const sms_model = require('./controller/sms');
const upload = require('./controller/multer.config.js');

module.exports = function(app,io){

	app.get('/', function(req, res){
		res.render('login/index.html');
	});

	app.get('/logout', controller.logout);
	app.post('/login', controller.login);
	app.get('/totalStudent', controller.totalStudent);
	app.get('/totalAssignment', controller.totalAssignment);
	app.get('/totalDiscussion', controller.totalDiscussion);

	

	app.get('/home', function(req, res){
		const userId = req.session.userId;
	    if(userId == null){
	        res.redirect("/");
	        return;
	    }
		res.render('dashboard/index.html');
	});

	app.get('/chat', function(req, res){
		const userId = req.session.userId;
	    if(userId == null){
	        res.redirect("/");
	        return;
	    }
		res.render('home.html');
	});

	app.get('/students', controller.student);
	app.get('/getStudent/:id', student_model.getStudent);
	app.post('/addStudent', student_model.addStudent);
	app.post('/deleteStudent', student_model.deleteStudent);
	app.post('/editStudent', student_model.editStudent);

	app.get('/getYear', student_model.getYear);
	app.get('/getCourse', student_model.getCourse);


	app.get('/assignments', controller.assignment);
	app.post('/addAssignment', assignment_model.addAssignment);
	app.post('/deleteAssignment', assignment_model.deleteAssignment);
	app.get('/getAssignment/:id', assignment_model.getAssignment);
	app.get('/viewAssignment/:id', assignment_model.viewAssignment);
	app.post('/editAssignment', assignment_model.editAssignment);

	app.post('/submitAssignment', upload.single("myFile"), assignment_model.submitAssignment);
	
	app.get('/discussions', controller.discussion);
	app.post('/addDiscussion', discussion_model.addDiscussion);
	app.get('/getDiscussion/:id', discussion_model.getDiscussion);
	app.post('/editDiscussion', discussion_model.editDiscussion);
	app.post('/deleteDiscussion', discussion_model.deleteDiscussion);


	app.get('/sms', controller.sms);
	app.post('/send', sms_model.send);


	app.get('/create', function(req,res){
		var id = Math.round((Math.random() * 1000000));
		res.redirect('/chat/'+id);
	});

	app.get('/chat/:id', function(req,res){
		res.render('chat');
	});

	var chat = io.on('connection', function (socket) {

		socket.on('load',function(data){

			var room = findClientsSocket(io,data);
			if(room.length === 0 ) {

				socket.emit('peopleinchat', {number: 0});
			}
			else if(room.length === 1) {

				socket.emit('peopleinchat', {
					number: 1,
					user: room[0].username,
					avatar: room[0].avatar,
					id: data
				});
			}
			else if(room.length >= 2) {

				chat.emit('tooMany', {boolean: true});
			}
		});

		socket.on('login', function(data) {

			var room = findClientsSocket(io, data.id);
			if (room.length < 2) {

				socket.username = data.user;
				socket.room = data.id;
				socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});
				socket.emit('img', socket.avatar);
				socket.join(data.id);

				if (room.length == 1) {

					var usernames = [],
						avatars = [];

					usernames.push(room[0].username);
					usernames.push(socket.username);

					avatars.push(room[0].avatar);
					avatars.push(socket.avatar);

					chat.in(data.id).emit('startChat', {
						boolean: true,
						id: data.id,
						users: usernames,
						avatars: avatars
					});
				}
			}
			else {
				socket.emit('tooMany', {boolean: true});
			}
		});

		socket.on('disconnect', function() {

			socket.broadcast.to(this.room).emit('leave', {
				boolean: true,
				room: this.room,
				user: this.username,
				avatar: this.avatar
			});

			socket.leave(socket.room);
		});

		socket.on('msg', function(data){
			socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
		});
	});
};

function findClientsSocket(io,roomId, namespace) {
	var res = [],
		ns = io.of(namespace ||"/");

	if (ns) {
		for (var id in ns.connected) {
			if(roomId) {
				var index = ns.connected[id].rooms.indexOf(roomId) ;
				if(index !== -1) {
					res.push(ns.connected[id]);
				}
			}
			else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}


