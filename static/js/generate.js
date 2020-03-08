var play		= $('.carousel');
var carousel 	= $('#carousel-inner');
var icon 		= $('img');
var indicator	= $('#carousel-indicator');
var count 		= 0;
var page 		= 0;
var maxCol 			= 10;
var maxColMobile	= 5;
var maxNum			= 0;

function getWidth() {
	var carouselItem= $('.carousel-item');
	var imgWidth 	= 0; 
	if (window.matchMedia("(max-width: 760px)").matches) {
		maxNum		= 20;
		return imgWidth	= Math.floor(parseInt(carouselItem.width())/maxColMobile);
	}
	else {
		maxNum		= 50;
		return imgWidth	= Math.floor(parseInt(carouselItem.width())/maxCol);	
	}
}

function loadCarousel() {
	var	imgWidth 	= 0;
	for (i = 0; i < 10; i++) {
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
  		$(`#chart-${selector}`).append(`<img src="static/img/lion.svg" class="center-block filter" id="lion-${j}"/>`);
  		$(`#chart-${selector} #lion-${j}`).css('filter', 'grayscale(100%)');
  		$(`#chart-${selector} #lion-${j}`).css('padding', padding);
  		$(`#chart-${selector} #lion-${j}`).width(imgWidth-padding*2);
	}
}

$('body').click(function() {
	play.carousel('pause');
})

$(document).ready(function() {
	play.carousel('pause');
	loadCarousel();
	console.log($('img').width());
	console.log($('.carousel-item').css('width'));
	console.log(parseInt($('.carousel-item').css('width'))/parseInt($('img').css('width')));
	// loadChart();
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