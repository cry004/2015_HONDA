var now,pre,scrolling = false;
var ww = $(window).width(), wh = $(window).height();
var section =  $('section');
var initial = {
	initfun: function(){
		for(var i = 0; i < section.length+1; i++){
			if($.Body.scrollTop() < section.eq(i).offset().top+section.height()){
				now = i;
				$('nav li').eq(now).find('span').css({'display':'block'})
				break;
			} 
		}
		clickfun.otherclick();
		scrollfun.navchange();
		$.Window.resize(resizeit.resizeFun).trigger('resize');
		$('.fpic').append('<img src="img/car_g.png" style="display: none"><img src="img/car_bl.png" style="display: none"><img src="img/car_b.png" style="display: none">');
	}
}
var clickfun = {
	navall: $('nav'),
	navfun: function(){
		clickfun.navall.find('ul li').on('click',function(){
			var index = $(this).index();
			if(index<7){
				scrolling = true;
				$(this).find('span').css({'display':'block'}).parent().siblings().find('span').removeAttr('style');
				$.Body.stop().animate({scrollTop: section.eq(index).offset().top-(wh-section.height())/2},800,'easeInOutCubic',function(){
					now = index;
					scrolling = false;
					$('.bg4_1').fadeIn(1000);
					$('.sliders').removeAttr("style");
					$('.content4_1').css({'top':scrollfun.sec3delta});
				});
			}
		});
	},
	otherclick: function(){
		clickfun.navfun();
		clickfun.bar3fun();
		$('.content5_1btn').on('click',function(){
			$('.cover').fadeIn().find('.content5_1popup').show();
		});
		$('.content5_1popup .x').on('click',function(){
			$('.cover').fadeOut().find('.content5_1popup').removeAttr('style');
		});
	},
	bar3fun: function(){
		$('.bar3btn').on('click',function(){
			 $('.car img').attr('src','img/'+$(this).attr('car')+'.png');
			 $(this).find('div').css({'display':'block'}).parent().siblings().find('div').removeAttr('style');
		})
	}
}
var resizeit = {
    resizeFun: function() {
    	wh = $(window).height();
        $.Body.stop().animate({scrollTop: section.eq(now).offset().top-(wh-section.height())/2},800);
    }
}
var scrollfun = {
	sec3delta: 0,
	slider: -960,
	navchange: function(){
		var temp = 0;
		function check(now) {	
			if( now != 6 && now != 4 && now != 2 && now != 5 || scrollfun.sec3delta == 0){
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
			if(now == 5 || now == 3){
				$('section:nth-child(5) .fadecover').fadeIn('slow',function(){
					$('section:nth-child(5) div,section:nth-child(5) img').removeAttr('style');
				});
			}
			if(now == 6 || now == 4){
				$('section:nth-child(6) .fadecover').fadeIn('slow',function(){
					$('section:nth-child(6) div,section:nth-child(6) img').removeAttr('style');
				});
			}
			
			$('.sliderbtns .sliderbtn').removeAttr('style');
			
		}
		$('.cover').mousewheel(function(event, delta){
			$('.wrapper').unbind('mousewheel');
		});
		$('.wrapper').mousewheel(function(event, delta){
				event.preventDefault();				
			if(!$.Body.is(':animated') && !scrolling){
				if( delta < 0){ //scroll down
					console.log(temp,now);
					if( now < section.length-1){
						if(now == 0 || now == 2){
							check(now);	
						}else if(now == 1){
							scrollfun.sec3delta += delta*10;
							if(scrollfun.sec3delta == -200){
								now ++;
								temp = 3;
								check(now);
							}else if(scrollfun.sec3delta == -120){
								$('.sliderbtns .sliderbtn').eq(2).css({'background': '#216398'}).siblings().css({'background': '#fff'});
								$('.sliders').stop();
								$('.sliders').animate({'margin-left': scrollfun.slider*5},400);
							}else if(scrollfun.sec3delta == -30){
								$('.sliderbtns .sliderbtn').eq(1).css({'background': '#216398'}).siblings().css({'background': '#fff'});
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
								check(now);
							}
							// console.log()
							//$(this).unbind('mousewheel');
							//scrollfun.navchange();
						}else if(now == 4){
							scrollfun.sec3delta += delta;
							if(scrollfun.sec3delta == -3){
								$('.car5').fadeIn(200).find('img').animate({'margin-left':0},300,function(){
									$('.title_5').fadeIn(500);
								});
								
							}
							if(scrollfun.sec3delta == -10){
								$('.rightcontent').show().animate({'right': -35});
							}
							if(scrollfun.sec3delta == -17){
								$('.rightcontent .content5_2').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -24){
								$('.rightcontent .content5_3').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta < -34){
								now ++;
								temp = 3;
								check(now);
							}
							
						}else if(now == 5){
							
							scrollfun.sec3delta += delta;
							if(scrollfun.sec3delta == -1){
								$('.title_6').fadeIn(200);	
							}
							if(scrollfun.sec3delta == -8){
								$('.content6_1').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -16){
								$('.content6_2').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -24){
								$('.content6_3').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -28){
								$('.content6_3').fadeOut("slow");
								$('.content6_4').animate({'right': 30},1000);	
							}
							if(scrollfun.sec3delta < -43){
								$('.content6_4pic').css({'top':(scrollfun.sec3delta+40)*6});
							}
							if(scrollfun.sec3delta < -80){
								now ++;
								temp = 3;
								check(now);
								console.log(now);
							}
							
						}
						pre = now;
					}
					
				} else if ( delta > 0 ){ //scroll up
					if( now > 0) {
                        pre = now;
                        now --;
                        $('nav ul li').eq(now).trigger('click');
                        check(now)
                    }
				}
			}
			
		});
	}
}
$.Body = $('body');
$.Window = $(window);
$.Window.load(function(){
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