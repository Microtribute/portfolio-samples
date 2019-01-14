function isNumberKey(e) {
    var r = e.which ? e.which : event.keyCode;
    return 46 != r && 45 != r && r > 31 && 43 != r && (48 > r || r > 57) ? !1 : !0
}

function removeErrMsg(e) {
    "user-country" == e ? $("#user-country-div").removeClass("error") : $("#" + e).removeClass("error"), $("#" + e + "-err").html(""), $("#" + e + "-err1").html("")
}

function isNumberKey(e) {
    var r = e.which ? e.which : event.keyCode;
    return 46 != r && 45 != r && r > 31 && 43 != r && (48 > r || r > 57) ? !1 : !0
}

function removeErrMsg(e) {
    "user-country" == e ? $("#user-country-div").removeClass("error") : $("#" + e).removeClass("error"), $("#" + e + "-err").html(""), $("#" + e + "-err1").html("")
}

$(document).ready(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    });
    var e = $(".featured_slider");
    e.owlCarousel({
        singleItem: !0,
        pagination: !0,
        autoPlay: 3e3
    }), $(".satifaction_sec li a.satisfaction_pop,.bill_satisfaction a.satisfaction_pop,.advantage_satisfan img").click(function() {
        $(".pop-up-box1").show()
    }), $(".pop-up-box1 .popup_cross").click(function() {
        $(".pop-up-box1").hide()
    }), $(".satifaction_sec li a.billing_pop ,.bill_satisfaction a.billing_pop").click(function() {
        $(".pop-up-box").show()
    }), $(".pop-up-box .popup_cross").click(function() {
        $(".pop-up-box").hide()
    }), $(".free_trail_btn a.free-trial").click(function() {
        $(".pop-up-box2").show()
    }), $(".pop-up-box2 .popup_cross").click(function() {
        $(".pop-up-box2").hide()
    }), $(".bnr_inner_btm a.get_rdy1").click(function() {
        $(".pop-up-box2").show()
    }), $(".free_trail_btn a.free-book").click(function() {
        $(".pop-up-box3").show()
    }), $(".pop-up-box3 .popup_cross").click(function() {
        $(".pop-up-box3").hide()
    }), $(".freq_list li h6").click(function() {
        return $(this).next(".freq_list li p").slideToggle(), $(this).toggleClass("active"), $(this).parent().siblings().children().removeClass("active"), $(this).parent().siblings().children().next().slideUp(), !1
    }), values = new Array, i = 0, jQuery("input[type=text],input[type=email],input[type=password],textarea").each(function() {
        values[i] = jQuery(this).val(), jQuery(this).attr("dval", i), i++
    }), jQuery("input[type=text],input[type=email],input[type=password],textarea").focus(function() {
        dval = jQuery(this).attr("dval"), val = jQuery(this).val(), val == values[dval] && jQuery(this).val("")
    }), jQuery("input[type=text],input[type=email],input[type=password],textarea").blur(function() {
        dval = jQuery(this).attr("dval"), val = jQuery(this).val(), "" == val && jQuery(this).val(values[dval])
    }), $(".testimonial_slder ul").bxSlider({
        auto: !0,
        mode: "fade",
        controls: !1
    });
    var r = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0,
        callback: function(e) {}
    });
    r.init()
}), $("#submitFrm").click(function() {
    $("#user-name,#user-email,#user-phone,#user-req").removeClass("error"), $("#user-name-err,#user-name-err1,#user-email-err,#user-phone-err,#user-message-err").html("");
    var e = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,17}|[0-9]{1,3})(\]?)$/,
        r = /^[A-Za-z ]{2,}/,
        //i = /^(?=(.*\d){1,})[\d\(\)\s+-]{1,}$/,
        i = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/,
        a = $.trim($("#user-name").val()),
        t = $.trim($("#user-email").val()),
        o = $.trim($("#user-phone").val()),
        m = $.trim($("#user-req").val());
    return "" === a ? ($("#user-name").addClass("error"), $("#user-name-err1").text("Please fill name"), $("#user-name").focus(), !1) : r.test(a) ? "" == t ? ($("#user-email").addClass("error"), $("#user-email-err").html("Please fill email id"), $("#user-email").focus(), !1) : e.test(t) ? "" == o ? ($("#user-phone").addClass("error"), $("#user-phone-err").html("Please fill contact number"), $("#user-phone").focus(), !1) : "" == m ? ($("#user-req").addClass("error"), $("#user-message-err").text("Please fill your requirements"), $("#user-req").focus(), !1) : i.test(o) ? void $("#contact-frm").submit() : ($("#user-phone").addClass("error"), $("#user-phone-err").html("Please enter valid contact number"), $("#user-phone").focus(), !1) : ($("#user-email").addClass("error"), $("#user-email-err").html("Please fill valid email id"), $("#user-email").focus(), !1) : ($("#user-name").addClass("error"), $("#user-name-err1").html("Please enter valid name"), $("#user-name").focus(), !1)
}), $("#submitHireDevFrm").click(function() {
    $("#hire-user-name,#hire-user-email,#hire-user-phone,#hire-user-req").removeClass("error"), $("#hire-user-name-err,#hire-user-name-err1,#hire-user-email-err,#hire-user-phone-err,#hire-user-message-err").html("");
    var e = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,17}|[0-9]{1,3})(\]?)$/,
        r = /^[A-Za-z ]{2,}/,
        //i = /^(?=(.*\d){1,})[\d\(\)\s+-]{1,}$/,
        i = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/,
        a = $.trim($("#hire-user-name").val()),
        t = $.trim($("#hire-user-email").val()),
        o = $.trim($("#hire-user-phone").val()),
        m = $.trim($("#hire-user-req").val());
    return "" === a ? ($("#hire-user-name").addClass("error"), $("#hire-user-name-err1").text("Please fill name"), $("#hire-user-name").focus(), !1) : r.test(a) ? "" == t ? ($("#hire-user-email").addClass("error"), $("#hire-user-email-err").html("Please fill email id"), $("#hire-user-email").focus(), !1) : e.test(t) ? "" == o ? ($("#hire-user-phone").addClass("error"), $("#hire-user-phone-err").html("Please fill contact number"), $("#hire-user-phone").focus(), !1) : "" == m ? ($("#hire-user-req").addClass("error"), $("#hire-user-message-err").text("Please fill your requirements"), $("#hire-user-req").focus(), !1) : i.test(o) ? void $("#hire-contact-frm").submit() : ($("#hire-user-phone").addClass("error"), $("#hire-user-phone-err").html("Please enter valid contact number"), $("#hire-user-phone").focus(), !1) : ($("#hire-user-email").addClass("error"), $("#hire-user-email-err").html("Please fill valid email id"), $("#hire-user-email").focus(), !1) : ($("#hire-user-name").addClass("error"), $("#hire-user-name-err1").html("Please enter valid name"), $("#hire-user-name").focus(), !1)
}), $(window).resize(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    })
}), $(window).load(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    }), $(".banner-animation").attr("id", "animate-area")
}), /*$("#user-phone").bind("keypress", function(e) {
    0 == $("#DivisionName").val().length && (e.which < 48 || e.which > 57 && e.which < 65 || e.which > 90 && e.which < 97 || e.which > 122) && e.preventDefault()
})*/ $(document).ready(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    });
    var e = $(".featured_slider");
    e.owlCarousel({
        singleItem: !0,
        pagination: !0,
        autoPlay: 3e3
    }), $(".satifaction_sec li a.satisfaction_pop,.bill_satisfaction a.satisfaction_pop,.advantage_satisfan img").click(function() {
        $(".pop-up-box1").show()
    }), $(".pop-up-box1 .popup_cross").click(function() {
        $(".pop-up-box1").hide()
    }), $(".satifaction_sec li a.billing_pop ,.bill_satisfaction a.billing_pop").click(function() {
        $(".pop-up-box").show()
    }), $(".pop-up-box .popup_cross").click(function() {
        $(".pop-up-box").hide()
    }), $(".free_trail_btn a.free-trial").click(function() {
        $(".pop-up-box2").show()
    }), $(".pop-up-box2 .popup_cross").click(function() {
        $(".pop-up-box2").hide()
    }), $(".bnr_inner_btm a.get_rdy1").click(function() {
        $(".pop-up-box2").show()
    }), $(".free_trail_btn a.free-book").click(function() {
        $(".pop-up-box3").show()
    }), $(".pop-up-box3 .popup_cross").click(function() {
        $(".pop-up-box3").hide()
    }), /*$(".freq_list li h6").click(function() {
        return $(this).next(".freq_list li p").slideToggle(), $(this).toggleClass("active"), $(this).parent().siblings().children().removeClass("active"), $(this).parent().siblings().children().next().slideUp(), !1
    }),*/ values = new Array, i = 0, jQuery("input[type=text],input[type=email],input[type=password],textarea").each(function() {
        values[i] = jQuery(this).val(), jQuery(this).attr("dval", i), i++
    }), jQuery("input[type=text],input[type=email],input[type=password],textarea").focus(function() {
        dval = jQuery(this).attr("dval"), val = jQuery(this).val(), val == values[dval] && jQuery(this).val("")
    }), jQuery("input[type=text],input[type=email],input[type=password],textarea").blur(function() {
        dval = jQuery(this).attr("dval"), val = jQuery(this).val(), "" == val && jQuery(this).val(values[dval])
    }), $(".testimonial_slder ul").bxSlider({
        auto: !0,
        mode: "fade",
        controls: !1
    });
    var r = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0,
        callback: function(e) {}
    });
    r.init()
}), $("#submitFrm").click(function() {
    $("#user-name,#user-email,#user-phone").removeClass("error"), $("#user-name-err,#user-name-err1,#user-email-err,#user-phone-err").html("");
    var e = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,17}|[0-9]{1,3})(\]?)$/,
        r = /^[A-Za-z ]{2,}/,
        //i = /^(?=(.*\d){1,})[\d\(\)\s+-]{1,}$/,
        i = /^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/,
        a = $.trim($("#user-name").val()),
        t = $.trim($("#user-email").val()),
        o = $.trim($("#user-phone").val());
    return "" === a ? ($("#user-name").addClass("error"), $("#user-name-err1").text("Please fill name"), $("#user-name").focus(), !1) : r.test(a) ? "" == t ? ($("#user-email").addClass("error"), $("#user-email-err").html("Please fill email id"), $("#user-email").focus(), !1) : e.test(t) ? "" == o ? ($("#user-phone").addClass("error"), $("#user-phone-err").html("Please fill contact number"), $("#user-phone").focus(), !1) : "" == m ? ($("#user-req").addClass("error"), $("#user-message-err").text("Please fill your requirements"), $("#user-req").focus(), !1) : i.test(o) ? void $("#contact-frm").submit() : ($("#user-phone").addClass("error"), $("#user-phone-err").html("Please enter valid contact number"), $("#user-phone").focus(), !1) : ($("#user-email").addClass("error"), $("#user-email-err").html("Please fill valid email id"), $("#user-email").focus(), !1) : ($("#user-name").addClass("error"), $("#user-name-err1").html("Please enter valid name"), $("#user-name").focus(), !1)
}), $(window).resize(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    })
}), $(window).load(function() {
    $(window).width() > 767 && $(window).scroll(function() {
        var e = $(".header"),
            r = $(window).scrollTop();
        r >= $(".header").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    }), $(".banner-animation").attr("id", "animate-area")
}), $("#user-phone").bind("keypress", function(e) {
    0 == $("#DivisionName").val().length && (e.which < 48 || e.which > 57 && e.which < 65 || e.which > 90 && e.which < 97 || e.which > 122) && e.preventDefault()
}), $(window).on("resize", function(e) {
    /*$(window).width() <= 768 && $(".technly_sbmenu a#mob_main_hire_manu").click(function(e) {
        e.preventDefault()
    })*/
}), $(window).load(function(e) {
    /*$(window).width() <= 768 && $(".technly_sbmenu a#mob_main_hire_manu").click(function(e) {
        e.preventDefault()
    }), 1024 == $(window).width() && 768 == $(window).height() && $(".technly_sbmenu a#mob_main_hire_manu").click(function(e) {
        e.preventDefault()
    })*/
});

