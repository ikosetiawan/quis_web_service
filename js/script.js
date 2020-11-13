function CariFilm() {
    $('#list-movie').html('');
    $.ajax({
        "url": "https://superheroapi.com/api/2496760007080777/search/"+$('#text-cari').val(),
        "type": "get",
        "dataType": "json"
        // "data": {
        //     "apikey": "eb557778",
        //     "s": 
        // }
        ,
        success: function (heroes) {
            if (heroes.response == "success") {
                film = heroes.results;
                $.each(film, function (i, data) {
                    $('#list-movie').append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="` + data.image.url + `" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">` + data.name + `</h5>
                                <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModal" data-id="` + data.id + `">Detail karakter</a>
                            </div>
                        </div>
                    </div>`);
                });

            } else {
                $('#list-movie').html(`
                <h3>` +
                    heroes.Error + `</h3>`);
            }
        }
    })

}


$('#btnCari').on('click', function () {
    CariFilm();
});

$('#text-cari').on('keyup', function (e) {
    if (e.keyCode == 13) {
        CariFilm();
    }
});

$('#list-movie').on('click', '.card-link', function () {
    $('#movie-detil').html('');
    var id = $(this).data('id')
    console.log(id);
    var html = ``;
    $.ajax({
        "url": `https://superheroapi.com/api/2496760007080777/${id}`,
        "type": "get",
        "dataType": "json",
        // "data": {
        //     "apikey": "eb557778",
        //     "i": $(this).data('id')
        // },
        success: function (response) {
            console.log(response.image.url);
            $('#movie-detil').html( `
            <div class="col-md-4">
                <img src="${response.image.url}" class="img-fluid" alt="Responsive image">
            </div>
            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item active">${response.name }</li>
                    <li class="list-group-item">Rilis: ${response.biography.publisher}</li>
                    <li class="list-group-item">Gener: ${response.appearance.gender}</li>
                    
                </ul>
            </div>`);
            
        }
    });

})