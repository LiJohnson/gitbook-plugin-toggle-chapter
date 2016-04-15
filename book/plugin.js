require(['jquery'],function($){

	var $chapter = $('.summary > li.chapter');
	var $hiddenCon = $('<ul><li class="toggle" ><a href="javascript:;" > <i class="fa fa-angle-double-up fa-angle-double-down"></i></a></li></ul>').appendTo( $('<li class="hidden-con"></li>').appendTo($('.summary')));
	var toggleItem = (function(){
		var map = JSON.parse(localStorage.chapter||"{}")||{}

		return function(index,hide){
			index >= 0 && (map[index] = !!hide);

			$hiddenCon.find('li.item').remove();
			$chapter.show();

			$.each(map,function(index,hide){
				if(!hide)return;

				$chapter.eq(index).hide();
				$hiddenCon.append($('<li class="item" ></li>').data('index',index).append('<a href="javascript:;" >' + $chapter.eq(index).find('>a').text() + '<i class="fa fa fa-eye"></i></a>'));

			});

			localStorage.chapter = JSON.stringify(map);
		};
	})();

	$chapter.find('>a').append('<i class="fa fa-eye-slash" ></i>');

	$chapter.on('click','a > i' , function(e){
		var $this = $(this).parents('li:eq(0)');
		var index = $chapter.index($this);
		toggleItem(index,true);
		return false;
	});

	$hiddenCon.on('click',':not(.toggle) a',function(){
		var $this = $(this).parent();
		toggleItem($this.data('index'),false);
	}).on('click','.toggle a',function(){
		$(this).find('.fa').toggleClass('fa-angle-double-down');
		$hiddenCon.toggleClass('show');
	});

	toggleItem(-1);

});