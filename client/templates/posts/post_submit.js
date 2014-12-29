Template.postSubmit.events({
	"submit form": function(event){
		event.preventDefault();
		var post = {
			url: $(event.target).find("input[name=url]").val(),
			title: $(event.target).find("input[name=title]").val(),
			message: $(event.target).find("textarea[name=message]").val()
		};

		Meteor.call('postInsert', post, function(err, result){
			
			if(err){
				return Errors.throw(err.reason);
			}

			if(result.postExists){
				Errors.throw("link has already been posted");
			}

			Router.go("postsList");

		});
	}
});