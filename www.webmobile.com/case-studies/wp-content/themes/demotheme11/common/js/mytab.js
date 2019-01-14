$( document ).ready(function() {
    // tabbed content
	
	
	/*hide all content tab by default*/
    $(".tab_content").hide();
	
	/*shown first content tab by default*/
    $(".tab_content:first").show();
	

  /* if in tab mode */
    $("ul.tabs li").click(function() {
    	//alert('abc');
      $(".tab_content").hide();	  
      var activeTab = $(this).attr("rel"); 

      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".accordian").removeClass("accord_active");
	  $(".accordian[rel^='"+activeTab+"']").addClass("accord_active");	  
    });
	
	
	/* if in accordian mode */
	$(".accordian").click(function() { // alert('hello');    
      $(".tab_content").slideUp();
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      alert(d_activeTab);
      //$("#"+d_activeTab).slideDown();
      $("#"+d_activeTab).show();
	  
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

// bind filter button click
$('#filters1').on( 'click', 'button', function() {

  var filterValue = $( this ).attr('data-filter');
  $(this).addClass('active').siblings().removeClass('active');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// bind filter button click
$('#filters2').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  $(this).addClass('active').siblings().removeClass('active');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// bind filter button click
$('#filters3').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  $(this).addClass('active').siblings().removeClass('active');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});