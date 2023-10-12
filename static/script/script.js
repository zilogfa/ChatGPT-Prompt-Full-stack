

let count = 0


function postData(data){
    $.ajax({
        type : 'POST',
        url : '/post_data',
        data: JSON.stringify({'data': data}),
        contentType: 'application/json',
        success : function(response){
            $('section .chatBox').append(`
            <div class="user">
                <div class="content">
                    <p> ${data} </p>
                </div>
                <div class="profile">
                    <span class="material-symbols-rounded">face_5</span>
                </div>
            </div>
            `)
            count++;
            $('#txt-input').val('')

            $('section .chatBox').append(`
            <div class="bot">
                <div class="profile">
                    <span class="material-symbols-rounded">smart_toy</span>
                </div>
                <div class="content">
                    <p>${response}</p>
                    <hr>
                    <div class="detail">
                        <h3>${count} of 3</h3> 
                        <a href="#"><span class="material-symbols-rounded">volume_down_alt</span></a>
                    </div>
                </div> 
            </div>
            `)

        },
        error: function(error){
            console.log('Error', error)
        }

    }); // end Ajax

}; //end postData func




$('#btn-submit').click(function(){
    let data = $('#txt-input').val()
    postData(data);
    console.log(data, count)
});
