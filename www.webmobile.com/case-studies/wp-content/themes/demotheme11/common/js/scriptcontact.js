/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 jQuery(document).ready(function() {
    
  
var failedFiles = [];
    var ul = $('#uploadcontact ul');
     //var $image_format = 'jpg|jpeg|jpe|png|gif|zip|psd|doc|pdf|AI|RAR';
	 var $image_format = 'jpg|jpeg|jpe|png|gif|zip|psd|PSD|doc|pdf|AI|ai|RAR|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.adobe.photoshop|x-photoshop|postscript|xls|xlsx|vnd.ms-excel';
    var $all_formats = $image_format;
    var ttlSize = 0;
     var $image_size = 20;
     var mb = 1048576;
     var fileSize=0;

    $('#dropcontact a').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });

    
    // Initialize the jQuery File Upload plugin
    $('#uploadcontact').fileupload({
        
        // This element will accept file drag/drop uploading
        dropZone: $('#dropcontact'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            $("#submitFrm").css('pointer-events','none');
             // $('#contactform').attr('action','uploadcontact.php');
              $('#contact-frm').attr('action',SITE_ROOT_URL+'upload.php?frm=contact');
              
               var error_uploads_indexes = [];

            // when add file - each file
            $.each(data.files, function(index, file) {

                // array for all errors
                var uploadErrors = [];

             // validate all formats first
                if($all_formats){

                    // check all formats first - before size
                    var acceptFileTypes = "(\.|\/)(" + $all_formats + ")$";
                    acceptFileTypes = new RegExp(acceptFileTypes, "i");
                    // when wrong format
                    if(data.files[index]['type'].length && !acceptFileTypes.test(data.files[index]['type'])) {
                        uploadErrors.push('Not an accepted file type. Only .PSD, .JPG, .JPEG, .GIF, .PNG, .AI, .ZIP, .RAR, .PDF');

                    }else{

                        // default size is image_size
                        fileSize = data.files[index]['size'];
                    
                      ttlSize = parseFloat(ttlSize) + parseFloat(fileSize);
                      
                       // if((data.files[index]['size'] >= $image_size * mb) || (ttlSize >= $image_size * mb)) {
                        if((data.files[index]['size'] >= $image_size * mb)) {
                            uploadErrors.push('File size is too big. It should be less than 20MB.');
                            
                        }else {
                           //  ttlSize += data.files[index]['size'];
                        }
                    };

                }; // << all_formats
                
                  // when errors
                  
                if(uploadErrors.length > 0) {
                    //  alert(uploadErrors.join("\n"));

                    // mark index of error file
                    error_uploads_indexes.push(index);
                    // alert error
                   // alert('uploadErrors');
                    alert(uploadErrors.join("\n"));
                    return false;

                };
                 });
                 
                   data.files = $.grep( data.files, function( n, i ) {
                return $.inArray(i, error_uploads_indexes) ==-1;
            });

                   

                               // if are files to upload
            if(data.files.length){
              
                var ranValue = Math.floor((Math.random() * 100) + 1); 
                 var tpl = $('<li class="working"><input type="text" value="0" data-width="30" data-height="30"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span class="xdfgfdgfd '+ranValue+'"></span></li>');

            // Append the file name and file size
            var chars = data.files[0].name.length;
            if(chars > 9){
               tpl.find('p').text(data.files[0].name.substring(0,15)+'---')
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');  
            }else{
                tpl.find('p').text(data.files[0].name)
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>'); 
                
            }
            
            // Add the HTML to the UL element
            data.context = tpl.appendTo(ul);
            data.context = tpl.appendTo(".uplfilelist ul");
      //  alert(ul);
        $('#uploadcontact').append('<input type="hidden" id="'+failedFiles.push(data.files[0].name)+'" name="uplnew[]" value="'+data.files[0].name+'"/>');
            // Initialize the knob plugin
            tpl.find('input').knob();

            // Listen for clicks on the cancel icon
            tpl.find('span').click(function(){
                //alert(data.files[0].name);
                

                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                                     
                    ttlSize =  parseFloat(ttlSize) - parseFloat(data.files[0].size);
                 
                
                    $("input[value='"+data.files[0].name+"']").remove();
                    $("#frmOrderFileUploadedfilename").val('');
                    //alert("input[value='"+data.files[0].name+"']");
                    tpl.remove();
                    
                });
               
                
              

            }); 
               // upload by ajax
                var jqXHR = data.submit().done(function (result, textStatus, jqXHR) {
                        //...
                     $('.x').addClass("showicon");
                     var returnValue = JSON.parse(result);
                        //alert(returnValue.fileName);
                        var tempFileNameVal = $("#frmOrderFileUploadedfilename").val();
                        if(tempFileNameVal!=""){
                            tempFileNameVal+=','+returnValue.fileName;
                        }else{
                            tempFileNameVal = returnValue.fileName;
                        }
                        $("#frmOrderFileUploadedfilename").val(tempFileNameVal);
                        $('#contact-frm').attr('action',SITE_ROOT_URL+'sendmail1.php');
                        $("#submitFrm").css('pointer-events','auto');
                        // ...
                });
             
            }
            
   
            // Automatically upload the file once it is added to the queue
           // var jqXHR = data.submit();
        },

        progress: function(e, data){

           $("#submitFrm").prop('disabled','true');
           function n(w) {
            $("#submitFrm").prop("disabled", true);
            var x = [];
            if (jQuery.type(w) == "string") {
                x = w.split("&")
            } else {
                x = b.param(w).split("&")
            }
            var t = x.length;
            var s = [];
            var v, u;
            for (v = 0; v < t; v++) {
                x[v] = x[v].replace(/\+/g, " ");
                u = x[v].split("=");
                s.push([decodeURIComponent(u[0]), decodeURIComponent(u[1])])
            }
            return s
        }
           $("#submitFrm").addClass('upload-disable');
            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            data.context.find('input').val(progress).change();

            if(progress == 100){
          
                 $("#submitFrm").removeAttr('disabled');
                $("#submitFrm").removeClass('upload-disable');
                data.context.removeClass('working');
            }
             
        },

        fail:function(e, data){
          // alert('data');
          //  alert(data);
            // Something has gone wrong!
            data.context.addClass('error');
        }
        
    });
    
     // Initialize the jQuery File Upload plugin
    $('#hireuploadcontact').fileupload({
        
        // This element will accept file drag/drop uploading
        dropZone: $('#hiredropcontact'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            $("#submitHireDevFrm").css('pointer-events','none');
             // $('#contactform').attr('action','uploadcontact.php');
              $('#hire-developer-new-frm').attr('action',SITE_ROOT_URL+'upload.php?frm=hireDeveloper');
              
               var error_uploads_indexes = [];

            // when add file - each file
            $.each(data.files, function(index, file) {

                // array for all errors
                var uploadErrors = [];

             // validate all formats first
                if($all_formats){

                    // check all formats first - before size
                    var acceptFileTypes = "(\.|\/)(" + $all_formats + ")$";
                    acceptFileTypes = new RegExp(acceptFileTypes, "i");

                    // when wrong format
                    if(data.files[index]['type'].length && !acceptFileTypes.test(data.files[index]['type'])) {
                        uploadErrors.push('Not an accepted file type. Only .PSD, .JPG, .JPEG, .GIF, .PNG, .AI, .ZIP, .RAR, .PDF');

                    }else{

                        // default size is image_size
                        fileSize = data.files[index]['size'];
                    
                      ttlSize = parseFloat(ttlSize) + parseFloat(fileSize);
                      
                       // if((data.files[index]['size'] >= $image_size * mb) || (ttlSize >= $image_size * mb)) {
                        if((data.files[index]['size'] >= $image_size * mb)) {
                            uploadErrors.push('File size is too big. It should be less than 20MB.');
                            
                        }else {
                           //  ttlSize += data.files[index]['size'];
                        }
                    };

                }; // << all_formats
                
                  // when errors
                  
                if(uploadErrors.length > 0) {
                    //  alert(uploadErrors.join("\n"));

                    // mark index of error file
                    error_uploads_indexes.push(index);
                    // alert error
                   // alert('uploadErrors');
                    alert(uploadErrors.join("\n"));
                    return false;

                };
                 });
                 
                   data.files = $.grep( data.files, function( n, i ) {
                return $.inArray(i, error_uploads_indexes) ==-1;
            });

                   

                               // if are files to upload
            if(data.files.length){
              
                var ranValue = Math.floor((Math.random() * 100) + 1); 
                 var tpl = $('<li class="working"><input type="text" value="0" data-width="30" data-height="30"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span class="xdfgfdgfd '+ranValue+'"></span></li>');

            // Append the file name and file size
            var chars = data.files[0].name.length;
            if(chars > 9){
               tpl.find('p').text(data.files[0].name.substring(0,15)+'---')
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');  
            }else{
                tpl.find('p').text(data.files[0].name)
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>'); 
                
            }
            
            // Add the HTML to the UL element
            data.context = tpl.appendTo(".uplfilelist ul");
      //  alert(ul);
        $('#hireuploadcontact').append('<input type="hidden" id="'+failedFiles.push(data.files[0].name)+'" name="uplnew[]" value="'+data.files[0].name+'"/>');
            // Initialize the knob plugin
            tpl.find('input').knob();

            // Listen for clicks on the cancel icon
            tpl.find('span').click(function(){
                //alert(data.files[0].name);
                

                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                                     
                    ttlSize =  parseFloat(ttlSize) - parseFloat(data.files[0].size);
                 
                
                    $("input[value='"+data.files[0].name+"']").remove();
                    $("#frmHireOrderFileUploadedfilename").val('');
                    //alert("input[value='"+data.files[0].name+"']");
                    tpl.remove();
                    
                });
               
                
              

            }); 
               // upload by ajax
                var jqXHR = data.submit().done(function (result, textStatus, jqXHR) {
                        //...
                     $('.x').addClass("showicon");
                     var returnValue = JSON.parse(result);
                        //alert(returnValue.fileName);
                        var tempFileNameVal = $("#frmHireOrderFileUploadedfilename").val();
                        if(tempFileNameVal!=""){
                            tempFileNameVal+=','+returnValue.fileName;
                        }else{
                            tempFileNameVal = returnValue.fileName;
                        }
                        $("#frmHireOrderFileUploadedfilename").val(tempFileNameVal);
                        $('#hire-developer-new-frm').attr('action',SITE_ROOT_URL+'sendmail1.php');
                        $("#submitHireDevFrm").css('pointer-events','auto');
                        // ...
                });
             
            }
            
   
            // Automatically upload the file once it is added to the queue
           // var jqXHR = data.submit();
        },

        progress: function(e, data){

           $("#submitHireDevFrm").prop('disabled','true');
           function n(w) {
            $("#submitHireDevFrm").prop("disabled", true);
            var x = [];
            if (jQuery.type(w) == "string") {
                x = w.split("&")
            } else {
                x = b.param(w).split("&")
            }
            var t = x.length;
            var s = [];
            var v, u;
            for (v = 0; v < t; v++) {
                x[v] = x[v].replace(/\+/g, " ");
                u = x[v].split("=");
                s.push([decodeURIComponent(u[0]), decodeURIComponent(u[1])])
            }
            return s
        }
           $("#submitHireDevFrm").addClass('upload-disable');
            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            data.context.find('input').val(progress).change();

            if(progress == 100){
          
                 $("#submitHireDevFrm").removeAttr('disabled');
                $("#submitHireDevFrm").removeClass('upload-disable');
                data.context.removeClass('working');
            }
             
        },

        fail:function(e, data){
          // alert('data');
            alert(data);
            // Something has gone wrong!
            data.context.addClass('error');
        }
        
    });


    // Prevent the default action when a file is dropped on the window
    $(document).on('drops dragover', function (e) {
        e.preventDefault();
    });
    
    

    // Helper function that formats the fileF sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }
    

  function validateURLL(urlValue){      
      var urlExpression = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/    
       if(urlExpression.test(urlValue)){
           return true;
          
       }else{
           return false;          
       } 
    }
    /**bkumar**/
   /* $("#contactform").submit(function(){        
         if($("#orderUrllinked").val()!='https://' && $("#orderUrllinked").val()!='http://'){
           var urlValue = $("#orderUrllinked").val();
           if(validateURLL(urlValue)){
                $("#orderUrllinked").removeClass('error_security');
                //alert("okay"+$("#orderUrllinked").val());
                return true;
           }else{
               //alert("else"+$("#orderUrllinked").val());
                $("#orderUrllinked").addClass('error_security');
                return false;
           } 
         }else{
             return true;
         }
        
       
    });
    
     $("#orderUrllinked").change(function(){
            if(validateURLL($("#orderUrllinked").val())){
                $("#orderUrllinked").removeClass('error_security');
            }else{
                $("#orderUrllinked").addClass('error_security'); 
            }
        });*/
    
    /***/


});


