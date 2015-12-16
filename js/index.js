var now,pre,scrolling = false;
var section =  $('section');
var initial = {
	initfun: function(){
		navfun.navclick();
		for(var i = 0; i < section.length+1; i++){
			if($('body').scrollTop() < section.eq(i).offset().top+section.height()){
				now = i;
				break;
			} 
		}
		scrollfun.navchange();
	}
}
var navfun = {
	navall: $('nav'),
	navclick: function(){
		navfun.navall.find('ul li').on('click',function(){
			var index = $(this).index();
			scrolling = true;
				console.log(index+'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
			$('body').animate({scrollTop: section.eq(index).offset().top-200},800,'easeInOutCubic',function(){
				now = index;
				scrolling = false;
			});
		});
	}
}


var scrollfun = {
	sec3delta: 0,
	navchange: function(){
		$('.wrapper').mousewheel(function(event, delta){
			 //console.log(now,$('body').scrollTop(),section.eq(now+1).offset().top, scrollfun.sec3delta);
			//if (now!=3) {
				event.preventDefault();				
			//};
			if(!$('body').is(':animated') && !scrolling){
				if( delta < 0){ //scroll down
					if( now < section.length-1){
					if(now ==3){
						scrollfun.sec3delta += delta*40;
						$('.content4_1').css({'top':scrollfun.sec3delta});
						if(scrollfun.sec3delta < -2350){
							now ++;
						}
							// console.log()
						
						//$(this).unbind('mousewheel');
						//scrollfun.navchange();
					}else{
						if( now < 4 || scrollfun.sec3delta ==0){
							now ++;
						}
						scrollfun.sec3delta = 0;
						$('.content4_1').css({'top':scrollfun.sec3delta});
						$('nav ul li').eq(now).trigger('click');			
					}
					pre = now;
					}
				} else if ( delta > 0 ){ //scroll up
					if( now > 0) {
                        pre = now;
                        now --;
                        $('nav ul li').eq(now).trigger('click');
                    }
				}
			}
			
		});
	}
}
$(window).load(function(){
	// $images.imagesLoaded().progress(function(instance, image){
 //        var result = image.isLoaded ? 'loaded' : 'broken';
 //        count++;
 //        if(count == $images.length){
 //            // $.Loading.fadeOut(300);
 //            // $.Body.MainDataInIt();
 //        }
 //    });

	initial.initfun();
});