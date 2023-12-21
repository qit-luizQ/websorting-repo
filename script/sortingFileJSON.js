$('.scrollable').hide();

const jsonFileLoad = fetch("http://192.168.0.15:8080/files/people.json")
  .then(function (response) {
    return response.json();
  });


jsonFileLoad.then(function (data) {
  for (var i = 0; i < data.length; i++) {
    $('#bodyContent').append('<tr><th scope="row">' + data[i].id + '</th><td>' + data[i].name +
      '</td><td>' + data[i].number + '</td></tr>');
  }

  $('#sortingButton').on("click", function () {
    if ($(this).text() == 'Sortear') {
      $(this).text('Reiniciar');
      $('#attendantButton').hide();
      var sortingTimeStamp = new Date().toLocaleString();
      var remainingTime = 5;
      var getTimer = setInterval(function () {
        if (remainingTime <= 0) {
          clearInterval(getTimer);
          let sortedNumber = Math.floor(Math.random() * data.length);
          $('#result').html('<br><br><h2>Numero Sorteado: ' + data[sortedNumber].number +
          '</h2><br><h1>PARABÉNS, ' + data[sortedNumber].name + ' !!!</h1><br><h4>' + sortingTimeStamp + '</h4>');

        } else {
          $('#result').html('<br><h1>' + remainingTime + '</h1>');
        }
        remainingTime -= 1;
      }, 1000);
    } else {
      $('#result').html('');
      $(this).text('Sortear');
      history.go(0);
    }
  });
});


$('#attendantButton').on('click', function () {
  $('.scrollable').toggle('slow');
});

