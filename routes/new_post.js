var express = require('express');
var Post = require('./../models/post.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('new');
});

router.post('/', function(req, res) {
	var post = new Post({
		title: req.body.post_title,
		slug: req.body.post_title.split(" ").join(""),
		initiatedBy: req.body.post_initiatedBy
	});

	post.save(function(err) {
		if (err) console.log(err);
		res.redirect('/');
	})
});

module.exports = router;