$(document).ready(function() {
	
$('.testimonial_slide1').owlCarousel({    
	items:1,
    slideSpeed: 100,
    autoPlay: true,
    stopOnHover: false,
    pagination: false,
    navigation: false,
	
	responsive : {
          0 : {
              items: 1
          },
          1024 : {
              items: 1
          },
		  
		  768 : {
              items: 1
          },
		  
		   479 : {
              items: 1
          },
         
          1200 : {
              items: 1
          },
          
      }
	
	
});

$('.testimonial_slide2').owlCarousel({
    items:1,
    slideSpeed: 100,
    autoPlay: true,
    stopOnHover: false,
    pagination: false,
    navigation: false,
	
	responsive : {
          0 : {
              items: 1
          },
          1024 : {
              items: 1
          },
		  
		  768 : {
              items: 1
          },
		  
		  479 : {
              items: 1
          },
         
          1200 : {
              items: 1
          },
          
      }
	
});
	
	
    $(this).scrollTop(0);
        
    var y = $('<div class="banner-mobile-cust"><div class="container"></div></div>');
    $(".appModernization_page .outer_bnr_img").append(y);
    var x = $(".appModernization_page .outer_bnr_img .index_bnr_otr .bnr_inner").clone().addClass('cust');
    $(".banner-mobile-cust .container").append(x);
    $(".appModernization_page .bnr_inner.cust h2").removeClass("wow fadeIn   animated").css("visibility", "visible");

    var yMaintenance = $('<div class="banner-mobile-cust"><div class="container"></div></div>');
    $(".appMaintenance_page .outer_bnr_img").append(yMaintenance);
    var xMaintenance = $(".appMaintenance_page .outer_bnr_img .index_bnr_otr .bnr_inner").clone().addClass('cust');
    $(".banner-mobile-cust .container").append(xMaintenance);
    $(".appMaintenance_page .bnr_inner.cust h2").removeClass("wow fadeIn   animated").css("visibility", "visible");

    var yDevelopmnt = $('<div class="banner-mobile-cust"><div class="container"></div></div>');
    $(".appDevelopmnt_page .outer_bnr_img").append(yDevelopmnt);
    var xDevelopmnt = $(".appDevelopmnt_page .outer_bnr_img .index_bnr_otr .bnr_inner").clone().addClass('cust');
    $(".banner-mobile-cust .container").append(xDevelopmnt);
    $(".appDevelopmnt_page .bnr_inner.cust h2").removeClass("wow fadeIn   animated").css("visibility", "visible");

    var yQAServices = $('<div class="banner-mobile-cust"><div class="container"></div></div>');
    $(".QAServices_page .outer_bnr_img").append(yQAServices);
    var xQAServices = $(".QAServices_page .outer_bnr_img .index_bnr_otr .bnr_inner").clone().addClass('cust');
    $(".banner-mobile-cust .container").append(xQAServices);
    $(".QAServices_page .bnr_inner.cust h2").removeClass("wow fadeIn   animated").css("visibility", "visible");

    
    $('.Dsamples_slider').bxSlider({
        auto: true,
        pause: 10000,
        pager: true,
        controls :false,
        touchEnabled: false
    }); 
    $(".testimonial_slderNew ul").bxSlider({
        auto: !0,
        mode: "fade",
        pager: false,
        controls :true
    });
    
    
});




