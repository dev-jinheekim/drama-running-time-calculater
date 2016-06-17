/* jshint jquery: true */

$(function() {

  'use strict';
  var IMG_ORIGIN = 'http://image.tmdb.org/t/p/w185/';

  function append_tv(tv){
    var title = '<h2>' + tv.name + '</h2>',
        id = tv.id,
        poster = '<img src="' + IMG_ORIGIN + tv.poster_path + '">',
        summary = '<p>' + tv.overview + '</p>',
        score = '<p>평점 : ' + tv.vote_average + '</p>';
    $('.drama_list').append('<li data-id="' + id + '" class="drama_list_item">' +
                            title +
                            poster +
                            summary +
                            score +
                            '</li>');  
  }

  function append_tvs(tvs){
    for( var i = 0; i < tvs.length; i++){
      append_tv(tvs[i]);
    }
  }

  function search_tv(search_title){
    $.ajax({
      url: '/search',
      method: 'GET',
      data: { search_title: search_title },
      dataType: 'json', // 응답 데이터 타입
      success: function(data) {
        append_tvs(data.results);
      }
    });
  }

  function search_tv_detail(id){
    $.ajax({
      url: '/detail',
      method: 'GET',
      data: { id: id },
      dataType: 'json', // 응답 데이터 타입
      success: function(data) {
      
      }
    });
  }

  $('#search_title').on('keydown', function() {
    var search_title = $('#search_title').val();
    $('.drama_list').empty();
    search_tv(search_title);
  });
  
  $('.drama_list_item').on('click', function() {
    var id = $(this).data('id');
    search_tv_detail(id);
  });


  
});

