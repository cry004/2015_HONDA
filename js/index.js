var initial = {
	initfun: function(){
		navfun.navclick();
		scrollfun.navchange();
	}
}
var now = 0,pre = 0,scrolling = false;
var section =  $('section');
var navfun = {
	navall: $('nav'),
	navclick: function(){
		navfun.navall.find('ul li').on('click',function(){
			var index = $(this).index();
			scrolling = true;
			console.log(scrolling,index);
			$('body').animate({scrollTop: section.eq(index).offset().top},800,'easeInOutCubic',function(){
				now = index;
				console.log(scrolling,now);
			});
				scrolling = false;
		});
	}
}


var scrollfun = {
	scrollpre: 0,
	navchange: function(){
		if(!$('body').is(':animated') && !scrolling){
			$(window).scroll(function(){
			// console.log($(this).scrollTop());
				if($(this).scrollTop() > scrollfun.scrollpre){ //scroll down
					if( now < section.length-1){
					now ++;
					console.log(now);
					$('nav ul li').eq(now).trigger('click');
					console.log(pre,now);				
					pre = now;
					}
					scrollfun.scrollpre = $(this).scrollTop();
				}else if($(this).scrollTop()<scrollfun.scrollpre){ //scroll up
					//console.log('-');
					scrollfun.scrollpre = $(this).scrollTop();
				}			
			});
		}
	}
}
$(window).load(function(){
	initial.initfun();
});