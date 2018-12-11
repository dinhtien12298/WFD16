$.ajax({
    url: "http://localhost:5000/randomquestion",
    type: "GET",
    success: function(data){
        $("#question").text(data.question.content);
        $("#question").attr("data-question", data.question.id);
    },
    error: function(err){
        console.log(err);
    }
});

$("#no, #yes").on("click", function(){
    $.ajax({
        url: "http://localhost:5000/answer",
        type: "POST",
        data: {
            questionId: $("#question").attr("data-question"),
            vote: $(this).attr("id")
        },
        success: function(data) {
            console.log(data);
            window.location.href = `http://localhost:5000/question/${data.question.id}`;
        },
        error: function(err) {
            console.log(err);
        }
    });
});