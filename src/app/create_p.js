const publication = require('../app/models/publication');

module.exports = function(req, res) {
	var newPost = new publication();
	newPost.user_id = req.user.local._id;
	newPost.publication_text = req.body.post_text;
	
	newPost.save(function (err) {
    	if (err) { throw err; }
        return done(null, newPost);
    });

}