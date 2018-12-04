$.ajax({
    url: "http://localhost:5000/randomquestion",
    type: "GET",
    success: function(data){
        $("#question").text(data.question.content);
    },
    error: function(err){
        console.log(err);
    }
});