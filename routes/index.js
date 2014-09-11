var express = require('express');
var Post = require('./../models/post.js');
var commentSchema = require('./../models/comments.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	Post.find({}).sort({modified_at: 'desc'}).exec(function(err, posts) {
		if (err) console.log(err);
		res.render('index', { title: 'Titles for downloading', posts: posts });

	})
});

router.get('/:slug', function(req, res) {
	Post.findOne({slug: req.params.slug}, function(err, post) {
		if (err) console.log(err);
		res.render('post', {post: post});
	})
});

router.post('/:slug/comments', function(req, res) {
	console.log(req.params)
	var comments = new commentSchema({
		body: req.body.comment_body
	})
	Post.update({slug: req.params.slug}, {$push: {comments: comments}, $set: {modified_at: new Date()}}, function() {
		res.redirect('/'+req.params.slug);
	})

});

router.get('/:slug/close', function(req, res) {
	Post.findOne({slug: req.params.slug}, function(err, post) {
		if (err) console.log(err);
		res.render('closePost', {post: post});
	})
});

router.post('/:slug/close', function(req, res) {
	if (!!req.body.post_closedBy) {
		Post.update({slug: req.params.slug}, {$set: {downloadedBy: req.body.post_closedBy, completedStat: "closed", modified_at: new Date()}}, function() {
			res.redirect('/');
		})
	} else {
		res.render('error', {message: "Cannot close a request without a downloader Name"})
	}
});

module.exports = router;
