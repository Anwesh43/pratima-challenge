var imageHtml = [];
$(document).ajaxStart(function(){
    $('saveModal').modal('show');
});
$(document).ajaxComplete(function(){
    $('saveModal').modal('hide');
});
$(function(){
    $.extend({
        fileReadingSetUp:function(files) {
                var fileNames = [];
                for(var i=0;i<files.length;i++) {
                    var type = files[i].type.split('/')[0];
                    if(type=="image") {
                        var fileName = files[i].name;
                        var currentFile = files[i];
                        var fr = new FileReader();
                        fileNames.push(fileName);
                        fr.index = i; 
                        fr.readAsDataURL(currentFile);
                        fr.onloadend = function() {
                            console.log(this.index+" "+fileNames);
                            $.fileSaveAction(this.result,fileNames[this.index]);
                        };
                    }
                    else {
                        alert('the please upload an image file as the number '+(i+1)+' image is of type '+type);
                    }
                }
        },
        fileSaveAction:function(result,name) {
            
            $.ajax({url:"image_saver.php",type:"post",data:{name:name,imageData:result}}).success(function(){
                $.saveImageData(name);
                $.displayImage(result,name);
            });
        },
        saveImageData:function(name) {
            if(window.localStorage) {
                if(!window.localStorage.imageDb) {
                    window.localStorage.imageDb = name;
                }
                else {
                var db = window.localStorage.imageDb;
                var dbarr = db.split(",");
                dbarr.push(name);
                window.localStorage.imageDb = dbarr;
                }
            }
        },
        displayImage:function(result,name) {
            var id = name.split('.')[0];
            var thumbnailHtml = '<div class="thumbnail"><img src="'+result+'" alt="'+name+'" id="'+id+'" width="'+$(document).width()/10+'px" height="'+$(document).height()/10+'"><div class="caption"><h3>'+id+'</h3><p><a href="#" class="glyphicon glyphicon-thumbs-up" role="button" id="like_'+name+'"></a> <a href="#" class="glyphicon glyphicon-trash" role="button" id="delete_'+name+'"></a> <a href="#" class="glyphicon glyphicon-share" role="button" id="share_'+name+'"></a></p></div></div>';
            $("#boxer").append(thumbnailHtml);
            $.showHiddenAtTheLast();
        },
        loadCachedImages:function() {
            if(window.localStorage.imageDb) {
                var dbvals = window.localStorage.imageDb;
                var dbarr = dbvals.split(',');
                console.log(dbarr);
                dbarr.forEach(function(imageData){
                    $.displayImage("uploaded_images/"+imageData,imageData);
                });
            }
        },
    
    searchForImage:function() {
            $("#searchText").keyup(function(){
                var searchVal = $(this).val();
                var length = searchVal.length;
                console.log(searchVal);
                $(".thumbnail").addClass('dontShow');
                $(".thumbnail").each(function(){
                    var that = $(this);
                    $(this).find('img').each(function(){
                        if($(this).attr('id').substring(0,length) == searchVal) {
                            that.removeClass('dontShow');
                        }
                    })
                });
                $.showHiddenAtTheLast();
            });
            
        },
    showHiddenAtTheLast:function() {
        var hiddenHtml = "",visibleHtml = "";
        $(".thumbnail").each(function(){
            if($(this).hasClass('dontShow')) {
                hiddenHtml += "<div class='thumbnail dontShow'>"+$(this).html()+'</div>';    
            }
            else {
                visibleHtml+=  "<div class='thumbnail'>"+$(this).html()+'</div>';
            }
        });
        console.log(visibleHtml);
            
            $("#boxer").empty();
            $("#boxer").append(visibleHtml);
            $("#boxer").append(hiddenHtml);
            
        }
    });
    $.loadCachedImages();
    enableFileUploadOnClick();
    takeFilesOnChange();
    $.searchForImage();
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
