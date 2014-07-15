app.controller("RSSReaderController", function($scope){
	$scope.selectedFeed = "";
	$scope.feedSites = [
		{
			Name: 'Smashing Magazine',
			RSS: 'SmashingMagazine.xml',
			posts: null
		},
		{
			Name: 'Universe Today',
			RSS: 'universeToday.xml',
			posts: null
		},
		{
			Name: 'msnbc.com',
			RSS: 'msnbc.xml',
			posts: null
		}
	];

	$scope.feedInit = function(){
		for (i=0; i<=$scope.feedSites.length; i++) {

			var thisFeed = $scope.feedSites[i];
			var thisPosts = $scope.feedSites[i].posts;

			if ($scope.feedSites[i].posts == null){
				//console.log(thisPosts);
				$scope.feedSites[i].posts = [];
				var feedURL = $scope.feedSites[i].RSS;
				httpRequest.open('GET', feedURL, false);
				httpRequest.onreadystatechange = function () {
					if (httpRequest.readyState == 4) {

						if (httpRequest.status === 200) {
							var xmldoc = httpRequest.responseXML;
							if (xmldoc != null) {
								//console.log("Success: This is XML doc " + thisFeed.Name);
								
								var posts = xmldoc.getElementsByTagName('item');

								for (ii=0; ii<=posts.length; ii++) {
									var post = posts[ii];
									var postTitle = myParse(post, 'title');
									var postURL = myParse(post, 'link');

									$scope.feedSites[i].posts.push({
										Title: postTitle,
										URL: postURL
									});

								}

							} else {
								console.log("Error: responseXML is null.");
							}
						} else {
							console.log("Error: 200 status not achieved.")
						}
					}
				};
				httpRequest.send(null);

			}
		}
	}
	function myParse (obj, att) {
		return obj.getElementsByTagName(att).item(0).firstChild.data;
	}


});
