Posts = new Mongo.Collection("posts");

Posts.allow({
	update: function(userId, post){return ownsDocument(userId, post); },
	remove: function(userId, post){ return ownsDocument(userId, post); }
});

Posts.deny({
	update: function(userId, post, fieldNames){
		return _.without(fieldNames, 'title', 'url', 'message').length > 0;
	}
})

Meteor.methods({
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String,
			message: String
		});

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			};
		}


		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		});

		

		var postId = Posts.insert(post);
		
		return {
			_id: postId
		};
	}
});