/* Ved Prakash JS  start */
$('.mob_icon2').click(function(){
 $(".header_new .menu_new").css("display", "block");
});

$('body').delegate('.mob_close_icon','click', function(){
  $('.header_new .menu_new').css('display','none');
});


// top header fixed


jQuery('.sub-menu-levl2').hover(function(){
  jQuery('.sub-menu-levl2').removeClass('active');
  jQuery(this).addClass('active');
 });


$(document).ready(function() {

    var men = $(".header_new .menu_new");
    $(".mob_item_new2").append(men), 

    $(".mob_icon2").click(function(men) {
        men.preventDefault(), $(this).hasClass("mob_close_icon") || ($(".layout_outer").css({   
            overflow: "hidden"
        }), $(".mob_item_new2").animate({
            right: "0px"
        }, 300, function() {}), $(".outer_wrapper_new").css({
            position: "relative",
            right: "0"
        }).animate({
            right: "260px"
        }, 300, function() {
            $(".mob_icon2").addClass("mob_close_icon")
        }))
        
    }), 

       $(document).on("click", ".mob_close_icon", function(men) {
        men.preventDefault(), $(".mob_icon2").animate({
            right: "-260px"
        }, 300, function() {}), $(".outer_wrapper_new").animate({
            right: "0px"
        }, 300, function() {
            $(".mob_icon2").removeClass("mob_close_icon"), $(".layout_outer").css({
                overflow: "visible"
            }), $(".outer_wrapper_new").css({
                position: "",
                right: ""
            })
        })
    });

   
});
   
  
	
