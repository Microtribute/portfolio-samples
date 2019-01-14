/*
 * Ajax Load More
 * http://wordpress.org/plugins/ajax-load-more/
 * https://connekthq.com/plugins/ajax-load-more/
 *
 * Copyright 2016 Connekt Media - https://connekthq.com
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Author: Darren Cooney
 * Twitter: @KaptonKaos
 */
 
(function ($) {	
   "use strict";   
      
   $.ajaxloadmore = function (el, e) {
            
      //Prevent loading of unnessasry posts - move user to top of page
      if(alm_localize.scrolltop === 'true'){
         $(window).scrollTop(0); 
      }
      //Set variables
      var alm = this;
      alm.AjaxLoadMore = {};
      alm.page = 0;
      alm.posts = 0;
      alm.totalposts = 0;
      alm.proceed = false;
      alm.disable_ajax = false;
      alm.init = true;
      alm.loading = true;
      alm.finished = false;
      alm.window = $(window);
      alm.button_label = '';
      alm.data;
      alm.el = el;
      alm.container = el;
      alm.container.addClass('alm-'+e).attr('data-alm-id', e); // Add unique classname and data id
      alm.content = $('.alm-ajax', alm.container);
      alm.content_preloaded = $('.alm-listing.alm-preloaded', alm.container);
      alm.canonical_url = alm.el.attr('data-canonical-url');
      alm.slug = alm.el.attr('data-slug');
      alm.prefix = 'alm-';
      alm.cache = alm.content.attr('data-cache'); // cache (true/false) 
      alm.cache_id = alm.content.attr('data-cache-id'); // cache value 
      alm.cache_path = alm.content.attr('data-cache-path'); // cache path 
      alm.cache_logged_in = alm.content.attr('data-cache-logged-in'); // cache logged in (settings) 
      alm.repeater = alm.content.attr('data-repeater');      
      alm.theme_repeater = alm.content.attr('data-theme-repeater');
      
      alm.scroll_distance = parseInt(alm.content.attr('data-scroll-distance'));
      alm.max_pages = parseInt(alm.content.attr('data-max-pages'));
      alm.pause_override = alm.content.attr('data-pause-override'); // true | false  
      alm.pause = alm.content.attr('data-pause'); // true | false 
      alm.transition = alm.content.attr('data-transition'); 
      alm.transition_container = alm.content.attr('data-transition-container');
      alm.speed = alm.content.attr('data-transition-speed');
      alm.images_loaded = alm.content.attr('data-images-loaded');
      alm.destroy_after = alm.content.attr('data-destroy-after');
      alm.lang = alm.content.attr('data-lang');
      alm.orginal_posts_per_page = alm.content.attr('data-posts-per-page'); // Used for paging add-on
      alm.posts_per_page = alm.content.attr('data-posts-per-page');  
      
      alm.cta_array =  '';
      alm.cta = alm.content.attr('data-cta'); // is Alternating Templates enabled?
      alm.cta_position = alm.content.attr('data-cta-position');
      alm.cta_repeater = alm.content.attr('data-cta-repeater');
      alm.cta_theme_repeater = alm.content.attr('data-cta-theme-repeater');
      
      alm.previous_post = alm.content.attr('data-previous-post'); // Next Post add-on  
      alm.previous_post_id = alm.content.attr('data-previous-post-id'); // Get the post id 
      alm.previous_post_taxonomy = alm.content.attr('data-previous-post-taxonomy'); // Get the post taxonomy   
      
      alm.comments = alm.content.attr('data-comments'); // true | false 
      // if comments, then set alm.content to comments wrap
      if(alm.comments === 'true'){
         alm.content = $('.alm-comments', alm.container);
      }
      alm.comments_array =  '';
      alm.comments_post_id = alm.content.attr('data-comments_post_id'); // current post id  
      alm.comments_per_page = alm.content.attr('data-comments_per_page');  
      alm.comments_type = alm.content.attr('data-comments_type');    
      alm.comments_style = alm.content.attr('data-comments_style');    
      alm.comments_template = alm.content.attr('data-comments_template'); 
      alm.comments_callback = alm.content.attr('data-comments_callback');   
      
      alm.restapi = alm.content.attr('data-restapi');
      alm.restapi_base_url = alm.content.attr('data-restapi-base-url');
      alm.restapi_namespace = alm.content.attr('data-restapi-namespace');
      alm.restapi_endpoint = alm.content.attr('data-restapi-endpoint');
      alm.restapi_template_id = alm.content.attr('data-restapi-template-id');
      alm.restapi_debug = alm.content.attr('data-restapi-debug');
      
      alm.seo = alm.content.attr('data-seo'); // true | false 
      
      alm.preloaded = alm.content.attr('data-preloaded'); // true | false 
      alm.preloaded_amount = alm.content.attr('data-preloaded-amount'); // 0   
      
      alm.paging = alm.content.attr('data-paging'); // is paging enabled 
      alm.paging_controls = alm.content.attr('data-paging-controls');
      alm.paging_show_at_most = alm.content.attr('data-paging-show-at-most');
      alm.paging_classes = alm.content.attr('data-paging-classes');   
      alm.paging_init = true;  
      
      
      /* REST API */
		if(alm.restapi === 'true'){
			alm.restapi = true;				
			
			if(alm.restapi_debug === undefined){
   			alm.restapi_debug = false;
			}	
			if(alm.restapi_template_id === ''){
   			alm.restapi = false;
			}
			
		}else{
   		alm.restapi = false;
		}
      /* End REST API  */
       
       
		/* Paging */
		if(alm.paging === 'true'){
			alm.paging = true;	
			if(alm.paging_show_at_most === undefined){
   			alm.paging_show_at_most = 7;
			}	
			// if paging and preload then pause.
			if(alm.preloaded === 'true'){
				alm.pause = true;
			}
		}else{
			alm.paging = false;
		}
		
		if(alm.paging_controls === 'true'){
			alm.paging_controls = true;		
		}else{
			alm.paging_controls = false;
		}		
      /* End Paging  */
      
      
      /* Cache */
      if (alm.cache === undefined){
         alm.cache = false;
      }
           
      if (alm.cache_logged_in === undefined){
         alm.cache_logged_in = false;      
      }
      /* End Cache  */
         
         
      /* Comments */
      if (alm.comments_per_page === undefined){
         alm.comments_per_page = '5';
      }
      /* End Comments  */
         
         
      /* Preloaded */
      /* If posts_per_page <= preloaded_total_posts disable ajax load more */
      if (alm.preloaded === 'true'){
         alm.preload_wrap = alm.content.prev('.alm-preloaded');
         alm.preloaded_total_posts = parseInt(alm.preload_wrap.attr('data-total-posts'));
         if (alm.preloaded_amount === undefined){
            alm.preloaded_amount = false;
         }
         if (alm.preloaded_total_posts <= alm.preloaded_amount){
            alm.disable_ajax = true;
         }
      }else{
	      alm.preloaded = 'false';
      }
      /* End Preloaded  */
       
      
      /* SEO */                 	   
      if (alm.seo === undefined){
         alm.seo = false;      
      }
      if (alm.seo === 'true'){
         alm.seo = true; // Convert string to boolean  
      }     
      
      alm.permalink = alm.content.attr('data-seo-permalink');
      alm.pageview = alm.content.attr('data-seo-pageview');
      alm.start_page = alm.content.attr('data-seo-start-page');
      
      if(alm.start_page){      
	      
         alm.seo_scroll = alm.content.attr('data-seo-scroll');
         alm.seo_scroll_speed = alm.content.attr('data-seo-scroll-speed');
         alm.seo_scrolltop = alm.content.attr('data-seo-scrolltop');
         
	      alm.isPaged = false; 	      
	      
	      if (alm.start_page > 1) {
	         alm.isPaged = true; // Is this a $paged page > 1 ?	      
            alm.posts_per_page = alm.start_page * alm.posts_per_page;   
	      }
	      // If paging is enabled, reset our posts_per_page
	      if(alm.paging){
   	      alm.posts_per_page = alm.orginal_posts_per_page; 
	      }  
	       
      }else{
         alm.start_page = 1; 
      }
      /* End SEO  */ 
            
       
      /* Previous Post */                 	   
      if (alm.previous_post === 'true'){
         alm.previous_post = true;      
         alm.previous_post_permalink = '';
         alm.previous_post_title = '';      
      }else{
         alm.previous_post = false;
      }              	   
      if (alm.previous_post_id === undefined){
         alm.previous_post_id = '';      
      }               	   
      if (alm.previous_post_taxonomy === undefined){
         alm.previous_post_taxonomy = '';      
      }       
      alm.previous_post_title_template = alm.content.attr('data-previous-post-title-template');
      alm.siteTitle = alm.content.attr('data-previous-post-site-title');
      alm.siteTagline = alm.content.attr('data-previous-post-site-tagline');
      alm.previous_post_pageview = alm.content.attr('data-previous-post-pageview');
      alm.previous_post_scroll = alm.content.attr('data-previous-post-scroll');
      alm.previous_post_scroll_speed = alm.content.attr('data-previous-post-scroll-speed');
      alm.previous_post_scroll_top = alm.content.attr('data-previous-post-scrolltop');      
      /* End Previous Post */
      

      /* Define offset */
      if (alm.content.attr('data-offset') === undefined){
         alm.offset = 0;
      }else{
         alm.offset = alm.content.attr('data-offset');
      }      
      
      /* Check for pause on init
       * Pause could be used to hold the loading of posts for a button click.
       */
      if (alm.pause === undefined || (alm.seo && alm.start_page > 1)){// SEO only
         alm.pause = false;  
      }   
      if (alm.preloaded === 'true' && alm.seo && alm.start_page > 0){ // SEO + Preloaded
         alm.pause = false;
      }      
      if(alm.preloaded === 'true' && alm.paging){
         alm.pause = true;
      }


      /* Select the repeater template */
      if (alm.repeater === undefined){
         alm.repeater = 'default';
      }
      if (alm.theme_repeater === undefined){
         alm.theme_repeater = 'null';
      }
            

      /* Max number of pages to load while scrolling */
      if (alm.max_pages === undefined){
         alm.max_pages = 0;
      }         
      if (alm.max_pages === 0){
         alm.max_pages = 10000;
      }
      
      
      /* Scroll Distance */
      if (alm.scroll_distance === undefined){
         alm.scroll_distance = 150;
      }
      

      /* Transition Params */ 
      if (alm.transition === undefined){
         alm.transition = 'slide';
      }else if (alm.transition === "fade"){
         alm.transition = 'fade';
      }else if (alm.transition === "none"){ 
         alm.transition = 'none';
      }else {
         alm.transition = 'slide';
      }   
      
      if (alm.speed === undefined){
         alm.speed = 250;
      } else{
         alm.speed = parseInt(alm.speed);
      }
      
      if (alm.transition_container === undefined || alm.transition_container === 'true'){
         alm.transition_container = true;
      }else {
         alm.transition_container = false;
      }
      

      /* Images Loaded */ 
      if (alm.images_loaded === undefined){
         alm.images_loaded = 'false';
      }
      

      /* Destroy After */ 
      if (alm.destroy_after !== undefined) {}
      

      /* Button Labels */
      if (alm.content.attr('data-button-label') === undefined){
         alm.button_label = 'Older Posts';
      }else{
         alm.button_label = alm.content.attr('data-button-label');
      } 
      
      
      alm.button_loading_label = alm.content.attr('data-button-loading-label');
      if (alm.button_loading_label === undefined){
         alm.button_loading_label = false;
      }
       
         
      /* Button Class */  
      if (alm.content.attr('data-button-class') === undefined){
         alm.button_class = '';
      }else{
         alm.button_class = ' ' + alm.content.attr('data-button-class');
      }
      

      /* Define scroll event */
      if (alm.content.attr('data-scroll') === undefined){
         alm.scroll = true;
      }else if (alm.content.attr('data-scroll') === 'false'){
         alm.scroll = false;
      }else{
         alm.scroll = true;
      }
      

      /* Parse multiple Post Types */  
      alm.post_type = alm.content.attr('data-post-type');
      alm.post_type = alm.post_type.split(",");
      

      /* Append 'load More' button to .ajax-load-more-wrap */
      alm.container.append('<div class="' + alm.prefix + 'btn-wrap"/>');
      alm.btnWrap = $('.' + alm.prefix + 'btn-wrap', alm.container);
      if(alm.paging){ 
	      
   		// Paging add-on				
      	alm.content.parent().addClass('loading'); // add loading class to main container
      	
		}else{      	
      			
      // If paging is false      
      $('.'+ alm.prefix + 'btn-wrap', alm.container).append('<div class="col-xs-12"><div class="col-xs-12"><div class="loadMoreBlog"><span class="loderblogimg"></span><button id="load-more" class="' + alm.prefix + 'load-more-btn more'+ alm.button_class +'">' + alm.button_label + '</button></div></div></div>');
			alm.button = $('.alm-load-more-btn', alm.container);
		}



      /*  loadPosts()
       * 
       *  The function to get posts via Ajax
       *  @since 2.0.0
       */
       
      alm.AjaxLoadMore.loadPosts = function () {      
         if(!alm.disable_ajax){ // Check for ajax blocker
	         if(!alm.paging){
            	alm.button.addClass('loading');
            	if(alm.button_loading_label !== false){
               	alm.button.text(alm.button_loading_label);
            	}
            }
            alm.loading = true;        
            
            // If cache = true && cache_logged_in setting is false
            if(alm.cache === 'true' && !alm.cache_logged_in){
               
               var cache_page;
               
               if(alm.init && alm.seo && alm.isPaged){ 
                  // If the request a paged URL (/page/3/)
                  var firstpage = '1';          
                  cache_page = alm.cache_path + '/page-' + firstpage +'-'+ alm.start_page +'.html';
                  
               } else { 
                  // standard request url                  
                  cache_page = alm.cache_path + '/page-' + (alm.page + 1) +'.html';
                  
               }
               
               $.get(cache_page, function( data ) {       
                  alm.AjaxLoadMore.success(data, true); // data contains whatever the request has returned                     
               }).fail(function() { 
                  alm.AjaxLoadMore.ajax('standard'); 
               });
               
            } else { // Standard ALM query
               
               alm.AjaxLoadMore.ajax('standard');
               
            }
         }
         
      };
      
      
      
      /*  ajax()
       * 
       *  Ajax Load Moe Ajax function
       *  @since 2.6.0
       */
       
      alm.AjaxLoadMore.ajax = function (queryType) {
         
         var action = 'alm_query_posts';
         
         if(alm.previous_post){
            alm.previous_post_id = alm.content.attr('data-previous-post-id');
            alm.previous_post_taxonomy = alm.content.attr('data-previous-post-taxonomy');
         }
         
         // Comment query         
         if(alm.comments === 'true'){
            action = 'alm_comments_query';
            alm.posts_per_page = alm.comments_per_page;            
            alm.comments_array = {
               'comments': 'true',
               'post_id': alm.comments_post_id,
               'per_page': alm.comments_per_page,
               'type': alm.comments_type,
               'style': alm.comments_style,
               'template': alm.comments_template,
               'callback': alm.comments_callback,
            };
            
         }
         
         // CTA Add-on Query params         
         if(alm.cta === 'true'){            
            alm.cta_array = { 
               'cta': 'true',
               'cta_position': alm.cta_position,
               'cta_repeater': alm.cta_repeater,
               'cta_theme_repeater': alm.cta_theme_repeater,
            };            
         }              
         
         // REST API
         if(alm.restapi){
            var alm_template = wp.template(alm.restapi_template_id),
                rest_url = alm.restapi_base_url + '/' + alm.restapi_namespace + '/' + alm.restapi_endpoint,
                rest_data = {
                  posts_per_page    : alm.posts_per_page,
                  page              : alm.page,
                  offset            : alm.offset,
   	            slug              : alm.slug,
   	            canonical_url     : alm.canonical_url,
                  post_type         : alm.post_type,                  
                  post_format       : alm.content.attr('data-post-format'),
                  category          : alm.content.attr('data-category'),
                  category__not_in  : alm.content.attr('data-category-not-in'),
                  tag               : alm.content.attr('data-tag'),
                  tag__not_in       : alm.content.attr('data-tag-not-in'),
                  taxonomy          : alm.content.attr('data-taxonomy'),
                  taxonomy_terms    : alm.content.attr('data-taxonomy-terms'),
                  taxonomy_operator : alm.content.attr('data-taxonomy-operator'),
                  taxonomy_relation : alm.content.attr('data-taxonomy-relation'),
                  meta_key          : alm.content.attr('data-meta-key'),
                  meta_value        : alm.content.attr('data-meta-value'),
                  meta_compare      : alm.content.attr('data-meta-compare'),
                  meta_relation     : alm.content.attr('data-meta-relation'), 
                  meta_type         : alm.content.attr('data-meta-type'),
                  author            : alm.content.attr('data-author'),
                  year              : alm.content.attr('data-year'),
                  month             : alm.content.attr('data-month'),
                  day               : alm.content.attr('data-day'),
                  post_status       : alm.content.attr('data-post-status'),
                  order             : alm.content.attr('data-order'),
                  orderby           : alm.content.attr('data-orderby'),
                  post__in          : alm.content.attr('data-post-in'),
                  post__not_in      : alm.content.attr('data-post-not-in'),
                  search            : alm.content.attr('data-search'),
                  custom_args       : alm.content.attr('data-custom-args'),
                  lang              : alm.lang,
                  preloaded         : alm.preloaded,
                  preloaded_amount  : alm.preloaded_amount,
                  seo_start_page    : alm.start_page,
   	            id						: el.attr('data-id')
               };           
            
            $.ajax({ 
               type : "GET",
               url : rest_url,
               data: rest_data,  
               dataType: "JSON",             
               beforeSend: function () {
                  if (alm.page != 1 && !alm.paging) {
                     alm.button.addClass('loading');
                  }
               },               
               success: function (results) { 	               	                
                  var data,
                  	 html = results.html,
                  	 meta = results.meta,
                  	 postcount = meta.postcount,
                  	 totalposts = meta.totalposts;
                  	    
                  // loop results to get data from each
                  $.each(html, function(e){                     
                     var result = html[e];                                          
                     if(alm.restapi_debug === 'true'){ // If debug
                        console.log(result);
                     }                                          
                     data += alm_template(result);                                          
                  }); 
                  
                  // Create object to pass to success()
                  var obj = {
	                  'html' : data, 
	                  'meta' : {
		                  'postcount' : postcount,
		                  'totalposts' : totalposts
	                  },
	               }               
                  alm.AjaxLoadMore.success(obj, false); // Send data                                                     
               }               
            });           
         }
         
         // Standard ALM
         else {
            $.ajax({
               type: "GET",
               url: alm_localize.ajaxurl,
               dataType: "JSON",
               data: { 
                  action               : action,
   	            query_type           : queryType,
                  nonce                : alm_localize.alm_nonce,
                  cache_id             : alm.cache_id,
                  repeater             : alm.repeater,
                  theme_repeater       : alm.theme_repeater,
                  cta            		: alm.cta_array,
                  comments             : alm.comments_array,
                  post_type            : alm.post_type,
                  post_format          : alm.content.attr('data-post-format'),
                  category             : alm.content.attr('data-category'),
                  category__not_in     : alm.content.attr('data-category-not-in'),
                  tag                  : alm.content.attr('data-tag'),
                  tag__not_in          : alm.content.attr('data-tag-not-in'),
                  taxonomy             : alm.content.attr('data-taxonomy'),
                  taxonomy_terms       : alm.content.attr('data-taxonomy-terms'),
                  taxonomy_operator    : alm.content.attr('data-taxonomy-operator'),
                  taxonomy_relation    : alm.content.attr('data-taxonomy-relation'),
                  meta_key             : alm.content.attr('data-meta-key'),
                  meta_value           : alm.content.attr('data-meta-value'),
                  meta_compare         : alm.content.attr('data-meta-compare'),
                  meta_relation        : alm.content.attr('data-meta-relation'), 
                  meta_type            : alm.content.attr('data-meta-type'),
                  author               : alm.content.attr('data-author'),
                  year                 : alm.content.attr('data-year'),
                  month                : alm.content.attr('data-month'),
                  day                  : alm.content.attr('data-day'),
                  post_status          : alm.content.attr('data-post-status'),
                  order                : alm.content.attr('data-order'),
                  orderby              : alm.content.attr('data-orderby'),
                  post__in             : alm.content.attr('data-post-in'),
                  post__not_in         : alm.content.attr('data-post-not-in'),
                  exclude              : alm.content.attr('data-exclude'), // Deprecate soon in favor of post__not_in
                  search               : alm.content.attr('data-search'),
                  custom_args          : alm.content.attr('data-custom-args'),
                  posts_per_page       : alm.posts_per_page,
                  page           		: alm.page,
                  offset               : alm.offset,
                  preloaded            : alm.preloaded,
                  preloaded_amount     : alm.preloaded_amount,
                  seo_start_page       : alm.start_page,
                  paging               : alm.paging,
                  previous_post        : alm.previous_post,
                  previous_post_id     : alm.previous_post_id,
                  previous_post_taxonomy: alm.previous_post_taxonomy,
                  lang                 : alm.lang,
   	            slug                 : alm.slug,
   	            canonical_url        : alm.canonical_url,
   	            id							: el.attr('data-id')
               },
               
               beforeSend: function () {
                  if (alm.page != 1 && !alm.paging) {
                     alm.button.addClass('loading');
                  }
               },
               
               success: function (data) {
                  //console.log(data);
   	            if(queryType === 'standard'){
                  	alm.AjaxLoadMore.success(data, false);
                  }
                  else if(queryType === 'totalposts' && alm.paging){	  
   	               if($.isFunction($.fn.almBuildPagination)){   
                  		$.fn.almBuildPagination(data, alm);
                  	}
                  }              
                  
               },
               
               error: function (jqXHR, textStatus, errorThrown) {
                  alm.AjaxLoadMore.error(jqXHR, textStatus, errorThrown);
               }
               
            });
         }                   
      };     
      
      
      
      // If pagination enabled, run totalposts query
      if(alm.paging){ 
         alm.AjaxLoadMore.ajax('totalposts'); // Create paging menu and query for total posts
      }
      
      
      
      /*  success()
       * 
       *  Success function after loading data
       *  @since 2.6.0
       */
       
      alm.AjaxLoadMore.success = function (data, is_cache) {    

         if(alm.previous_post){ // Get previous page data	         
            alm.AjaxLoadMore.getPreviousPost();           
         }   
           
         var html, meta, total;                  
         
         if(is_cache){            
            // If content is cached don't look for json data - we won't be querying the DB.
            html = data;                  
         }else{       
	         // Standard ALM query results     
            html = data.html;
            meta = data.meta;
            alm.posts = alm.posts + meta.postcount;       
	         total = meta.postcount;  
            alm.totalposts = meta.totalposts;
            if(alm.preloaded === 'true'){
	            alm.totalposts = alm.totalposts - alm.preloaded_amount;
            }            
         }
         
         alm.data = $(html); // data converted to an object 
          
         if(is_cache){ // If cache, get the length of the data object
	      	total = alm.data.length; 
	      }
         
         // First Run
         if (alm.init) {             
	         
	         if(!alm.paging){   	         
            	alm.button.text(alm.button_label);            	
            } else {                
               // Is pagination
               if (total > 0) {            
                  alm.el = $('<div class="alm-reveal"/>');
                  alm.el.append('<div class="alm-paging-content"></div><div class="alm-paging-loading"></div>');
                  $('.alm-paging-content', alm.el).append(alm.data).hide();
                  alm.content.append(alm.el);                  
               	alm.content.parent().removeClass('loading'); // Remove loading class from main container               	 
						alm.AjaxLoadMore.resetBtnText();
			         
                  $('.alm-paging-content', alm.el).fadeIn( alm.speed, 'alm_easeInOutQuad', function(){  
	                  var paddingT = parseInt(alm.content.css('padding-top')),
								 paddingB = parseInt(alm.content.css('padding-bottom'));                   
                     alm.content.css('height', alm.el.height() + paddingT + paddingB + 'px');
                     if ($.isFunction($.fn.almFadePageControls)){
                        $.fn.almFadePageControls(alm.btnWrap);     
                     }
                  });
               }               
            }
            
            // ALM Empty
            if(total === 0){
               if ($.isFunction($.fn.almEmpty)) {
                  $.fn.almEmpty(alm);
               }
            }
            
            // isPaged
            if(alm.isPaged){ 
               alm.posts_per_page = alm.content.attr('data-posts-per-page'); // Reset our posts per page variable
               alm.page = alm.start_page - 1; // Set our new page #
            } 
                               
         }        
         
         
         if (total > 0) {
            
            // Results!
            if(!alm.paging){
               
               if(alm.previous_post){ // If Previous Post, create container and append data              
               	
               	alm.el = $('<div class="alm-reveal alm-previous-post post-'+alm.previous_post_id+'" data-id="'+alm.previous_post_id+'" data-title="'+alm.previous_post_title+'" data-url="'+alm.previous_post_permalink+'"/>');	  
               	alm.el.append(alm.data).hide();   
               	       
               } else {
                        
                  if(!alm.transition_container){ 
                     // No transiton container
                     
                     alm.data.hide();
                     alm.el = alm.data;
                     
                  } else { 
                     // Standard container
                     
                     // SEO
                     if (alm.init && alm.start_page > 1){
                        // loop through items and break into separate alm-reveal divs for paging
                        
                        var data = [],
                            posts_per_page = parseInt(alm.posts_per_page);
                        
                        if(alm.cta === 'true'){
                           // If CTA, +1 to posts_per_page to offset the CTA template and correct the display
                           posts_per_page = posts_per_page + 1; 
                        }  
                        
                        var pages = Math.ceil(total/posts_per_page); // slice data array into pages
                        for (var i = 0; i < total; i += posts_per_page) {
                           data.push(alm.data.slice(i, posts_per_page + i));
                        }   
                        
                        alm.el = alm.content; // Set alm.el to be alm-listing div
                        for (var k = 0; k < data.length; k++){
                           
                           var p = 0; // Add 1 page if items are preloaded.
                           if(alm.preloaded === 'true'){
                              p = 1;
                           }
                           
                           var div;
                           if(k > 0 || alm.preloaded === 'true'){ // > Paged                              
                              var pagenum = (k + 1 + p);
                              if(alm.permalink === 'default'){
                                 div = $('<div class="alm-reveal alm-seo" data-url="'+alm.canonical_url+'&paged='+ pagenum+'" data-page="'+ pagenum +'" />');                              
                              }else{
                                 div = $('<div class="alm-reveal alm-seo" data-url="'+alm.canonical_url+'page/'+ pagenum +'/" data-page="'+ pagenum +'" />');
                              }                              
                           }else{ // First Page
                              div = $('<div class="alm-reveal alm-seo"  data-url="'+alm.canonical_url+'" data-page="1" />');
                           }
                           div.append(data[k]);
                           div = $(div); // convert to object
                           alm.el.append(div).hide(); // Add data to .alm-listing wrapper
                        }      
                     }
                     // End SEO -- /
                     
                     else {
                        // If is SEO and paged, or preloaded.
                        if(alm.seo && alm.page > 0 || alm.preloaded === 'true'){
                           
                           var p = 0; // Add 1 page if items are preloaded.
                           if(alm.preloaded === 'true'){
                              p = 1;
                           }
                           // SEO [Paged]
                           var pagenum = (alm.page + 1 + p);
                           if(alm.seo){
                              if(alm.permalink === 'default'){
                                 alm.el = $('<div class="alm-reveal alm-seo" data-url="'+alm.canonical_url+'&paged='+ pagenum+'" data-page="'+ pagenum +'" />');                              
                              }else{
                                 alm.el = $('<div class="alm-reveal alm-seo" data-url="'+alm.canonical_url+'page/'+ pagenum +'/" data-page="'+ pagenum +'" />');
                              }     
                           }else{
                              // Basic ALM
                              alm.el = $('<div class="alm-reveal" />');                              
                           }                        
                              
                        }else{ 
                           if(alm.seo){
                              // SEO [Page 1]
                              alm.el = $('<div class="alm-reveal alm-seo" data-url="'+alm.canonical_url+'" data-page="1" />');                              
                           }else{
                              // Basic ALM
                              alm.el = $('<div class="alm-reveal" />');                              
                           }
                        }  
   
                        alm.el.append(alm.data).hide();                   
                     }
               	}               	
               }
               
               // Append alm.el to ALM container 
               alm.content.append(alm.el);
               
               // Transition
               if (alm.transition === 'fade') { // Fade
	               if(alm.images_loaded === 'true'){
		               alm.el.almWaitForImages().done(function(){
			               alm.el.fadeIn(alm.speed, 'alm_easeInOutQuad', function () {
		                     alm.loading = false;
		                     if(!alm.paging){
		                     	alm.button.delay(alm.speed).removeClass('loading');
		                     	alm.AjaxLoadMore.resetBtnText();
		                     }
				               if ($.isFunction($.fn.almSEO) && alm.seo) {
					               $.fn.almSEO(alm);
					            } 
		                  });
	                  });
	               }else{
		               alm.el.fadeIn(alm.speed, 'alm_easeInOutQuad', function () {
	                     alm.loading = false;
	                     if(!alm.paging){
	                     	alm.button.delay(alm.speed).removeClass('loading');
	                     	alm.AjaxLoadMore.resetBtnText();
	                     }                     	                     
			               if ($.isFunction($.fn.almSEO) && alm.seo) {
				               $.fn.almSEO(alm);
				            } 
	                  });
	               }
                  
               }else if(alm.transition === 'none') { // None
	               if(alm.images_loaded === 'true'){
		               alm.el.almWaitForImages().done(function(){
			               alm.el.show();			               
			               if ($.isFunction($.fn.almSEO) && alm.seo) {
				               $.fn.almSEO(alm);
				            } 
			            });
		            }else{
			            alm.el.show();    			            
		               if ($.isFunction($.fn.almSEO) && alm.seo) {
			               $.fn.almSEO(alm);
			            }  
                  }
                  alm.loading = false;
                  if(!alm.paging){
                  	alm.button.delay(alm.speed).removeClass('loading');
                  	alm.AjaxLoadMore.resetBtnText();
                  } 
                                     
               }else { // Slide
	               if(alm.images_loaded === 'true'){
		               alm.el.almWaitForImages().done(function(){
		                  alm.el.slideDown(alm.speed, 'alm_easeInOutQuad', function () {
		                     alm.loading = false;
		                     if(!alm.paging){
		                     	alm.button.delay(alm.speed).removeClass('loading');
		                     	alm.AjaxLoadMore.resetBtnText();
		                     }	                     
				               if ($.isFunction($.fn.almSEO) && alm.seo) {
					               $.fn.almSEO(alm);
					            } 
		                  });
	                  });
	               }else{
	                  alm.el.slideDown(alm.speed, 'alm_easeInOutQuad', function () {
	                     alm.loading = false;
	                     if(!alm.paging){
	                     	alm.button.delay(alm.speed).removeClass('loading');
	                     	alm.AjaxLoadMore.resetBtnText();
	                     }                   
			               if ($.isFunction($.fn.almSEO) && alm.seo) {
				               $.fn.almSEO(alm);
				            } 
	                  });
                  }
               }
               // End Transition -- /
               
            } else { 
               
               // Paging     
               if(!alm.init){                   
                  $('.alm-paging-content', alm.el).html('').append(alm.data).almWaitForImages().done(function(){  // Remove loading class and append data
                     $('.alm-paging-loading', alm.el).fadeOut(alm.speed); // Fade out loader
                     if ($.isFunction($.fn.almOnPagingComplete)){
                        $.fn.almOnPagingComplete(alm);     
                     }                     
		               if ($.isFunction($.fn.almSEO) && alm.seo) { // ALM SEO
			               $.fn.almSEO(alm);
			            } 
                  });
               } else {
	               if ($.isFunction($.fn.almSEO) && alm.seo) { // ALM SEO
		               $.fn.almSEO(alm);
		            } 
               }  
               // End Paging -- /
                          
            }                            
                  
            // ALM Complete
            if ($.isFunction($.fn.almComplete)) {
	            if(alm.images_loaded === 'true'){
	               alm.el.almWaitForImages().done(function(){
							$.fn.almComplete(alm);
						});
					}else{
						$.fn.almComplete(alm);
					}					
            }  
            // End ALM Complete -- /
            
            // ALM Done
            if(!alm.cache){ 
	            // Not Cache & Previous Post	            
	            if(alm.posts >= alm.totalposts && !alm.previous_post){ 
	               alm.AjaxLoadMore.triggerDone();
	            }                       
            }else{ // Cache 	                       
	            if(total < alm.posts_per_page){
	               alm.AjaxLoadMore.triggerDone();
	            } 
            }  
            // End ALM Done -- /                 

         } else { 
	         
	         // No Results!
            
	         if(!alm.paging){
            	alm.button.delay(alm.speed).removeClass('loading').addClass('done');
            	alm.AjaxLoadMore.resetBtnText();
            }        
            alm.AjaxLoadMore.triggerDone(); // ALM Done
            
         }
         
         
         // Destroy After
         if (alm.destroy_after !== undefined && alm.destroy_after !== '') {
            var currentPage = alm.page + 1; // Add 1 because alm.page starts at 0            
            if(alm.preload){
               currentPage++;
            }            
            if(currentPage == alm.destroy_after){ // - Disable ALM is page = alm.destroy_after value
               alm.disable_ajax = true;
               if(!alm.paging){
               	alm.button.delay(alm.speed).fadeOut(alm.speed);
               }
            }
         }
         // End Destroy After  -- /
         
         alm.init = false;   
                
      };
      
      
      
      /*  pagingPreloadedInit()
       * 
       *  First run for Paging + Preloaded add-ons
       *  Moves preloaded content into ajax container
       *  @since 2.11.3
       */ 
      alm.AjaxLoadMore.pagingPreloadedInit = function(data){
         alm.el = $('<div class="alm-reveal"/>');
         alm.el.append('<div class="alm-paging-content">'+data+'</div><div class="alm-paging-loading"></div>');
         alm.content.append(alm.el);                  
      	alm.content.parent().removeClass('loading'); // Remove loading class from main container               	 
			alm.AjaxLoadMore.resetBtnText();
			
         var paddingT = parseInt(alm.content.css('padding-top')),
				 paddingB = parseInt(alm.content.css('padding-bottom'));                   
         alm.content.css('height', alm.el.height() + paddingT + paddingB + 'px');
         
         if ($.isFunction($.fn.almFadePageControls)){
            $.fn.almFadePageControls(alm.btnWrap);     
         }
      }
      
      
      
      
      /*  getPreviousPost()
       * 
       *  Get the previous post ID via ajax
       *  @since 2.7.4
       */
      alm.fetchingPreviousPost = false;
      
      alm.AjaxLoadMore.getPreviousPost = function () {
	      alm.fetchingPreviousPost = true;
         $.ajax({
            type: "GET",
            dataType: "JSON",
            url: alm_localize.ajaxurl,
            data: {
               action: 'alm_query_previous_post',
               id: alm.previous_post_id,
               taxonomy: alm.previous_post_taxonomy
            },
            success: function (data) {
               if(data.has_previous_post){	               
                  alm.content.attr('data-previous-post-id', data.prev_id); // update previous-post-id on ALM element
                  alm.previous_post_permalink = data.prev_permalink;             	           
                  alm.previous_post_title = data.prev_title;             	           
               }else{
                  if(!data.has_previous_post){
                     alm.AjaxLoadMore.triggerDone();
                  }
               }                               
               if($.isFunction($.fn.almSetPreviousPost)){ 
            		$.fn.almSetPreviousPost(alm, data.current_id, data.permalink, data.title);
            	} 
            	alm.fetchingPreviousPost = false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
               alm.AjaxLoadMore.error(jqXHR, textStatus, errorThrown);
               alm.fetchingPreviousPost = false;
            }
            
         });
      };
      
      
      
      /*  triggerDone()
       * 
       *  Fires the almDone() function (if available).
       *  @since 2.11.3
       */
      alm.AjaxLoadMore.triggerDone = function(){
	      alm.loading = false;
         alm.finished = true;
         if(!alm.paging){
         	alm.button.addClass('done');
         }
			if ($.isFunction($.fn.almDone)) {
				// Delay done until after animation
				setTimeout(function(){ 
					$.fn.almDone(alm) 
				}, alm.speed + 10);		
			}  
      };
      
      
      
      /*  resetBtnText()
       * 
       *  Resets the loading button text after loading has completed
       *  @since 2.8.4
       */
      alm.AjaxLoadMore.resetBtnText = function(){
	      if(alm.button_loading_label !== false){ // Reset button text 
   	      if(!alm.paging){
               alm.button.text(alm.button_label); 
            }
         } 
      };
      
      
      
      /* error()
       * 
       *  Error function after failed data
       *  @since 2.6.0
       */
       
      alm.AjaxLoadMore.error = function (jqXHR, textStatus, errorThrown) {
         alm.loading = false;
         if(!alm.paging){
         	alm.button.removeClass('loading');
         	alm.AjaxLoadMore.resetBtnText();
         }
         console.log(errorThrown);
      };
      
      

      /*  Button onClick()
       * 
       *  Load more button click event
       *  @since 1.0.0
       */
       
      if(!alm.paging && !alm.fetchingPreviousPost){
	      alm.button.on('click', function () {
	         if (alm.pause === 'true') {
	            alm.pause = false;
	            alm.pause_override = false;
	            alm.AjaxLoadMore.loadPosts();
	         }
	         if (!alm.loading && !alm.finished && !$(this).hasClass('done')) {
	            alm.loading = true;
	            alm.page++;
	            alm.AjaxLoadMore.loadPosts();
	         }
	      });
      }
      
      
      
      /*  Window Resize
       * 
       *  Add resize function for Paging add-on only.
       *  @since 2.1.2
       */
      if(alm.paging){
         alm.window.resize(function() {
            if ($.isFunction($.fn.almOnWindowResize)){
               setTimeout(function(){ 
                  $.fn.almOnWindowResize(alm); 
               }, 250);  
            }   
         });               
      }



      /*  alm.AjaxLoadMore.isVisible()
       * 
       *  Check to see if element is visible before loading posts
       *  @since 2.1.2
       */
       
      alm.AjaxLoadMore.isVisible = function () {
         alm.visible = false;
         if (alm.el.is(":visible")) {
            alm.visible = true;
         }
         return alm.visible;
      };
      
      

      /*  Window scroll and touchmove events
       * 
       *  Load posts as user scrolls the page
       *  @since 1.0
       */
      if (alm.scroll && !alm.paging) {
         alm.window.bind("scroll touchstart", function () {
            if (alm.AjaxLoadMore.isVisible() && !alm.fetchingPreviousPost) {	            	            
               var content_offset = alm.button.offset(),
               	 top = Math.round(content_offset.top - (alm.window.height() - alm.scroll_distance));               
               
               // If Pause && Pause Override 
	            if(!alm.loading && !alm.finished && (alm.window.scrollTop() >= top) && alm.page < (alm.max_pages - 1) && alm.proceed && alm.pause === 'true' && alm.pause_override === 'true'){		            
		            alm.button.trigger('click');                  
	            }
	           
	            // Standard Scroll event 
	            else{		                       
	               if (!alm.loading && !alm.finished && (alm.window.scrollTop() >= top) && alm.page < (alm.max_pages - 1) && alm.proceed && alm.pause !== 'true') {  		                               
	                  alm.page++;
	                  alm.AjaxLoadMore.loadPosts();	                  
	               }
               }               
            }
         });
      }
      
      

      /*  Init Ajax load More
       * 
       *  Load posts as user scrolls the page
       *  @since 2.0
       */
      alm.AjaxLoadMore.init = function(){
	      if(!alm.paging && !alm.previous_post){
	         if(alm.disable_ajax){
	            alm.finished = true;
	            alm.button.addClass('done');
	            
	         }else{
	            if (alm.pause === 'true') {
	               alm.button.text(alm.button_label); 
	               alm.loading = false;
	            } else {
	               alm.AjaxLoadMore.loadPosts();
	            }
	         }
	      }
	      if(alm.previous_post){
	         alm.AjaxLoadMore.getPreviousPost(); // Set next post on load
	         alm.loading = false;
	      }
      }
      alm.AjaxLoadMore.init();
      


      //flag to prevent unnecessary loading of post on init. Hold for 3/10 of a second
      setTimeout(function () {
         alm.proceed = true;
      }, 300);
      
      
      
      /*  $.fn.almUpdateCurrentPage()
       * 
       *  Update current page - triggered from paging add-on
       *  @since 2.7.0
       */
       
      $.fn.almUpdateCurrentPage = function(current, obj, alm){
         alm.page = current;
         
         // We will eventually use this function to combine Paging + Preloaded add-ons
         //var alm_paging_init = false;
         // If is paging init and preloaded, grab preloaded data, and append it .alm-reveal
	      if(alm.paging_init && alm.preloaded === 'true'){
		      
		      var data = $('.alm-preloaded .alm-reveal', alm.el).html(); // Content of preloaded page
		      $('.alm-preloaded', alm.el).remove();
		      alm.preloaded_amount = 0; // Reset 
		      //alm.AjaxLoadMore.success(data, true); // Skip post loading and go right to success() for display
		      alm.AjaxLoadMore.pagingPreloadedInit(data);
		      alm.paging_init = false;
		      alm.init = false;
		      
	      }else{
   	      
         	alm.AjaxLoadMore.loadPosts();		 
         	     
	      }
      };      
      
      
      
      /* $.fn.almGetParentContainer()
       * 
       *  return the parent ALM container
       *
       *  @since 2.7.0
        * @return element
       */
      $.fn.almGetParentContainer = function(){
         return alm.el.closest('#ajax-load-more'); // Return the parent #ajax-load-more div 
      };
      
      
      
      /* $.fn.almGetObj()
       * 
       *  return the current ALM obj
       *
       *  @since 2.7.0
       *  @return object
       */
      $.fn.almGetObj = function(){
         return alm; // Return the entire alm object
      };
      
      
      
      /*  $.fn.almTriggerClick()
       * 
       *  Trigger ajaxloadmore from any element on page
       *
       *  @since 2.12.0
       *  @return null
       */
      $.fn.almTriggerClick = function(){
         alm.button.trigger('click');
      };
      


      //Custom easing function
      $.easing.alm_easeInOutQuad = function (x, t, b, c, d) {
         if ((t /= d / 2) < 1) { return c / 2 * t * t + b; }
         return -c / 2 * ((--t) * (t - 2) - 1) + b;
      };
      
   };

   // End $.ajaxloadmore
   
   
   
   /* $.fn.almFilter(type, speed, data)
    * 
    *  Filter Ajax Load More
    *  @type ('slide', 'fade', null);
    *  @speed '300';
    *  @data obj; 
    *
    *  @since 2.6.1
    */
   $.fn.almFilter = function (transition, speed, data) {
            
      if(data.target){
	      // if a target has been specified
	      $(".ajax-load-more-wrap[data-id='" + data.target + "']").each(function (e) {	
		      var el = $(this);	      
		      $.fn.almFilterTransition(transition, speed, data, el);
		   });
      } else {
	      // Target not specified
	      $(".ajax-load-more-wrap").each(function (e) {
		      var el = $(this);
		      $.fn.almFilterTransition(transition, speed, data, el);
		   });
      }
   };
   
   
   /* $.fn.almFilterTransition(transition, speed, data, el)
    * 
    *  Transition Ajax Load More
    *
    *  @since 2.13.1
    */
   $.fn.almFilterTransition  = function(transition, speed, data, el){
	   if(transition === 'slide'){ // Slide transition
         el.slideUp(speed, function(){
            $('.alm-listing', el).html(''); // Clear listings
            $('.alm-btn-wrap', el).remove(); // remove buttons   
            el.fadeIn(speed);    
             
            $.fn.almSetFilters(el, data);
               
         });
      }else if(transition === 'fade'){ // Fade transition
         el.fadeOut(speed, function(){
            $('.alm-listing', el).html(''); // Clear listings 
            $('.alm-btn-wrap', el).remove(); // remove buttons   
            el.fadeIn(speed);     
            
            $.fn.almSetFilters(el, data);
                       
         });
      }else{
         $('.alm-listing', el).html(''); // Clear listings
         $('.alm-btn-wrap', el).remove(); // remove buttons   
         el.fadeIn(speed);     
         
         $.fn.almSetFilters(el, data);
             
      }
   };
   
   
   /* $.fn.almSetFilters(el, data)
    * 
    *  Set filter parameters on .alm-listing element
    *
    *  @since 2.6.1
    */
   $.fn.almSetFilters = function(el, data){
      $.each(data, function(key, value) {
         key = key.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2'); // Convert camelCase data() object back to dash (-)
         $('.alm-listing', el).attr('data-'+key, value);
      });
      
      if ($.isFunction($.fn.almFilterComplete)){
         $.fn.almFilterComplete();
      }
      
      if(data.target){
	      // if a target has been specified
      	$(".ajax-load-more-wrap[data-id="+data.target+"").ajaxloadmore(); // re-initiate Ajax Load More	      
      } else {
	      // Target not specified
      	$(".ajax-load-more-wrap").ajaxloadmore(); // re-initiate Ajax Load More	      
      }
   };
      
   

   /* $.fn.ajaxloadmore()
    * 
    *  Initiate all instances of Ajax load More
    *  @since 2.1.2
    */
   $.fn.ajaxloadmore = function () {
      return this.each(function (e) {
         $(this).data('alm', new $.ajaxloadmore($(this), e));
      });
   };
   
   

   /* 
    *  Initiate Ajax load More if div is present on screen
    *  @since 2.1.2
    */
   if ($(".ajax-load-more-wrap").length){
      $(".ajax-load-more-wrap").ajaxloadmore();
   }
      

})(jQuery);




