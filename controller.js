app.controller("RSSReaderController", function($scope){

	$scope.tabs = [
		{
			title: 'Select From List',
			cont: 'tabCont1'
		 }//,
		// {
		// 	title: 'Upload XML',
		// 	cont: 'tabCont2'
		// }
	];
	$scope.currentTab = 'tabCont1';
	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.cont;
	}
	$scope.isActiveTab = function (tabCont) {
		return tabCont == $scope.currentTab;
	}

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

				$scope.feedSites[i].posts = [];
				var feedURL = $scope.feedSites[i].RSS;
				modularRequest(feedURL, i);

			}
		}
	}

	function modularRequest (url, count) {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "xml",
			success: function (xml) {
				console.log("ajax request successful");
				getXMLparts(xml, count);
			},
			error: function (errorThrown, status, xhr) {
				console.log("ERROR: request failed");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir( xhr );
			},
			complete: function () {
				console.log("Request completed.");
			}
		});
	}

	function getXMLparts (xmldoc, count) {
		var posts = xmldoc.getElementsByTagName('item');
		for (ii=0; ii<=posts.length; ii++) {
			var post = posts[ii];
			var postTitle = myParse(post, 'title');
			var postURL = myParse(post, 'link');

			pushXMLdata(postTitle, postURL, count);
		}
	}

	function myParse (obj, att) {
		return obj.getElementsByTagName(att).item(0).firstChild.data;
	}

	function pushXMLdata (postTitle, postLink, count) {
		$scope.feedSites[count].posts.push({
			Title: postTitle,
			URL: postLink
		});
	}



});