$(document).on("click", ".menu_new li.menu_arrow > a", function() {
     
    if ($(window).width() < 768) {
        $(this).parent().find(".sub_menu_new").slideToggle("fast"),
        $("#mob_main_hire_manu").attr("href", "javascript:void(0)");
        $("#mob_main_service_manu").attr("href", "javascript:void(0)");
        $("#mob_main_about_manu").attr("href", "javascript:void(0)");
    } else {
        $("#mob_main_hire_manu").attr("href", "hire-developers");
        $("#mob_main_service_manu").attr("href", "application-development");
        $("#mob_main_about_manu").attr("href", "about");
    }

    });


/*$(document).on("click", ".hire_devl .sub-menu-levl2 a", function() {
    
     if ($(window).width() < 768) {
        $(this).parent().find(".sub_menu_2").slideToggle()
    };
     });*/


$(document).ready(function() {
    $(window).scroll(function() {
        var e = $(".header_new"),
            r = $(window).scrollTop();
        r >= $(".header_new").outerHeight() ? e.addClass("fixed") : e.removeClass("fixed")
    });
	$(".team_slider").bxSlider({infiniteLoop: !0, controls: !1, pager: !1, auto: !0, pause: 3e3});
});


/* Ved Prakash JS  end */

$(document).on("click", ".mob_icon2", function() {
	$('body').addClass('current');
});
$(document).on("click", ".mob_close_icon", function() {
	$('body').removeClass('current');
});




