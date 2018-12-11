const params = new URL(window.location.href).pathname.split("/");
const questionId = params[params.length - 1];

$.ajax({
    url: "http://localhost:5000/question/" + questionId,
    type: "GET",
    success: function(data){
        if (data) {
            let question = data.question;
            let content = question.questionContent;
            let voteYes = question.yes;
            let voteNo = question.no;
            let totalVote = voteYes + voteNo;
     
            $("#questionContent").text(content);
            $("#totalVote").text(totalVote);
            $("#voteYes").text(voteYes);
            $("#voteNo").text(voteNo);
        }
    },
    error: function(err){
        console.log(err);
    }
});