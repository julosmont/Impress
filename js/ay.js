//ay.js
function user()
{
	var send=function(e)
	{
		console.log('ay mouseup');

		$.ajax('ay.php?save',{
			method:'POST',
			data:{svg:svg.innerHTML}
		});
	};

	window.addEventListener('touchend', send);
		window.addEventListener('mouseout', send);

	load_svg();

}


function screen()
{
	setInterval(load_svg,800);
}

if(location.hash==='#screen')
	screen();
else
	user();


function load_svg()
{
	$.ajax('ay.php?get',{
		success:function(result)
		{
			console.log('ay get');

			if(result)
				svg.innerHTML=result;

			$.getScript('js/index.js');
		}
	});
}