/*
 * Serve JSON to our AngularJS client
 */

var data = require('../dancingtails.json');
var models = require('../models');

exports.reviews = function (req, res) {
	var reviews = [];
	data.reviews.forEach(function(review, i){
		reviews.push({
			author:review.author,
			location:review.location,
			image:review.image?review.image:"Loading-Paw-White.png",
			text:review.text
		});
	});
	res.json({
		reviews:reviews
	});
};
var auth = require('../auth');
var youtube = auth.youtube;
exports.videos = function (req, res) {
	var jsondata = {
		channel:[],
		videos:[]
	};
	youtube.channels.list({
		"part":"snippet,statistics",
		"id":"UCsM9t3PX5wriPBHigH9intw",
		"maxResults":50
	}, function(err, data){
		if(err){
			console.log(err);
		}
		else {
			jsondata.channel = data.items;
		}
	});
	youtube.playlistItems.list({
		"part":"snippet",
		"playlistId":"UUsM9t3PX5wriPBHigH9intw",
		"maxResults":50
	}, function(err,data){
		if (err){
			console.log(err);
		}
		else{
			jsondata.videos = data.items;
			res.json(jsondata);
		}
	});
};

exports.services = function(req,res){
	var services = []
	data.services.forEach(function(service, i){
		service.state = false;
		service.packages.forEach(function(package, i){
			package.state=false;
		});
	});
	res.json({
		services:data.services
	})
}

exports.viewMessages = function(req,res){
	models.Message
		.find()
		.sort('-date')
		.exec(renderMessages);
	function renderMessages(err, messages){
		res.json(messages);
	}
}
exports.viewStarred = function(req,res){
	models.Message
		.find({"starred":true})
		.sort('-date')
		.exec(callback);
	function callback(err,messages){
		res.json(messages);
	}
}

exports.saveMessage = function(req,res){
	var newMessage = new models.Message(req.body);
	newMessage.save(afterSaving);
	function afterSaving(err){
		if(err){
			console.log(err);
			res.send(500);
		}
		res.json(newMessage);
	}
}
exports.starMessage = function(req,res){
	var id = req.params.id;
    models.Message
      .findOne({"_id":id})
      .exec(callback);
    function callback(err,message){
      if(err){
        console.log(err);
        res.json(false);
      }
      if(!message) res.json(false);
      else{
      	message.starred = req.body.starred;
      	message.save(function(err){
        	if(err) res.send(500);
        	res.json(true);
      	});
      }
    }
}
exports.deleteMessage = function(req, res){
	var id = req.params.id;
    models.Message
      .findOne({"_id":id})
      .remove()
      .exec(callback);
    function callback(err,message){
      if(err){
        console.log(err);
        res.json(false);
      }
      res.json(true);
    }
}