/*! almWaitForImages 
    jQuery Plugin
    v2.0.2
    Based on https://github.com/alexanderdickson/almWaitForImages
*/
// Include almWaitForImages() for paging add-on
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS / nodejs module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Namespace all events.
    var eventNamespace = 'almWaitForImages';

    // CSS properties which contain references to images.
    $.almWaitForImages = {
        hasImageProperties: [
            'backgroundImage',
            'listStyleImage',
            'borderImage',
            'borderCornerImage',
            'cursor'
        ],
        hasImageAttributes: ['srcset']
    };

    // Custom selector to find all `img` elements with a valid `src` attribute.
    $.expr[':']['has-src'] = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        return $(obj).is('img[src][src!=""]');
    };

    // Custom selector to find images which are not already cached by the
    // browser.
    $.expr[':'].uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        if (!$(obj).is(':has-src')) {
            return false;
        }

        return !obj.complete;
    };

    $.fn.almWaitForImages = function () {

        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();

        var finishedCallback;
        var eachCallback;
        var waitForAll;

        // Handle options object (if passed).
        if ($.isPlainObject(arguments[0])) {

            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;

        } else {

            // Handle if using deferred object and only one param was passed in.
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }

        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        this.each(function () {
            // Build a list of all imgs, dependent on what images will
            // be considered.
            var obj = $(this);
            var allImgs = [];
            // CSS properties which may contain an image.
            var hasImgProperties = $.almWaitForImages.hasImageProperties || [];
            // Element attributes which may contain an image.
            var hasImageAttributes = $.almWaitForImages.hasImageAttributes || [];
            // To match `url()` references.
            // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if (waitForAll) {

                // Get all elements (including the original), as any one of
                // them could have a background image.
                obj.find('*').addBack().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in
                    // case it has a background image too.
                    if (element.is('img:has-src')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });

                    $.each(hasImageAttributes, function (i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;

                        // If it doesn't contain this property, skip.
                        if (!attributeValue) {
                            return true;
                        }

                        // Check for multiple comma separated images
                        attributeValues = attributeValue.split(',');

                        $.each(attributeValues, function(i, value) {
                            // Trim value and get string before first
                            // whitespace (for use with srcset).
                            value = $.trim(value).split(' ')[0];
                            allImgs.push({
                                src: value,
                                element: element[0]
                            });
                        });
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:has-src')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }

            allImgsLength = allImgs.length;
            allImgsLoaded = 0;

            // If no images found, don't bother.
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
                deferred.resolveWith(obj[0]);
            }

            $.each(allImgs, function (i, img) {

                var image = new Image();
                var events =
                  'load.' + eventNamespace + ' error.' + eventNamespace;

                // Handle the image loading and error with the same callback.
                $(image).one(events, function me (event) {
                    // If an error occurred with loading the image, set the
                    // third argument accordingly.
                    var eachArguments = [
                        allImgsLoaded,
                        allImgsLength,
                        event.type == 'load'
                    ];
                    allImgsLoaded++;

                    eachCallback.apply(img.element, eachArguments);
                    deferred.notifyWith(img.element, eachArguments);

                    // Unbind the event listeners. I use this in addition to
                    // `one` as one of those events won't be called (either
                    // 'load' or 'error' will be called).
                    $(this).off(events, me);

                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        deferred.resolveWith(obj[0]);
                        return false;
                    }

                });

                image.src = img.src;
            });
        });

        return deferred.promise();

    };
}));