$(document).ready(function(){

    
//currency toggle

			$(".money-type li").click(function(){
				$(".money-type li").removeClass("active");
				$(this).addClass("active");	
			});	
//more list
	$('.more-list').click(function(){ 
		$(this).parent().siblings('li.more-feature').css("display","block");
		$(this).css("display","none");
	});	
//help
         $(".help-logo").click(function(e){
			     e.stopPropagation();
				$(".ivf-Help-menu").slideToggle();
				$(this).toggleClass("active");
		 });
        $("html").click(function () {
				$(".ivf-Help-menu").slideUp();
				$(".help-logo").removeClass("active");
				$(".ivf-profile-option").css("width","0");
				
			});
//profile  
$(".profile-logo").click(function(){
			$(".ivf-profile-option").animate({
			width:'100%',
            height:'100%'
         },40);
    
         });
       			
});
function goTo(a)
{
    for(var i=1;i<=4;i++)
    {
        if(i==a){ $("#step"+i+"Id").slideDown(400);}
        else{ $("#step"+i+"Id").hide();  }
    }
}   
        
        
        
        
$(document).ready(function(){
 $("#closeId").click(function(){
    $("#YearBenefit").hide(100); 
 })
}); 
 function tgl(a){
if(a==1){  $("#YearBenefit").hide(100);} 
     else {$("#YearBenefit").slideDown(100);}
 }


        $(document).ready(function () {
            //for file uploaded
            $('#footerFormFile').on('change', function () {
                alert($('#footerFormFile').val());
                if ($('#footerFormFile').val() != '') {
                    $('#filetext').show();
                    $('#filetext').html("File : " + $('#footerFormFile').val().toString());
                } else {
                    $('#filetext').hide();
                }

            });
            //for tabbing 
        $('.nav-pills li a').on('click', function () {
            // alert($(this).attr('data-toggle'));
            $('.nav-pills li').removeClass('active');
            $(this).parents('li').addClass('active');
            $('.tab-content .tab-pane').removeClass('active');
            $("#" + $(this).attr('data-toggle')).addClass('active');
        });

        });
		
		


$(document).ready(function(){
    $(".box1 .click_icons_sample").click(function(){
        $(".box1 .hover-cont").addClass("active");
    });
	
	$(".box1 .close_icons_sample").click(function(){
   $(".box1 .hover-cont").removeClass("active");
});


 $(".box2 .click_icons_sample").click(function(){
        $(".box2 .hover-cont").addClass("active");
    });
	
	$(".box2 .close_icons_sample").click(function(){
   $(".box2 .hover-cont").removeClass("active");
});

 $(".box3 .click_icons_sample").click(function(){
        $(".box3 .hover-cont").addClass("active");
    });


$(".box3 .close_icons_sample").click(function(){
   $(".box3 .hover-cont").removeClass("active");
});


 $(".box4 .click_icons_sample").click(function(){
        $(".box4 .hover-cont").addClass("active");
    });


$(".box4 .close_icons_sample").click(function(){
   $(".box4 .hover-cont").removeClass("active");
});



 $(".box5 .click_icons_sample").click(function(){
        $(".box5 .hover-cont").addClass("active");
    });


$(".box5 .close_icons_sample").click(function(){
   $(".box5 .hover-cont").removeClass("active");
});



$('.form-control').focus( function() {
 $(this).siblings().addClass('active');
 // console.log(x);
});

$('.form-control').blur( function() {
  $(this).siblings().removeClass('active');
});


	
});	








