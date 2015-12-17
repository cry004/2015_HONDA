var now,pre,scrolling = false;
var ww = $(window).width(), wh = $(window).height();
var section =  $('section');
var initial = {
	initfun: function(){
		for(var i = 0; i < section.length+1; i++){
			if($('body').scrollTop() < section.eq(i).offset().top+section.height()){
				now = i;
				$('nav li').eq(now).find('span').css({'display':'block'})
				break;
			} 
		}
		clickfun.navfun();
		clickfun.bar3fun();
		scrollfun.navchange();
		$('.fpic').append('<img src="img/car_g.png" style="display: none"><img src="img/car_bl.png" style="display: none"><img src="img/car_b.png" style="display: none">');
	}
}
var clickfun = {
	navall: $('nav'),
	navfun: function(){
		clickfun.navall.find('ul li').on('click',function(){
			var index = $(this).index();
			scrolling = true;
			$(this).find('span').css({'display':'block'}).parent().siblings().find('span').removeAttr('style');
			$('body').stop().animate({scrollTop: section.eq(index).offset().top-(wh-section.height())/2},800,'easeInOutCubic',function(){
				now = index;
				scrolling = false;
				$('.bg4_1').fadeIn(1000);
				$('.sliders').removeAttr("style");
				$('.content4_1').css({'top':scrollfun.sec3delta});
			});
		});
	},
	bar3fun: function(){
		$('.bar3btn').on('click',function(){
			 $('.car img').attr('src','img/'+$(this).attr('car')+'.png');
			 $(this).find('div').css({'display':'block'}).parent().siblings().find('div').removeAttr('style');
		})
	}
}

var scrollfun = {
	sec3delta: 0,
	slider: -960,
	navchange: function(){
		var temp = 0;
		$('.wrapper').mousewheel(function(event, delta){
				event.preventDefault();				
			if(!$('body').is(':animated') && !scrolling){
				if( delta < 0){ //scroll down
					console.log(temp,now);
					if( now < section.length-1){
					if(now == 1){
						scrollfun.sec3delta += delta*10;
						if(scrollfun.sec3delta < -200){
							now ++;
							temp = 3;
						}else if(scrollfun.sec3delta < -120){
							$('.sliders').stop();
							$('.sliders').animate({'margin-left': scrollfun.slider*5},400);
						}else if(scrollfun.sec3delta < -30){
							$('.sliders').stop();
							$('.sliders').animate({'margin-left': scrollfun.slider*3},400);
					
						}
					}else if(now ==3){
						scrollfun.sec3delta += delta*40;
						$('.content4_1').css({'top':scrollfun.sec3delta});
						if(scrollfun.sec3delta < -1120 && $('.bg4_1').width()){
							$('.bg4_1').fadeOut(1000);
							
						}
						if(scrollfun.sec3delta < -2350){
							now ++;
							temp = 3;
						}
						// console.log()
						//$(this).unbind('mousewheel');
						//scrollfun.navchange();
					}else{
						if( now != 4 && now != 2 || scrollfun.sec3delta == 0){
							temp ++;
							if( temp == 3 ){
								now++;
								$('nav ul li').eq(now).trigger('click');
								temp = 0;		
							}	
						}else{
							$('nav ul li').eq(now).trigger('click');
							temp = 0;	
						}
						scrollfun.sec3delta = 0;
						
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