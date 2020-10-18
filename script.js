$(function() {
	$('.race').on('click', function(e) {
		e.preventDefault();
		let count = 3;

		$('#count').addClass('count');
		$('.count').html(count);

		let start = setInterval(function() {
			count--;
			$('.count').html(count);

			if (count == 0) {
				$('.count').html('');
				clearInterval(start);
				$('#count').removeClass('count');
				// $('.race').attr('disabled', 'disabled');
				// $('.startOver').attr('disabled', 'disabled');
				setTimeout(function() {
					let Car1 = Math.floor(Math.random() * (1000 + 1) + 300);
					let Car2 = Math.floor(Math.random() * (1000 + 1) + 300);

					$('.car1').animate(
						{
							marginLeft: '80%'
						},
						Car1,
						function() {
							if (Car1 < Car2) {
								// console.log(`car1 ${randomCar1}`)
								// console.log(`car2 ${randomCar2}`)
								$('.score1').append(`
								<tr>
                                    <td>
                                        <h5>Finished in: <span class="car1Color">first</span> place with a time of: <span class="car1Color">${Car1}</span> milliseconds!</h5>
                                    </td>
								</tr>
								`);
								$('#flag').addClass('flag');
								$('body').on('click', function() {
									$('#flag').removeClass('flag');
									$('.race').removeAttr('disabled');
									$('.startOver').removeAttr('disabled');
								});
							} else {
								$('.score1').append(`
								<tr>
                                    <td>
                                        <h5>Finished in: <span class="car1Color">second</span> place with a time of: <span class="car1Color">${Car1}</span> milliseconds!</h5>
                                    </td>
								</tr>
								`);
							}
							localStorage.setItem('Car1', Car1);
						}
					);
					$('.car2').animate(
						{
							marginLeft: '80%'
						},
						Car2,
						function() {
							if (Car1 > Car2) {
								// console.log(`car1 ${Car1}`)
								// console.log(`car2 ${Car2}`)
								$('.score2').append(`
								<tr>
                                    <td>
                                        <h5>Finished in: <span class="car2Color">first</span> place with a time of: <span class="car2Color">${Car2}</span> milliseconds!</h5>
                                    </td>
								</tr>
								`);
								$('#flag').addClass('flag');
								$('body').on('click', function() {
									$('#flag').removeClass('flag');
									$('.race').removeAttr('disabled');
									$('.startOver').removeAttr('disabled');
								});
							} else {
								$('.score2').append(`
								<tr>
                                    <td>
                                        <h5>Finished in: <span class="car2Color">second</span> place with a time of: <span class="car2Color">${Car2}</span> milliseconds!</h5>
                                    </td>
								</tr>
								`);
							}
							localStorage.setItem('Car2', Car2);
						}
					);
				});
			}
		}, 1000);
	});

	$('.startOver').on('click', function() {
		$('.car1').css({ marginLeft: '0' });
		$('.car2').css({ marginLeft: '0' });
	});
	$(function() {
		let car1Result = localStorage.getItem('Car1');
		let car2Result = localStorage.getItem('Car2');
		if (car1Result == '' && car2Result == '') {
			$('previousResult').hide();
			$('.finalScore').hide();
		} else {
			$('.previousResult').show();
			if (parseInt(car1Result) < parseInt(car2Result)) {
				$('.finalScore').append(`
				<tr>
					<td class="previous">
						<h5> <span class="car1Color">Car1</span> finished in <span class="car1Color">first</span> place, with a time of <span class="car1Color">${car1Result}</span> milliseconds!</h5>
					</td>
				</tr>
				<tr>
					<td class="previous">
						<h5> <span class="car2Color">Car2</span> finished in <span class="car2Color">second</span> place, with a time of <span class="car2Color">${car2Result}</span> milliseconds!</h5>
				    </td>
				</tr>
				`);
			} else {
				$('.finalScore').append(`
				<tr>
					<td class="previous">
						<h5> <span class="car1Color">Car1</span> finished in <span class="car1Color">second</span> place, with a time of <span class="car1Color">${car1Result}</span> milliseconds!</h5>
					</td>
				</tr>
					<tr>
					<td class="previous">
						<h5> <span class="car2Color">Car2</span> finished in <span class="car2Color">first</span> place, with a time of <span class="car2Color">${car2Result}</span> milliseconds!</h5>
					</td>
				</tr>
				`);
			}
		}
	});
});
