
$(function(){
    $.extend({
        fileReadingSetUp:function(files) {
            
                for(var i=0;i<files.length;i++) {
                    var type = files[i].type.split('/')[0];
                    if(type=="image") {
                        var currentFile = files[i];
                        var fr = new FileReader();
                        fr.readAsDataURL(currentFile);
                        fr.onloadend = function() {
                            $.fileReaderEndAction(this.result);
                        };
                    }
                    else {
                        alert('the please upload an image file as the number '+(i+1)+' image is of type '+type);
                    }
                }
        },
        fileReaderEndAction:function(result) {
            var img = document.createElement("img");
            img.src=result;
            img.width=140;
            img.height=140;
            document.getElementById('boxer').appendChild(img);
        }
    });
    enableFileUploadOnClick();
    takeFilesOnChange();
});
function enableFileUploadOnClick() {
    $("#uploadChanger").click(function(){
        $("#uploader").trigger('click');
    });
}
function dover(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    console.log(event.dataTransfer);
    var files = event.dataTransfer.files;
    $.fileReadingSetUp(files);
}
function takeFilesOnChange() {
    $("#uploader").change(function(event){
        console.log(event);
        var files = event.target.files;
        $.fileReadingSetUp(files);
    });
}
