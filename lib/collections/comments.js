Comments = new Mongo.Collection("comments");

Meteor.methods({
	commentInsert: function(comment){
		check(this.userId, String);
		check(comment, {
			body: String,
			postId: String
		});

		var user = Meteor.user(),
			post = Posts.findOne(comment.postId);

		if( !post ){
			throw new Meteor.Error("invalid-comment", "You must comment on a post.");
		}

		var commentAttributes = _.extend(comment, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		Posts.update(commentAttributes.postId, {$inc: {commentsCount: 1}});

		commentAttributes._id = Comments.insert(commentAttributes);

		createCommentNotification(commentAttributes);

		return commentAttributes._id;
		
	}
});