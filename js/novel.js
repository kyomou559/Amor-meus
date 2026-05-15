
// 小説ページ送りボタン　クラス追加
$(function () {
 $(".pagebtn").on("click", function () {
  $(this).toggleClass('is-active');

  if ($(this).hasClass('is-active')) {
   $('.pageTurn').addClass('is-active');
  } else {
   $('.pageTurn').removeClass('is-active');
  }
 });
});

// 縦横返還ボタン　クラス追加
$(function () {
 $(".yoko").on("click", function () {
  $('.story').addClass('horizontal');

  if ($('.story').hasClass('horizontal')) {
   $('.story').removeClass('vertical');
  }
 });
});

$(function () {
 $(".tate").on("click", function () {
  $('.story').addClass('vertical');

  if ($('.story').hasClass('vertical')) {
   $('.story').removeClass('horizontal');
  }
 });
});


// スムーススクロール
$(function () {
 var width = $(window).width();
 $('a[href*="#"]').click(function () {
  var speed = 400;
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  $('body,html').animate({ scrollTop: position }, speed, 'swing');
  return false;
 });
});