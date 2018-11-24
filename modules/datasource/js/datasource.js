function getFormData(){
    var formdata = {
        "url": $("#primarykeyURL").val(),
        "from": $("#primarykeyFrom").val(),
        "to": $("#primarykeyTo").val()
    }
    return formdata
};

function displayPostStatus(message){
    console.log(message)
    if(message == '0'){
        $("#postStatus").html("Success");
    }else{
        $("#postStatus").html("Not Success");        
    }
}

function handleProcessBar(data){
    var source = new EventSource("http://localhost:5000/checkProgress/"+data['targetFolder']+"/"+data['total']);
    source.onmessage = function(event) {
        console.log(event.data);
        $("#primarykeyProcessbar").attr("value", String(event.data));
        if(event.data == 100){
            event.target.close();
        }
    }
}

function primarykeyScrape(){
    var formdata = getFormData();
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/primaryKeyParse",
        data: formdata
      }).done(function(data){
        handleProcessBar(data)
      });

}

$("document").ready(function(){
    $("#primarykeyBtn").on("click", primarykeyScrape);
})
