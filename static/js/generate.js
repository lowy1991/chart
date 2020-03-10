var carousel		= $('.carousel');
var carouselInner 	= $('#carousel-inner');
var currPage		= $('#current-page');
var month 			= $('#month');
var totalPage 		= $('#total-page');
var week 			= $('#week');
var year 			= $('#year');
var carouselPage	= 1;
var count 			= 0;
var countWeek		= 0;
var countMonth		= 0; 
var countYear		= 0;
var page 			= 0;
var	lastLogin		= new Date();
var maxCol 			= 10;
var maxColMobile	= 5;
var maxItem			= 1000;
var maxNum			= 0;
var maxPage			= 0;

function change() {
	if (page <= maxPage) {
		if (count >= 0) {
			$(`#chart-${page} #lion-${count}`).css('filter', 'grayscale(0%)');
			$(`#chart-${page} #lion-${count}`).css('cursor', 'default');
			$(`#chart-${page} #lion-${count}`).off('click', change);
			update();
			$(`#chart-${page} #lion-${count}`).css('cursor', 'pointer');
			$(`#chart-${page} #lion-${count}`).on('click', change);
		}
	}
}

function checkCookie() {
	var currCount 	= getCookie('count');
	if (currCount == "") {
		setCookie('count', count, 365);
		setCookie('countWeek', countWeek, 365);
		setCookie('countMonth', countMonth, 365);
		setCookie('countYear', countYear, 365);
		setCookie('lastLogin', lastLogin, 365);
		setCookie('page', page, 365);
	}
	else {
		count 		= parseInt(currCount);
		countWeek	= parseInt(getCookie('countWeek'));
		if (countWeek == "") {
			countWeek	= count;
		}
		countMonth	= parseInt(getCookie('countMonth'));
		if (countMonth == "") {
			countMonth	= count;
		}
		countYear	= parseInt(getCookie('countYear'));
		if (countYear == "") {
			countYear	= count;
		}
		lastLogin	= new Date(Date.parse(getCookie('lastLogin')));
		page 		= parseInt(getCookie('page'));
	}
}	

function getCookie(cname) {
	var name = cname + "=";
  	var decodedCookie = decodeURIComponent(document.cookie);
  	var ca = decodedCookie.split(';');
  	for(var i = 0; i < ca.length; i++) {
  		var c = ca[i];
   		while (c.charAt(0) == ' ') {
      		c = c.substring(1);
    	}
    	if (c.indexOf(name) == 0) {
      		return c.substring(name.length, c.length);
    	}
    }
  	return "";
}

function getMaxpages() {
	if (window.matchMedia("(max-width: 768px)").matches) {
		maxNum		= 25;
	}
	else {
		maxNum		= 50;
	}
	maxPage		= maxItem/maxNum;
	currPage.text(carouselPage);
	totalPage.text(maxPage);
}

function getWeekNumber(d) {
	d 	= new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	var yearStart 	= new Date(Date.UTC(d.getUTCFullYear(),0,1));
	var weekNo 		= Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	return weekNo;
}

function getWidth() {
	var carouselItem= $('.carousel-item');
	var imgWidth 	= 0; 
	if (window.matchMedia("(max-width: 768px)").matches) {
		return imgWidth	= Math.floor(parseInt(carouselItem.width())/maxColMobile);
	}
	else {
		return imgWidth	= Math.floor(parseInt(carouselItem.width())/maxCol);	
	}
}

function loadCarousel() {
	var	imgWidth 	= 0;
	getMaxpages();
	for (i = 0; i < maxPage; i++) {
		if (i == 0) {
			carouselInner.append(`<div class="active carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
		}
		else {
			carouselInner.append(`<div class="carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
		}
		imgWidth = getWidth();
		loadChart(i, imgWidth);
	}
}

function loadChart(selector, imgWidth) {
	var padding	= imgWidth/10;
	for (j = 0; j < maxNum; j++) {
  		$(`#chart-${selector}`).append(`<img src="static/img/lion.svg" class="center-block" id="lion-${j}"/>`);
  		if (selector > page || (selector == page && j >= count)) {
  			$(`#chart-${selector} #lion-${j}`).css('filter', 'grayscale(100%)');	
  		}
  		$(`#chart-${selector} #lion-${j}`).css('padding', padding);
  		$(`#chart-${selector} #lion-${j}`).width(imgWidth-padding*2);
	}
}

function readyChart() {
	$(`#chart-${page} #lion-${count}`).css('cursor', 'pointer');
	$(`#chart-${page} #lion-${count}`).on('click', change);
}

function resetCount() {
	var d = new Date();
	if (d.getFullYear() > lastLogin.getFullYear()) {
		countWeek 	= 0;
		countMonth 	= 0;
		countYear	= 0;
	}
	else {
		if (d.getMonth() > lastLogin.getMonth()) {
			countMonth	= 0;
			countWeek	= 0;
		}
		else {
			if (getWeekNumber(d) > getWeekNumber(lastLogin)) {
				countWeek	= 0;
			}
		}
	}
}

function setCookie(cname, cvalue, exdays) {
  	var d = new Date();
  	var expires; 
  	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  	expires = "expires="+ d.toUTCString();
  	document.cookie 	= cname + "=" + cvalue + ";" + expires + ";path=/";
}

function throttle (limit) {
    var wait = false;                 
    return function () {              
        if (!wait) {                  
            wait = true;              
            setTimeout(function () {  
                wait = false;         
            }, limit);
        }
    }
 }

function update() {
	var d 			= new Date();
	if (count == (maxNum-1)) {
		count 	= 0;
		page++;
		carousel.carousel('next');	
	}
	else {
		count 	= (count+1)%maxNum;
	}
	countWeek++;
	countMonth++;
	countYear++;
	updateCounter();

	setCookie('count', count, 365);
	setCookie('countWeek', countWeek, 365);
	setCookie('countMonth', countMonth, 365);
	setCookie('countYear', countYear, 365);	
	setCookie('lastLogin', d.toUTCString(), 365);
	setCookie('page', page, 365);
}

function updateCounter() {
	week.text(countWeek*15);
	month.text(countMonth*0.25);
	year.text(countYear*0.25);
}

carousel.bind('slide.bs.carousel', function (e) {
    if (e.direction == 'left') {
    	if (carouselPage == maxPage) {
    		carouselPage	= 1;
    	}
    	else {
    		carouselPage++;
    	}
    }
    else {
    	if (carouselPage == 1) {
    		carouselPage	= maxPage;
    	}
    	else {
    		carouselPage--;	
    	}
    }
    currPage.text(carouselPage);
});

$(document).ready(function() {
	checkCookie();
	resetCount();
	updateCounter();
	loadCarousel();
	readyChart();
	window.addEventListener("scroll", throttle(500));
});