require(['jquery'],function($){

	var $chapter = $('.summary > li.chapter');
	var $hiddenCon = $('<ul><li class="toggle" ><a href="javascript:;" > <i class="fa fa-angle-double-up fa-angle-double-down"></i></a></li></ul>').appendTo( $('<li class="hidden-con"></li>').appendTo($('.summary')));
	var toggleItem = (function(){
		var map = JSON.parse(localStorage.chapter||"{}")||{}

		return function(level,hide){
			level >= 0 && (map[level] = !!hide);

			$hiddenCon.find('li.item').remove();
			$chapter.show();

			$.each(map,function(level,hide){
				if(!hide)return;

				var $item = $chapter.filter('[data-level='+level+']');
				console.log(level,$item);
				$item.hide();
				$hiddenCon.append($('<li class="item" ></li>').data('level',level).append('<a href="javascript:;" >' + $item.find('>a').text() + '<i class="fa fa fa-eye"></i></a>'));

			});

			localStorage.chapter = JSON.stringify(map);
		};
	})();

	$chapter.find('>a').append('<i class="fa fa-eye-slash" ></i>');

	$chapter.on('click','a > i' , function(e){
		var $this = $(this).parents('li:eq(0)');
		toggleItem($this.data("level"),true);
		return false;
	});

	$hiddenCon.on('click',':not(.toggle) a',function(){
		var $this = $(this).parent();
		toggleItem($this.data('level'),false);
	}).on('click','.toggle a',function(){
		$(this).find('.fa').toggleClass('fa-angle-double-down');
		$hiddenCon.toggleClass('show');
	});

	toggleItem(-1);

});