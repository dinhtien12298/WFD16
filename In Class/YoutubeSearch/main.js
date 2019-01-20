$(document).ready(function() {
    let loading = document.getElementById('loading');
    let nextPageToken = null;
    // Biến check không cho load nhiều lần khi scroll nextPageToken
    let onLoadMore = false;
    // Biến check dừng nhập thì search
    let timeOutSearch = null;
    $("#keyword").on("input", function(event) {
        loading.style.display = "flex";
        event.preventDefault();
        // Sau khi nhập xong 0.5s mới tiến hành search, nếu tiếp tục gõ thì reset
        clearTimeout(timeOutSearch);
        $("#result-list").empty();
        timeOutSearch = setTimeout(function() {
            const keywords = $("#keyword").val();
            if (keywords) {
                $.ajax({
                    type: "GET",
                    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keywords}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                    success: function(response) {
                        let videoList = response.items;
                        videoList.forEach(video => {
                            $("#result-list").append(`
                                <div class="video d-flex justify-content-around mb-3 col-10">
                                    <img src="${video.snippet.thumbnails.medium.url}" class="thumbnail" alt="">
                                    <div class="video_info col-8">
                                        <h4 class="title text-info">${video.snippet.title}</h4>
                                        <p class="description text-dark">${video.snippet.description}</p>
                                        <a href="https://www.youtube.com/watch?v=${video.id.videoId}?autoplay=true" target="_blank">View >></a>
                                    </div>
                                </div>
                            `);
                        });
                        if (response.nextPageToken) {
                            nextPageToken = response.nextPageToken;
                        } else  {
                            nextPageToken = null;
                        }
                        loading.style.display = "none";
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            } else {
                loading.style.display = "none";
                $("#result-list").empty();
            }
        }, 500);
    });

    $(window).on("scroll", function() {
        if (($(document).height() - $(window).height() - $(window).scrollTop()) < 400 && nextPageToken && !onLoadMore) {
            onLoadMore = true;
            const keywords = $("#keyword").val();
            $.ajax({
                type: "GET",
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keywords}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                success: function(response) {
                    let videoList = response.items;
                    videoList.forEach(video => {
                        $("#result-list").append(`
                            <div class="video d-flex justify-content-around mb-3 col-10">
                                <img src="${video.snippet.thumbnails.medium.url}" class="thumbnail" alt="">
                                <div class="video_info col-8">
                                    <h4 class="title text-info">${video.snippet.title}</h4>
                                    <p class="description text-dark">${video.snippet.description}</p>
                                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}?autoplay=true" target="_blank">View >></a>
                                </div>
                            </div>
                        `);
                    });
                    if (response.nextPageToken) {
                        nextPageToken = response.nextPageToken;
                    } else  {
                        nextPageToken = null;
                    }
                    onLoadMore = false;
                },
                error: function(err) {
                    console.log(err);
                }
            })
        }
    })
})