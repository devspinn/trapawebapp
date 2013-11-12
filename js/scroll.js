
$(document).ready(function(){
	var userAgent = window.navigator.userAgent;
	console.log(navigator.userAgent)
	//if (detectmob()) {
	if(true){
		//get the tops of each section
		var categoryTop = new Array();

		var children = document.getElementsByClassName("category-label");
		console.log(children);
		for( var i = 0; i<children.length; i++){
			categoryTop[i] = ($(children[i]).offset().top);
			console.log(categoryTop[i]);
		};


		//if the screen resizes, get the tops again
		$(window).resize(function(){
			var children = document.getElementsByClassName("category-label");
			console.log(children);
			for( var i = 0; i<children.length; i++){
				categoryTop[i] = ($(children[i]).offset().top);
				console.log(categoryTop[i]);
			};
		});

		var scrollStopTime = 200;
		var scrollPadding = $(window).height() / 2;
		var scrollAnimationTime = 200;

	    $(window).bind('mousewheel', function (event) {
		    clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	    	var body = $("body");
	    	var screenTop = body.scrollTop();

	    	//inside header
	    	if(screenTop <= categoryTop[0]){
	    		//if scroll down
	    		if (event.originalEvent.wheelDelta <= 0) {
	    			//jump to 2
	    			body.animate({scrollTop:categoryTop[1]}, scrollAnimationTime);
	    			console.log("jump to 2");
	    		}
	    		else{
	    			//go to top
	    			body.animate({scrollTop:0}, scrollAnimationTime);
	    			console.log("jump to top");
	    		}
	    	}

	    	//inside middle sections
	    	else{
		    	for(var i = 0; i < categoryTop.length -1; i++){
			    	if(screenTop >= categoryTop[i]  - scrollPadding &&
			    		screenTop < categoryTop[i + 1] - scrollPadding){

			    		//if scroll up
				    	if (event.originalEvent.wheelDelta >= 0) {
				    		body.animate({scrollTop:categoryTop[i - 1]}, scrollAnimationTime);
				            console.log("jump to " + (i));
				        }

				        //if scroll down
				        else {
				            body.animate({scrollTop:categoryTop[i + 1]}, scrollAnimationTime);
				            console.log("b:jump to " + (i+1));
				        }
			    	}
		    	}
		    }

	    	//inside last section
	    	if(screenTop >= categoryTop[categoryTop.length - 1] - scrollPadding){

	    		//if scroll up
		    	if (event.originalEvent.wheelDelta >= 0) {
		    		body.animate({scrollTop:categoryTop[categoryTop.length - 2]}, scrollAnimationTime);
		            console.log("jump to 3");
		        }
		        else {
		            body.animate({scrollTop:categoryTop[categoryTop.length - 1]}, scrollAnimationTime);
					console.log("jump to end");
		        }
	    	}
	    	}, scrollStopTime));
	    	
	    });
			

	}
});