if(Posts.find().count() === 0){

	var now = new Date().getTime();

	var tomId = Meteor.users.insert({
		profile: { name: "Tom Dale"}
	});

	var yahId = Meteor.users.insert({
		profile: {name: "Yehuda Katz"}
	});

	var tom = Meteor.users.findOne(tomId);
	var yehuda = Meteor.users.findOne(yahId);

	var reddit_id = Posts.insert({
		title: "Reddit is awesome",
		url: "https://www.reddit.com",
		userId: yehuda._id,
		author: yehuda.profile.name,
		submitted: new Date(now - 7*3600*60),
		commentsCount: 2
	});

	Comments.insert({
		postId: reddit_id,
		userId: tom._id,
		author: tom.profile.name,
		submitted: new Date(now - 5*3600*60),
		body: "Interesting project can i get involved ?"
	});

	Comments.insert({
		postId: reddit_id,
		userId: yehuda._id,
		author: yehuda.profile.name,
		submitted: new Date(now - 3*3600*60),
		body: "You sure can, Tom"
	});
	
	Posts.insert({
		title: "Introducing Ember.js",
		url: "https://emberjs.com",
		author: tom.profile.name,
		userId: tom._id,
		submitted: new Date(now - 10*3600*60),
		commentsCount: 0
	});

	Posts.insert({
		title: "Meteor",
		url: "https://meteor.com",
		author: tom.profile.name,
		userId: tom._id,
		submitted: new Date(now - 12*3600*60),
		commentsCount: 0
	});

	Posts.insert({
		title: "The Meteor book",
		url: "https://themeteorbook.com",
		author: tom.profile.name,
		userId: tom._id,
		submitted: new Date(now - 13*3600*60),
		commentsCount: 0
	});

	for( var i = 0; i < 10; i++ ){
		Posts.insert({
			title: "Test Post #"+i,
			author: tom.profile.name,
			userId: tom._id,
			url: "http://google.com?q=test-"+i,
			submitted: new Date(now - i*3600*1000+1),
			commentsCount: 0
		});
	}

}