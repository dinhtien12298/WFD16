$.ajax({
    url: "/randomquestion",
    type: "GET",
    success: function(question){
        $("#question").text(question.questionContent);
        $("#question").attr("data-question", question._id);
    },
    error: function(err){
        console.log(err);
    }
});

$("#no, #yes").on("click", function(){
    $.ajax({
        url: "/answer",
        type: "POST",
        data: {
            questionId: $("#question").attr("data-question"),
            vote: $(this).attr("_id")
        },
        success: function(question) {
            window.location.href = `/result/${question._id}`;
        },
        error: function(err) {
            console.log(err);
        }
    });
});

$("#result").on("click", function() {
    window.location.href = `/result/${$("#question").attr("data-question")}`;
})

$("#otherQuestion").on("click", function() {
    window.location.href = `/`;
})