var now,pre,scrolling = false,temp = 0;
var ww = $(window).width(), wh = $(window).height();
var section =  $('section');
var initial = {
	initfun: function(){
		for(var i = 0; i < section.length+1; i++){
			if($.Body.scrollTop() < section.eq(i).offset().top+section.height()){
				now = i;
				pre = now;
				$('nav li').eq(now).find('span').css({'display':'block'})
				break;
			} 
		}
		$.Window.resize(resizeit.resizeFun).trigger('resize');
		ani(now);
		clickfun.otherclick();
		scrollfun.navchange();
		$('.fpic').append('<img src="img/car_g.png" style="display: none"><img src="img/car_bl.png" style="display: none"><img src="img/car_b.png" style="display: none">');
	}
}
var animatefun = {
	intro: function(){
		$('.title1_1').fadeIn(1000).find('img').animate({'margin-right': 0}, 400,function(){
			$('.car1').fadeIn(1000).find('img').animate({'margin-left': 0}, 400,function(){
				$('.title1_2').fadeIn(1000).find('img').animate({'margin-left': 0}, 400);
			});
		});
	}
}
function ani(now) {
	if(now == 0){
		animatefun.intro();
	}
	if(now == 2){
		$('.bg3').fadeIn(300);
	}
	if(now == 4 ){
		$('.car5').fadeIn(200).find('img').animate({'margin-left':0},300,function(){
			$('.title_5').fadeIn(500);
		});
		$('section .bgbox').css({'width': ww,'margin-left': -0.5*ww})
	}
	if(now == 5 ){
		$('.title_6').fadeIn(200);
	}
	if(now == 6 ){
		$('section .bgbox').css({'width': ww,'margin-left': -0.5*ww})
	}
}
var clickfun = {
	navall: $('nav'),
	navfun: function(){
		clickfun.navall.find('ul li').on('click',function(){
			var index = $(this).index();
			if(index<7){
				scrolling = true;
				$('section').eq(pre).find('.fadecover').fadeIn('slow',function(){
					$('section').eq(pre).find('div,img').removeAttr('style');
					
					//$('section').eq(now).find('img').removeAttr('style');
				});
				scrollfun.sec3delta = 0;
				temp = 0;
				$(this).find('span').css({'display':'block'}).parent().siblings().find('span').removeAttr('style');
				$('html,body').stop().animate({scrollTop: section.eq(index).offset().top-(wh-section.height())/2},800,'easeInOutCubic',function(){
					pre = now;
					now = index;
					ani(now);
					scrolling = false;
				});
			}
		});
	},
	otherclick: function(){
		clickfun.navfun();
		clickfun.bar3fun();
		function popupshow(obj){
			$('.cover').fadeIn().find(obj).show();
			$.Wrapper.unbind('mousewheel');
			$.Body.css({'overflow': 'hidden'});
		}
		function popuphide(obj){
			scrollfun.navchange();
			$('.cover').fadeOut().find(obj).removeAttr('style');
		}
		$('.content5_1btn').on('click',function(){
			popupshow('.content5_1popup');
		});
		$('.content5_1popup .x').on('click',function(){
			popuphide('.content5_1popup');;
		});
		$('.content6_4btn').on('click',function(){
			popupshow('.content6_4popup');
		});
		$('.content6_4popup .x').on('click',function(){
			popuphide('.content6_4popup');
		});
		$('.btns div').on('click',function(){
			var pop = $(this).attr('pop');
			$('.content7_p .7_p').attr('src','img/content'+pop+'popup.jpg');
			popupshow('.content7_p');
		});
		$('.content7_p .x').on('click',function(){
			popuphide('.content7_p');
		});
		$('.content7_btn').on('click',function(){
			$('.content7_popup .7_p').attr('src','img/content7_popup.jpg');
			popupshow('.content7_popup');
		});
		$('.content7_popup .x').on('click',function(){
			popuphide('.content7_popup');
		});
		$('.tvcopen').on('click',function(){
			$('.tvc iframe').attr('src','https://www.youtube.com/embed/TKdWybfDa58?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1');
			popupshow('.tvc');
		});
		$('.tvc .x').on('click',function(){
			$('.tvc iframe').attr('src','');
			popuphide('.tvc');
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
    	ww = $(window).width();
        $.Body.stop().animate({scrollTop: section.eq(now).offset().top-(wh-section.height())/2},800);
        $('section .bgbox').css({'width': ww,'margin-left': -0.5*ww})
    }
}
var scrollfun = {
	sec3delta: 0,
	slider: -960,
	navchange: function(){
		function check(now) {	
			if( now == 1 || now == 3 || scrollfun.sec3delta == 0){
				temp ++;
				if( temp == 3 ){
					now++;
					$('nav ul li').eq(now).trigger('click');
				}	
			}else{
				$('nav ul li').eq(now).trigger('click');
			}
		}
		// function check2(now) {	
		// 	if( now == 1 || now == 3 || scrollfun.sec3delta == 0){
		// 		temp ++;
		// 		if( temp == 3 ){
		// 			now++;
		// 			$('nav ul li').eq(now).trigger('click');
		// 		}	
		// 	}else{
		// 		$('nav ul li').eq(now).trigger('click');
		// 	}
		// }
		
		$.Wrapper.mousewheel(function(event, delta){
				event.preventDefault();				
			if(!$.Body.is(':animated') && !scrolling){
				if( delta < 0){ //scroll down
					console.log(now,scrollfun.sec3delta);
					if( now < section.length-1){
						pre = now;
						if(now == 0 || now == 2){
							check(now);	
						}else if(now == 1){
							scrollfun.sec3delta += delta*10;
							if(scrollfun.sec3delta == -60){
								now ++;
								temp = 3;
								check(now);
							}else if(scrollfun.sec3delta == -30){
								//$('.sliderbtns .sliderbtn').eq(2).css({'background': '#216398'}).siblings().css({'background': '#fff'});
								$('.sliders').stop();
								$('.sliders').animate({'margin-left': scrollfun.slider*5},400);
							}else if(scrollfun.sec3delta == -10){
								//$('.sliderbtns .sliderbtn').eq(1).css({'background': '#216398'}).siblings().css({'background': '#fff'});
								$('.sliders').stop();
								$('.sliders').animate({'margin-left': scrollfun.slider*3},400);
						
							}
						}else if(now ==3){
							scrollfun.sec3delta += delta*30;
							$('.content4_1').scrollTop(scrollfun.sec3delta*-1);
							if(scrollfun.sec3delta < -1120 && $('.bg4_1').width()){
								$('.bg4_1').fadeOut(1000);
							}
							if(scrollfun.sec3delta < -2350){
								now ++;
								temp = 3;
								check(now);
								$('.content4_1').scrollTop(0);
							}
							// console.log()
							//$(this).unbind('mousewheel');
							//scrollfun.navchange();
						}else if(now == 4){
							scrollfun.sec3delta += delta;
							if(scrollfun.sec3delta == -5){
								$('.rightcontent').show().animate({'right': -3+'%'});
							}
							if(scrollfun.sec3delta == -10){
								$('.rightcontent .content5_2').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -15){
								$('.rightcontent .content5_3').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -20){
								$('.rightcontent .content5_4').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta < -27){
								now ++;
								temp = 3;
								check(now);
							}
							
						}else if(now == 5){
							scrollfun.sec3delta += delta;
							if(scrollfun.sec3delta == -3){
								$('.content6_1').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -6){
								$('.content6_2').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -9){
								$('.content6_3').fadeIn(1000).siblings().hide();
							}
							if(scrollfun.sec3delta == -12){
								$('.content6_3').fadeOut("slow");
								$('.content6_4').removeAttr('style').animate({'right': 13+'%'},1000);	
							}
							if(scrollfun.sec3delta < -20){
								$('.content6_4pic').scrollTop((scrollfun.sec3delta+15)*-8);
							}
							if(scrollfun.sec3delta < -40){
								now ++;
								temp = 3;
								check(now);
								$('.content6_4pic').scrollTop(0);
							}
							
						}
						
					}
					
				} else if ( delta > 0 ){ //scroll up
					console.log(now,scrollfun.sec3delta);
					// if( now > 0) {
     //                    pre = now;
     //                    now --;
     //                    $('nav ul li').eq(now).trigger('click');
     //                    check(now)
     //                }
     	 			if( now > 0) {
						pre = now;
						if(now == 6 ){
							 now --;
							$('nav ul li').eq(now).trigger('click');
						}else if(now == 5){
							 scrollfun.sec3delta += delta;
							if(scrollfun.sec3delta == 0){
								 now --;
								$('nav ul li').eq(now).trigger('click');
							}
							if(scrollfun.sec3delta == -2){
								$('.content6_1').fadeOut(1000);
								$('.title_6').fadeIn(1000);
							}
							if(scrollfun.sec3delta == -5){
								$('.content6_2').fadeOut(1000);
								$('.content6_1').fadeIn(1000);
							}
							if(scrollfun.sec3delta == -8){
								$('.content6_3').fadeOut(1000);
								$('.content6_2').fadeIn(1000);
							}
							if(scrollfun.sec3delta == -11){
								$('.content6_3').fadeIn("slow");
								$('.content6_4').animate({'right': -3000},1000).removeAttr('style');
								$('.content6_4').scrollTop(0);
							}
							if(scrollfun.sec3delta < -12){
								console.log((scrollfun.sec3delta+15)*-8+'@@@@');
								$('.content6_4pic').scrollTop((scrollfun.sec3delta+15)*-8);
							}
							// if(scrollfun.sec3delta < -40){
							// 	now ++;
							// 	temp = 3;
							// 	check(now);
							// 	$('.content6_4pic').scrollTop(0);
							// }
							
						}
						// }else if(now == 1){
						// 	scrollfun.sec3delta += delta*10;
						// 	if(scrollfun.sec3delta == -60){
						// 		now ++;
						// 		temp = 3;
						// 		check(now);
						// 	}else if(scrollfun.sec3delta == -30){
						// 		//$('.sliderbtns .sliderbtn').eq(2).css({'background': '#216398'}).siblings().css({'background': '#fff'});
						// 		$('.sliders').stop();
						// 		$('.sliders').animate({'margin-left': scrollfun.slider*5},400);
						// 	}else if(scrollfun.sec3delta == -10){
						// 		//$('.sliderbtns .sliderbtn').eq(1).css({'background': '#216398'}).siblings().css({'background': '#fff'});
						// 		$('.sliders').stop();
						// 		$('.sliders').animate({'margin-left': scrollfun.slider*3},400);
						
						 	// }
						// }else if(now ==3){
						// 	scrollfun.sec3delta += delta*30;
						// 	$('.content4_1').scrollTop(scrollfun.sec3delta*-1);
						// 	if(scrollfun.sec3delta < -1120 && $('.bg4_1').width()){
						// 		$('.bg4_1').fadeOut(1000);
						// 	}
						// 	if(scrollfun.sec3delta < -2350){
						// 		now ++;
						// 		temp = 3;
						// 		check(now);
						// 		$('.content4_1').scrollTop(0);
						// 	}
						// 	// console.log()
						// 	//$(this).unbind('mousewheel');
						// 	//scrollfun.navchange();
						// }else if(now == 4){
						// 	scrollfun.sec3delta += delta;
						// 	if(scrollfun.sec3delta == -5){
						// 		$('.rightcontent').show().animate({'right': -3+'%'});
						// 	}
						// 	if(scrollfun.sec3delta == -10){
						// 		$('.rightcontent .content5_2').fadeIn(1000).siblings().hide();
						// 	}
						// 	if(scrollfun.sec3delta == -15){
						// 		$('.rightcontent .content5_3').fadeIn(1000).siblings().hide();
						// 	}
						// 	if(scrollfun.sec3delta == -20){
						// 		$('.rightcontent .content5_4').fadeIn(1000).siblings().hide();
						// 	}
						// 	if(scrollfun.sec3delta < -27){
						// 		now ++;
						// 		temp = 3;
						// 		check(now);
						// 	}
							
						// }else 
						
						
					}
				}
			}
			
		});
	}
}
var PngFix = {
    PngFixF: function(obj) {
        obj.find('img[src$=".png"],img[src$=".gif"]').each(function() {
            this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        });
    }
}
$.Body = $('body');
$.Window = $(window);
$.Wrapper = $.Body.find('div.wrapper');
$.Loading = $.Body.find('div.loading');

var $imgs = $('body img'),
    count = 0;
$imgs.imagesLoaded().progress(function(instance, image) {
    count++;
    //percent = Math.round(count / $imgs.length * 100);
    if (count == $imgs.length) {
        PngFix.PngFixF($.Body);
        $.Loading.fadeOut();
        initial.initfun();
  
    }

});