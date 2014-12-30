Template.postEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: $(e.target).find("[name=url]").val(),
			title: $(e.target).find("[name=title]").val(),
			message: $(e.target).find("[name=message]").val()

		};

		Posts.update(currentPostId, {$set: postProperties}, function(err){
			if(err){
				Errors.throw(err.reason);
			}
			else{
				Router.go("postPage", {_id: currentPostId});
			}
		});

	},
	'click .delete': function(e) {
		e.preventDefault();
		if(confirm("Delete this Post ?")){		
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go("home");	
		}
	}
});