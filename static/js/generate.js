var play		= $('.carousel');
var carousel 	= $('#carousel-inner');
var icon 		= $('img');
var indicator	= $('#carousel-indicator');
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
			indicator.append(`<li class="active" data-target="#charts" data-slide-to="${i}"></li>`);
		}
		else {
			carousel.append(`<div class="carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
			indicator.append(`<li data-target="#charts" data-slide-to="${i}"></li>`);
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
}

$('body').click(function() {
	play.carousel('pause');
});

$(document).ready(function() {
	play.carousel('pause');
	loadCarousel();
	fillChart();
	// $('#lion-'+count).css('cursor', 'pointer');
	// $('#lion-'+count).addClass('filter');
	// $('.filter').click(function() {
	// 	if (count >= 0) {
	// 		$('#lion-'+count).css('filter', 'grayscale(0%)');
	// 		$('#lion-'+count).css('cursor', 'default');
	// 		count--;
	// 		$('#lion-'+count).css('cursor', 'pointer');
	// 	}
	// });
});