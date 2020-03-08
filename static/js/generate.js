var play		= $('.carousel');
var carousel 	= $('#carousel-inner');
var indicator	= $('#carousel-indicator');
var count 		= 0; 
var page 		= 0;

function loadCarousel() {
	for (i = 0; i < 10; i++) {
		if (i == 0) {
			carousel.append(`<div class="active carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
			indicator.append(`<li class="active" data-target="#charts" data-slide-to="${i}"></li>`);
		}
		else {
			carousel.append(`<div class="carousel-item m-0 w-50"><div class="d-flex flex-wrap justify-content-center" id="chart-${i}"></div></div>`);
			indicator.append(`<li data-target="#charts" data-slide-to="${i}"></li>`);
		}
		loadChart(i);
	}
}

function loadChart(selector) {
	for (j = 0; j < 36; j++) {
  		$(`#chart-${selector}`).append('<img src="static/img/lion.svg" class="center-block filter p-2" id="lion-' + j + '" />');
  		$(`#chart-${selector} #lion-${j}`).css('filter', 'grayscale(100%)');
	}
}

$('body').click(function() {
	play.carousel('pause');
})

$(document).ready(function() {
	play.carousel('pause');
	loadChart(0);
	loadCarousel();
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