$( document ).ready(function() {
    // tabbed content
	
	
	/*hide all content tab by default*/
    $(".tab_content").hide();
	
	/*shown first content tab by default*/
    $(".tab_content:first").show();
	

  /* if in tab mode */
    $("ul.tabs li").click(function() {

      $(".tab_content").hide();	  
      var activeTab = $(this).attr("rel"); 

      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".accordian").removeClass("accord_active");
	  $(".accordian[rel^='"+activeTab+"']").addClass("accord_active");	  
    });
	
	
	/* if in accordian mode */
	$(".accordian").click(function() {      
      $(".tab_content").slideUp();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).slideDown();
	  
	  $(".accordian").removeClass("accord_active");
      $(this).addClass("accord_active");
	  
	  $("ul.tabs li").removeClass("active");
	  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
	
	
	/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
	$('ul.tabs li').last().addClass("tab_last");
	
	
});






$('.technology_slider').owlCarousel({
    items:6,
    slideSpeed: 500,
    autoPlay: false,
    stopOnHover: true,
    pagination: true,
    navigation: false,
	
	responsive : {
          0 : {
              items: 10
          },
          1024 : {
              items: 8
          },
		  
		  768 : {
              items: 3
          },
		  
		  479 : {
              items: 3
          },
         
          1200 : {
              items: 1
          },
          
      }
	
});



$('.micro_slider').owlCarousel({
    items:3,
    slideSpeed: 500,
    autoPlay: true,
    stopOnHover: true,
    pagination: true,
    navigation: false,
	
	responsive : {
          0 : {
              items: 10
          },
          1024 : {
              items: 8
          },
		  
		  768 : {
              items: 1
          },
		  
		  479 : {
              items: 3
          },
         
          1200 : {
              items: 1
          },
          
      }
	
});





$(document).ready(function(){
    $(".mobile_click").click(function(){        
        $(".mobile_click_cont").fadeIn( 1000 );
        $(".micro_click_cont").hide();
        $(".php_click_cont").hide();
        $(".ecommerce_click_cont").hide();
        $(".jawa_click_cont").hide();
        $(".others_click_cont").hide();
        $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });
    $(".micro_click").click(function(){		
        $(".mobile_click_cont").hide();
        $(".micro_click_cont").fadeIn( 1000 );
        $(".php_click_cont").hide();
        $(".ecommerce_click_cont").hide();
        $(".jawa_click_cont").hide();
        $(".others_click_cont").hide();
        $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });
    $(".php_click").click(function(){        
        $(".mobile_click_cont").hide();
        $(".micro_click_cont").hide();
        $(".php_click_cont").fadeIn( 1000 );
        $(".ecommerce_click_cont").hide();
        $(".jawa_click_cont").hide();
        $(".others_click_cont").hide();
        $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });
    $(".ecommerce_click").click(function(){        
        $(".mobile_click_cont").hide();
        $(".micro_click_cont").hide();
        $(".php_click_cont").hide();
        $(".ecommerce_click_cont").fadeIn( 1000 );
        $(".jawa_click_cont").hide();
        $(".others_click_cont").hide();
       $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });
    $(".jawa_click").click(function(){        
        $(".mobile_click_cont").hide();
        $(".micro_click_cont").hide();
        $(".php_click_cont").hide();
        $(".ecommerce_click_cont").hide();
        $(".jawa_click_cont").fadeIn( 1000 );
        $(".others_click_cont").hide();
       $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });

    $(".others_click").click(function(){        
        $(".mobile_click_cont").hide();
        $(".micro_click_cont").hide();
        $(".php_click_cont").hide();
        $(".ecommerce_click_cont").hide();
        $(".jawa_click_cont").hide();
        $(".others_click_cont").fadeIn( 1000 );
        $(".slider_sec_main").find(".img_box").removeClass('active_click');
        $(this).children().find('.img_box').addClass('active_click');
		$(this).children().find('.img_box').addClass('borderClr');
    });
    
    var textarea = document.querySelector('.textarea_requirment');

    textarea.addEventListener('keydown', autosize);

    function autosize(){
      var el = this;
      setTimeout(function(){
        el.style.cssText = 'height:auto; padding-left:20px';
        
        if(el.scrollHeight>=160)
            el.style.cssText = 'height:250px';
      },0);
    }

});


