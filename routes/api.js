/*
 * Serve JSON to our AngularJS client
 */

var data = {
	"reviews": [
		{
			"author": "Angie & Rob",
			"location":"Berkeley",
			"image":"Hubert-low.jpg",
			"text": "Alyssa trained our French Bulldog, Huey, and we had great results! I was referred to her by one of my clients, and we fully trusted her with a key to our place. She came daily to train him with sit-stays, walking better on a leash, and not jumping on people when greeted. We knew Huey was always safe with her because of her positive reinforcement training methods... and he LOVED her! She is gentle, patient, and detailed oriented. We really appreciate how she gave us written notes, and showed us how to do everything ourselves. We highly recommend Alyssa!"
		},
		{
			"author": "Amber",
			"location":"Humboldt County",
			"image":"Autumn1-low.jpg",
			"text":"Alyssa worked with my dog Autumn. She is an amazing trainer and a very kind and considerate person with a genuine love for animals. Autumn would always get super excited when Alyssa would come to work with her." 
		},
		{
			"author": "Kay",
			"location":"Berkeley",
			"image":"Flanders-low.jpg",
			"text": "Alyssa took on the challenge of increasing my seven year old dog's recall response. The combination of her enthusiasm, attention and caring worked wonders and Flanders is much more responsive to coming when called.  Alyssa also gave me pointers on how to maintain the behavior modification that she had achieved.  I'm very happy with the result!  "
		},
		{
			"author": "Mark & Sara",
			"location":"Albany",
			"image":"Ollie-low.jpg",
			"text": "Alyssa took our lovable Wheaton Terrier, Ollie, everyday for an hour and helped groom Ollie into a wonderfully obedient dog. Ollie looked forward to his daily visits with Alyssa and showed a marked improvement in behavior. My wife and I strongly recommend Alyssa for all your dog training needs."
		}
	],
	"videos": [
		{
			"title":"Hubert the French Bulldog Aces his Test!",
			"videoId": "R4v_Iu5o_ew",
			"image":"video1.jpg"
		},
		{
			"title":"Biggie the Golden Retriever Aces his Test!",
			"videoId": "WaZPgBrbfn8",
			"image":"video2.jpg"
		},
		{
			"title":"Labradoodle Waits for Command to Go Out",
			"videoId": "5_sjCwPU3tI",
			"image":"video3.jpg"
		}
	]
};

exports.reviews = function (req, res) {
	var reviews = [];
	data.reviews.forEach(function(review, i){
		reviews.push({
			author:review.author,
			location:review.location,
			image:review.image?review.image:"paw-white.png",
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
	// data.videos.forEach(function(video, i){
	// 	videos.push({
	// 		title:video.author,
	// 		videoId:video.location,
	// 		image:video.image,
	// 	});
	// });
	// res.json({
	// 	videos:videos
	// });
};
exports.post = function(req, res){
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length){
		res.json({
			post: data.posts[id]
		});
	}
	else{
		res.json(false);
	}
}

//POST
exports.addPost = function(req, res){
	data.posts.push(req.body);
	res.json(req.body);
};

//PUT
exports.editPost = function(req, res){
	var id = req.params.id;
	if (id>=0 && id < data.posts.length){
		data.posts[id] = req.body;
		res.json(true);
	}
	else res.json(false);
}

exports.deletePost = function(req, res){
	var id = req.params.id;
	if(id>=0 && id<data.posts.length){
		data.posts.splice(id,1);
		res.json(true);
	}
	else res.json(false);
}