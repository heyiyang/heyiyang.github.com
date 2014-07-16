// JavaScript Document
window.onload = function() {
	var oFloor0 = document.getElementById('floor0');
	var oFhd0 = document.getElementById('fhd0');
	var aA = oFhd0.getElementsByTagName('a');
	var aFloor_tab_bd = getByClass(oFloor0, "div", "floor_tab_bd");
	var oSlide_bannar = document.getElementById("slide_bannar");
	var oUl = document.getElementById("sliding_wrap");
	var aLi = oUl.getElementsByTagName("li");
	var oSb_pre = document.getElementById("sb_pre");
	var oSb_next = document.getElementById("sb_next");
	var oSb_control = document.getElementById("sb_control");
	var aLi2 = oSb_control.getElementsByTagName("li");
	var iNow = 0;
	var timer = null;
	
	
	for(var i=0; i<aA.length; i++) {
		(function(i) {
			aA[i].onmouseover = function() {
				for(var j=0; j<aA.length; j++) {
					removeClass(aA[j],"bg_color0"+j);
					removeClass(aA[j],"active");
					aFloor_tab_bd[j].style.display = "none";
				}
				addClass(this,"bg_color0"+i);
				addClass(this,"active");
				aFloor_tab_bd[i].style.display = "block";
			};
		})(i);
	}
	//alert(aFloor_tab_hd);
	
	//slide_bannar
			// show the "botton menu"
			oSlide_bannar.onmouseover = function() {
				oSb_pre.style.display = oSb_next.style.display = 'block';
				oSb_pre.style.cursor = oSb_next.style.cursor = 'pointer';
				clearInterval(timer);
			};
			// onmouseout event
			// hide the "botton menu"
			oSlide_bannar.onmouseout = function() {
				oSb_pre.style.display = oSb_next.style.display = 'none';
				doMove();
			};
			
			// move by clicking the dot botton
			for(var i = 0; i < aLi2.length; i++) {
				aLi2[i].onmouseover = function() {
					this.style.cursor = 'pointer';
				};
				// use closures to save the "i"'s every value in the memory
				(function(i) {
					aLi2[i].onclick = function() {
						for(var j = 0; j < aLi2.length; j++) {
							aLi2[j].style.color = "#fff";
						}
						this.style.color = "#000";
						startMove(oUl, {
							left: -i*aLi[0].offsetWidth
						});
						//alert(iNow);
						iNow = i;
						//alert(iNow);
					};
				})(i);
			}
			
			// move by clicking the deraction botton
			oUl.style.width = (aLi[0].offsetWidth*aLi.length) + 'px';
			oSb_pre.onclick = function() {
				if(iNow <= 0) {
					startMove(oUl, {
						left: -aLi[0].offsetWidth * (aLi.length - 1)
					})
					for(var j = 0; j < aLi2.length; j++) {
						aLi2[j].style.color = "#fff";
					}
					iNow = (aLi.length-1);
					aLi2[iNow].style.color = "#000";
				} else {
					startMove(oUl, {
						left: -(iNow - 1)*aLi[0].offsetWidth
					});
					for(var j = 0; j < aLi2.length; j++) {
						aLi2[j].style.color = "#fff";
					}
					iNow--;
					aLi2[iNow].style.color = "#000";
				}
			};
			oSb_next.onclick = function() {
				if(iNow >= (aLi.length - 1)) {
					startMove(oUl, {
						left: 0
					});
					for(var j = 0; j < aLi2.length; j++) {
						aLi2[j].style.color = "#fff";
					}
					iNow = 0;
					aLi2[iNow].style.color = "#000";
				} else {
					startMove(oUl, {
						left: -(iNow + 1) * aLi[0].offsetWidth
					});
					for(var j = 0; j < aLi2.length; j++) {
						aLi2[j].style.color = "#fff";
					}
					iNow++;
					aLi2[iNow].style.color = "#000";
				}
			};
			
			// move automagically
			doMove();
			function doMove() {
				timer = setInterval(function() {
					if(iNow >= aLi.length) {
						iNow = 0;
					}
					startMove(oUl, {
						left: -iNow * aLi[0].offsetWidth
					});
					for(var j = 0; j < aLi2.length; j++) {
						aLi2[j].style.color = "#fff";
					}
					aLi2[iNow].style.color = "#000";
					iNow++;
				}, 1000 * 3);
			}
	
};

function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
 
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
          var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}
/*
//call the functions
addClass(document.getElementById("test"), "test");
removeClass(document.getElementById("test"), "test")
if(hasClass(document.getElementById("test"), "test")){//do something};
*/
/*通过class来获取DOM*/

function getByClass(oParent,tagName,newClass){
	//获取oParent里的所有tagName标签
	var aElements = oParent.getElementsByTagName(tagName);
	//创建newArray数组,用于存储oParent里含有newClass的tagName标签
	var newArray = [];
	//根据条件筛选满足条件的aElements标签
	for(var i = 0;i<aElements.length;i++){
		//通过split()将每个aElements元素的class进行分割，并创建生成数组
		var cutClass = aElements[i].className.split(' ');
		//将含有newClass字符的aElements存入newArray数组对象里面
		for(var j = 0;j<cutClass.length;j++){
			if(cutClass[j] == newClass){
				newArray.push(aElements[i]);
				//满足条件后break,避免同一个标签含多个同样的class
				break;
			}
		}
		 
	}
	//返回筛选的结果
	return newArray;
};

/*
function getByClass(oParent, sClass) {
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	 
	for(i=0;i<aEle.length;i++) {
		if(aEle[i].className==sClass) {
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}
*/