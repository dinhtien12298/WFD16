const params = new URL(window.location.href).pathname.split("/");
const questionId = params[params.length - 1];

$.ajax({
    type: "GET",
    url: "/questiondetail" + questionId,
    success: function(response) {
        if(response && response.success) {
            let question = response.question;
            let totalVote = question.yes + question.no;
            
            $('#questionContent').text(question.questionContent);
            $('#totalVote span').text(totalVote);
            $('#voteYes span').text((question.yes/totalVote)*100);
            $('#voteNo span').text((question.no/totalVote)*100);
        }
    },
    error: function(error) {
        console.log(error);
    }
})