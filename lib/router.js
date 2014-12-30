var requireLogin = function() {
	if( !Meteor.user() ){
		if(Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		}
		else {
				this.render("accessDenied");
			}	
	}
	else{
		this.next();
	}
}

PostsListController = RouteController.extend({
	template: "postsList",
	increment: 5,
	postLimit: function() {
		return parseInt(this.params.postLimit) || this.increment;
	},
	findOptions: function(){
		return {sort: this.sort, limit: this.postLimit()};
	},
	subscriptions: function(){
		this.postsSub = Meteor.subscribe("posts", this.findOptions());
	},
	posts: function(){
		return Posts.find({}, this.findOptions());
	},
	data: function(){
		var hasMore = this.posts().count() === this.postLimit();
		return {
			posts: this.posts(),
			nextPath: hasMore ? this.nextPath(): null,
			ready: this.postsSub.ready
		};
	}
});

NewPostsController = PostsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newPosts.path({postLimit: this.postLimit()+this.increment});
	}
});

BestPostsController = PostsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestPosts.path({postLimit: this.postLimit()+this.increment});
	}
});


Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: 'loading',
	waitOn: function() {
		return  [Meteor.subscribe('notifications')];
	}
});


Router.route("/posts/:_id", {
	name: "postPage",
	waitOn: function(){
		return [
			Meteor.subscribe("singlePost", this.params._id),
			Meteor.subscribe("comments", this.params._id)
		];
	},
	data: function() {
		return Posts.findOne(this.params._id);
	}
});

Router.route("/submit", {name: 'postSubmit'});

Router.route("/posts/:_id/edit", {
	name: "postEdit",
	waitOn: function(){
		return Meteor.subscribe('singlePost', this.params._id);
	},
	data: function() {
		return Posts.findOne(this.params._id);
	}
});

Router.route("/", {
	name: 'home',
	controller: NewPostsController
});

Router.route("/new/:postLimit?", {
	name: 'newPosts' 
});

Router.route("/best/:postLimit?", {
	name: "bestPosts"
});

Router.onBeforeAction('dataNotFound', {only:'postPage'});
Router.onBeforeAction(requireLogin, {only:'postSubmit'});