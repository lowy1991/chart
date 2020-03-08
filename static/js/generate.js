var play		= $('.carousel');
var carousel 	= $('#carousel-inner');
var controlLeft	= $('.carousel-control-prev');
var controlRight= $('.carousel-control-next');
var currPage	= $('#current-page');
var icon 		= $('img');
var indicator	= $('#carousel-indicator');
var totalPage 	= $('#total-page');
var carouselPage= 1;
var count 		= 0;
var page 		= 0;
var maxCol 			= 10;
var maxColMobile	= 5;
var maxItem			= 400;
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

function fillChart() {
	$(`#chart-${page} #lion-${count}`).css('cursor', 'pointer');
	$(`#chart-${page} #lion-${count}`).on('click', change);
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
			carousel.append(`<div class="active carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
		}
		else {
			carousel.append(`<div class="carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
		}
		imgWidth = getWidth();
		loadChart(i, imgWidth);
	}
}

function loadChart(selector, imgWidth) {
	var padding	= imgWidth/10;
	for (j = 0; j < maxNum; j++) {
  		$(`#chart-${selector}`).append(`<img src="static/img/lion.svg" class="center-block" id="lion-${j}"/>`);
  		$(`#chart-${selector} #lion-${j}`).css('filter', 'grayscale(100%)');
  		$(`#chart-${selector} #lion-${j}`).css('padding', padding);
  		$(`#chart-${selector} #lion-${j}`).width(imgWidth-padding*2);
	}
}

function update() {
	if (count == (maxNum-1)) {
		count 	= 0;
		page++;
		play.carousel('next');	
	}
	else {
		count 	= (count+1)%maxNum;
	}
	document.cookie	= `count=${count};page=${page};`;
}

controlLeft.click(function () {
	if (carouselPage == 1) {
		carouselPage	= 8;
	}
	else {
		carouselPage--;
	}
	currPage.text(carouselPage);
});

controlRight.click(function () {
	if (carouselPage == 8) {
		carouselPage	= 1;
	}
	else {
		carouselPage++;
	}
	currPage.text(carouselPage);
});

$('body').click(function() {
	play.carousel('pause');
});

$(document).ready(function() {
	play.carousel('pause');
	loadCarousel();
	fillChart();
});