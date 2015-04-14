var app = angular.module("myApp", ['ngRoute']);
var posts = null;

app.controller('PostsController', ['$scope', '$http', function PostsController($scope, $http) {
	$http.get('data.json').success(function(data, status) {
    	$scope.posts = posts = data;
    });
}]);

app.controller('PostController', ['$scope', '$http', '$routeParams', function PostController($scope, $http, $routeParams) {
	for(var i = 0; i < posts.length; i++) 
		if(posts[i].title == $routeParams.title) 
			$scope.post = posts[i];
}]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'posts.html',
		controller  : 'PostsController'
	})
	.when('/post/:title', {
		templateUrl : 'post.html',
		controller  : 'PostController'
	})
	.otherwise({
        redirectTo : '/'
    });
});