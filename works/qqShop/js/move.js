function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}


//startMove(oDiv, {width: 400, height: 400})


function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				// Math.round() 四舍五入取近似值
				// 解析一个字符串并返回一个浮点数   e.g. parseFloat("0.6") = 0.6
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				// 解析一个字符串并返回一个整数  e.g. parseInt("10") = 10
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			// Math.ceil() 向上取整， Math.floor() 向下取整。
			// e.g.
			// Math.ceil(2.2) = 3, Math.floor(-2.2) = -3;
			// Math.floor(2.2) = 2, Math.ceil(-2.2) = -2;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])  // 判断是否到达了目标值
				bStop=false;
			
			if(attr=='opacity')
			{
				// 兼容浏览器
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)  // 若 bStop = true, 已到达目标值，则清除定时器，若存在 fnEnd, 则执行其
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}