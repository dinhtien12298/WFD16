const params = new URL(window.location.href).pathname.split("/");
const gameId = params[params.length - 1];

$.ajax({
    url: "http://localhost:5000/gamedetail/" + gameId,
    type: "GET",
    success: function(data){
        if (data) {
            
        }
    },
    error: function(err){
        console.log(err);
    }
});

$("#addRound").on("click", function(){
    $("tbody").append(`
        <tr>
            <th scope="row">Round 1</th>
            <td>
                <input id="score1" class="border border-dark rounded h-35px" type="number">
            </td>
            <td>
                <input id="score1" class="border border-dark rounded h-35px" type="number">
            </td>
            <td>
                <input id="score1" class="border border-dark rounded h-35px" type="number">
            </td>
            <td>
                <input id="score1" class="border border-dark rounded h-35px" type="number">
            </td>
        </tr>
    `)
})