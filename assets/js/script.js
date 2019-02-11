var showCount = 0;

function getGitRepos() {
	$.getJSON("repos.json", function (data) {
		var items = [];
		//  showTableRepos(data, items);
		showBoxRepos(data, items);
	});
}

// shows table display for github repos
function showTableRepos(data, array) {
	$.each(data, function (key, val) {
		array.push($("#githubTable").append("<tr><td id=" + key + "'>" + val.name + "</td>" +
			"<td><a href=" + val.html_url + ">" + val.html_url + "</a></td>" +
			"<td>" + val.language + "</td>" +
			"<td>" + val.clone_url + "</td>" +
			"<td>" + changeString(val.updated_at) + "</td></tr>"));
	});
}

// shows boxes display for github repos
function showBoxRepos(data, array) {
	$.each(data, function (key, val) {
		if (key < 6) {
			array.push($(".container").append("<div class='col-xs-12 col-sm-4 reposBox'><div class='innerReposBox'><h3>" + val.name + "</h3><a target='_blank' href='" + val.owner.html_url + "'><img src='" + val.owner.avatar_url + "'></a>" +
				"<div class='bottomReposBox'><div class='languageText'><p class='languageBullet'>&#9679;</p><p class='language'>" + val.language + "</p></div><a class='urlIcon' target='_blank' href=" + val.html_url + "><i class='fas fa-link'></i></a><p class='updateDate'>Updated " + changeString(val.updated_at) + "</p></div></div></div>"));
		} else {
			array.push($(".container").append("<div class='col-xs-12 col-sm-4 reposBox reposBoxHide' id='reposBoxHide'><div class='innerReposBox'><h3>" + val.name + "</h3><a target='_blank' href='" + val.owner.html_url + "'><img src='" + val.owner.avatar_url + "'></a>" +
				"<div class='bottomReposBox'><div class='languageText'><p class='languageBullet'>&#9679;</p><p class='language'>" + val.language + "</p></div><a class='urlIcon' target='_blank' href=" + val.html_url + "><i class='fas fa-link'></i></a><p class='updateDate'>Updated " + changeString(val.updated_at) + "</p></div></div></div>"));
		}
	});
}

// change the date string to only show the date without the time from the repos.json
function changeString(str) {
	let i = 0;
	var strArray = [];
	while (str[i] != '\n') {
		strArray[i] = str[i];
		i++;
		if (str[i] == 'T') {
			break;
		}
	}
	var newString = strArray.join("");
	dateDifference(newString);
	return (dateDifference(newString));
}
// checks the day difference between the current date and the last update date of the repository and returns the amount of days in between them
function dateDifference(str) {

	var updateDate = new Date(str);
	var currentDate = new Date();
	var daysDifference = Math.floor((currentDate - updateDate) / (1000 * 60 * 60 * 24))
	if (daysDifference == 0) {
		return ("today");
	} else if (daysDifference == 1) {
		return ("yesterday")
	} else {
		return (daysDifference + " days ago");
	}
}

function showMore() {
	if (showCount == 0) {
		$('.reposBoxHide').css('display', 'block');
		$('.showMore').text('Show less');
		showCount = 1;
	} else {
		$('.reposBoxHide').css('display', 'none');
		$('.showMore').text('Show more..');
		showCount = 0;
	}
}

// first check if element exists change color of bullet.
var checkExist = setInterval(function () {
	// check if exists
	if ($('.reposBox').length) {

		//if more than 6 repositories exist add show more button
		if ($('.reposBox').length > 6) {
			$(".reposBoxHide").each(function () {
			});
			$('.container').append("<button class='showMore' onclick='showMore()'>Show more..</button>");
		}
	}
	// check if exists
	if ($('.languageText').length) {
		$(".languageText").each(function () {
			var text = $(this).text();
			if (text == '●JavaScript') {
				$(this).css('color', 'yellow');
			} else if (text == '●PHP') {
				$(this).css('color', '#4F5D95');
			} else if (text == '●TypeScript') {
				$(this).css('color', '#2b7489');
			} else {
				$(this).css('color', 'orange');
			}
		});
		clearInterval(checkExist);
	}
}, 100); // check every 100ms

// wait untill jQuery is loaded
$(document).ready(function () {
	getGitRepos();
});