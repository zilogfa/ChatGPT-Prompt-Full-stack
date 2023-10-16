


//--------- Text to Speach
function speak(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

// -------- Prompt Setup
let count = 0


function postData(data){
    $('#spinner').show();
    console.log('spinner turned On ')
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
            $('section .chatBox .bot .detail a').last().click(function() {
                speak(response);
            });
            console.log('spinner turned Off ')
            $('#spinner').hide();

        },
        error: function(error){
            console.log('Error', error)
        }

    }); // end Ajax

}; //end postData func




$('#btn-submit').click(function(e){
    e.preventDefault();  // prevent default form submission
    let data = $('#txt-input').val()
    postData(data);
    console.log(data, count)
});


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ------- Speach to Text setup
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var recognitionActive = false; // State variable to handle browser microphone access

$('#btn-speech').click(function(){
    // Check if recognition is already active
    if (!recognitionActive) {
        recognition.start();
        recognitionActive = true;
        $('#btn-speech span').addClass('recording'); // CSS animation to Mice
    }
});

// Reset state when recognition ends
recognition.onend = function() {
    recognitionActive = false;
    $('#btn-speech span').removeClass('recording'); // removing CSS animation
};


recognition.onresult = function(event) {
    var speechText = event.results[0][0].transcript;
    $('#txt-input').val(speechText);  // text input with the speech
    // postData(speechText);  automatically send the text to BE after recognizing
};

// Handle errors - Speech to Text
recognition.onerror = function(event) {
    console.error(event.error);
    if (event.error == "not-allowed") {
        alert("Please allow microphone access to use this feature.");
    }
};