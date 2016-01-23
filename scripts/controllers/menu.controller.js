mapp.controller('menuCtrl', menuCtrl);

function menuCtrl(){

    console.log('menu ctrl');

    $('.menu').click(function(){
    	var menu_state = $('#dropdown_menu').css('display');

    	if (menu_state == 'block'){
    		$('#dropdown_menu').toggle('slide', {direction: 'up'});
    		$('.menu h4').html('MENU');
    	}else{
    		$('#dropdown_menu').toggle('slide', {direction: 'up'});
    		$('.menu h4').html('CLOSE');
    	}
    });
}
