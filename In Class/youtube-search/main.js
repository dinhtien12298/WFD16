$(document).ready(function () {
    let nextPageToken = null;
    let onLoadMoreResult = false;
    let timeOutSearch = null;

    $("#keyword").on("input", function () {
        event.preventDefault();
        clearTimeout(timeOutSearch);
        timeOutSearch = setTimeout(function () {
            $("#result-list").empty();
            const keyword = $("#keyword").val();
            console.log(keyword);
            $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + keyword + "&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw",
                success: function (response) {
                    let videoList = response.items;
                    videoList.forEach(video => {
                        $("#result-list").append(`
                        <a href="https://www.youtube.com/watch?v=${video.id.videoId}?autoplay=true" target="_blank">${video.snippet.title}</a>
                    `);
                    });

                    if (response.nextPageToken) {
                        nextPageToken = response.nextPageToken;
                    } else {
                        nextPageToken = null;
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }, 1000)
    });

    $(window).on("scroll", function () {
        if ($(document).height() - ($(window).height() + $(window).scrollTop()) < 400 && nextPageToken && !onLoadMoreResult) {
            onLoadMoreResult = true;
            const keyword = $("#keyword").val();
            $.ajax({
                type: "GET",
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                success: function (response) {
                    let videoList = response.items;
                    videoList.forEach(video => {
                        $("#result-list").append(`
                        <a href="https://www.youtube.com/watch?v=${video.id.videoId}?autoplay=true" target="_blank">${video.snippet.title}</a>
                    `);
                    });

                    if (response.nextPageToken) {
                        nextPageToken = response.nextPageToken;
                    } else {
                        nextPageToken = null;
                    }
                    onLoadMoreResult = false
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    })
});