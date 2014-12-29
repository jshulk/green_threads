Template.commentSubmit.created = function() {
	//callaback like rendered ?
	Session.set("commentSubmitErrors", {});
}
Template.commentSubmit.helpers({
	errorMessage: function(field){ 
		return Session.get("commentSubmitErrors")[field];
	},
	errorClass: function(field){
		return !!Session.get("commentSubmitErrors")[field]?'has-error': '';
	}

});

Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();
		var $body = $(e.target).find("[name=body]"),
			comment = {
				body: $body.val(),
				postId: template.data._id
			},
			errors = {};

		if( !comment.body ) {
			errors.body = "Please write some content.";
			return Session.set("commentSubmitErrors", errors);
		}

		Meteor.call("commentInsert", comment, function(err, commentId){
			if(err){
				Errors.throw(err.reason);
			}
			else{
				$body.val("");
			}
		});
	}
});