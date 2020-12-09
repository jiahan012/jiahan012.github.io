
(function () {

  // 燈箱
  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: 'true',
    fixedBgPos: 'true',
    removalDelay: 100,
    mainClass: 'my-mfp-zoom-in'
  });
  document.addEventListener('onselectstart', function () {
    return false;
  })

  // 禁用雙指縮放
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);

  // 禁用手指雙擊縮放
  var lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默認的處理方式(阻止下拉滑動的效果)
  }, { passive: false }); //passive 參數不能省略，用來兼容ios和android

  // PChome APP開啟時不顯示
  var useragent = navigator.userAgent;
  var useAPP = useragent.match(/PChome/);
  if (useAPP == 'PChome') {
    $('.media_share').css('display', 'none');
  }

})();