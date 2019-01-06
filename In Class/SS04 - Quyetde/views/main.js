$.ajax({
    url: "/randomquestion",
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
        url: "/answer",
        type: "POST",
        data: {
            questionId: $("#question").attr("data-question"),
            vote: $(this).attr("id")
        },
        success: function(data) {
            window.location.href = `/result/${data.question.id}`;
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