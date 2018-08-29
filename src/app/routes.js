const create_p = require('./create_p.js');
const publication = require('./models/publication');

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup',passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true 
	}));

	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/info', (req, res) =>{
		res.render('info');
	});

	app.get('/contact', (req, res) => {
		res.render('contact');
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/create-publication', (req, res) => {
		res.render('create_p');
		res.redirect('profile');
	});

	app.get('/newpost', isLoggedIn, (req, res) => {
		create_p(req, res);
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

function NewPost (req, res, next) {
	var newPost = new publication();
	newPost.user_id = req.user.local._id;
	newPost.publication_text = req.body.post_text;

	newPost.save(function (err) {
    	if (err) { throw err; }
        return done(next, newPost);
    });
}
