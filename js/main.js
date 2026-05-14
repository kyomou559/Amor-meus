//===============================================================
// メニュー制御用の関数とイベント設定（※バージョン2025-1）
//===============================================================
$(function(){
  //-------------------------------------------------
  // 変数の宣言
  //-------------------------------------------------
  const $menubar = $('#menubar');
  const $menubarHdr = $('#menubar_hdr');
  const breakPoint = 9999;	// ここがブレイクポイント指定箇所です

  // ▼ここを切り替えるだけで 2パターンを使い分け！
  //   false → “従来どおり”
  //   true  → “ハンバーガーが非表示の間は #menubar も非表示”
  const HIDE_MENUBAR_IF_HDR_HIDDEN = false;

  // タッチデバイスかどうかの判定
  const isTouchDevice = ('ontouchstart' in window) ||
                       (navigator.maxTouchPoints > 0) ||
                       (navigator.msMaxTouchPoints > 0);

  //-------------------------------------------------
  // debounce(処理の呼び出し頻度を抑制) 関数
  //-------------------------------------------------
  function debounce(fn, wait) {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }

  //-------------------------------------------------
  // ドロップダウン用の初期化関数
  //-------------------------------------------------
  function initDropdown($menu, isTouch) {
    // ドロップダウンメニューが存在するliにクラス追加
    $menu.find('ul li').each(function() {
      if ($(this).find('ul').length) {
        $(this).addClass('ddmenu_parent');
        $(this).children('a').addClass('ddmenu');
      }
    });

    // ドロップダウン開閉のイベント設定
    if (isTouch) {
      // タッチデバイスの場合 → タップで開閉
      $menu.find('.ddmenu').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const $dropdownMenu = $(this).siblings('ul');
        if ($dropdownMenu.is(':visible')) {
          $dropdownMenu.hide();
        } else {
          $menu.find('.ddmenu_parent ul').hide(); // 他を閉じる
          $dropdownMenu.show();
        }
      });
    } else {
      // PCの場合 → ホバーで開閉
      $menu.find('.ddmenu_parent').hover(
        function() {
          $(this).children('ul').show();
        },
        function() {
          $(this).children('ul').hide();
        }
      );
    }
  }

  //-------------------------------------------------
  // ハンバーガーメニューでの開閉制御関数
  //-------------------------------------------------
  function initHamburger($hamburger, $menu) {
    $hamburger.on('click', function() {
      $(this).toggleClass('ham');
      if ($(this).hasClass('ham')) {
        $menu.show();
        // ▼ ブレイクポイント未満でハンバーガーが開いたら body のスクロール禁止
        //    （メニューが画面いっぱいに fixed 表示されている時に背後をスクロールさせないため）
        if ($(window).width() < breakPoint) {
          $('body').addClass('noscroll');  // ★追加
        }
      } else {
        $menu.hide();
        // ▼ ハンバーガーを閉じたらスクロール禁止を解除
        if ($(window).width() < breakPoint) {
          $('body').removeClass('noscroll');  // ★追加
        }
      }
      // ドロップダウン部分も一旦閉じる
      $menu.find('.ddmenu_parent ul').hide();
    });
  }

  //-------------------------------------------------
  // レスポンシブ時の表示制御 (リサイズ時)
  //-------------------------------------------------
  const handleResize = debounce(function() {
    const windowWidth = $(window).width();

    // bodyクラスの制御 (small-screen / large-screen)
    if (windowWidth < breakPoint) {
      $('body').removeClass('large-screen').addClass('small-screen');
    } else {
      $('body').removeClass('small-screen').addClass('large-screen');
      // PC表示になったら、ハンバーガー解除 + メニューを開く
      $menubarHdr.removeClass('ham');
      $menubar.find('.ddmenu_parent ul').hide();

      // ▼ PC表示に切り替わったらスクロール禁止も解除しておく (保険的な意味合い)
      $('body').removeClass('noscroll'); // ★追加

      // ▼ #menubar を表示するか/しないかの切り替え
      if (HIDE_MENUBAR_IF_HDR_HIDDEN) {
        $menubarHdr.hide();
        $menubar.hide();
      } else {
        $menubarHdr.hide();
        $menubar.show();
      }
    }

    // スマホ(ブレイクポイント未満)のとき
    if (windowWidth < breakPoint) {
      $menubarHdr.show();
      if (!$menubarHdr.hasClass('ham')) {
        $menubar.hide();
        // ▼ ハンバーガーが閉じている状態ならスクロール禁止も解除
        $('body').removeClass('noscroll'); // ★追加
      }
    }
  }, 200);

  //-------------------------------------------------
  // 初期化
  //-------------------------------------------------
  // 1) ドロップダウン初期化 (#menubar)
  initDropdown($menubar, isTouchDevice);

  // 2) ハンバーガーメニュー初期化 (#menubar_hdr + #menubar)
  initHamburger($menubarHdr, $menubar);

  // 3) レスポンシブ表示の初期処理 & リサイズイベント
  handleResize();
  $(window).on('resize', handleResize);

  //-------------------------------------------------
  // アンカーリンク(#)のクリックイベント
  //-------------------------------------------------
  $menubar.find('a[href^="#"]').on('click', function() {
    // ドロップダウンメニューの親(a.ddmenu)のリンクはメニューを閉じない
    if ($(this).hasClass('ddmenu')) return;

    // スマホ表示＆ハンバーガーが開いている状態なら閉じる
    if ($menubarHdr.is(':visible') && $menubarHdr.hasClass('ham')) {
      $menubarHdr.removeClass('ham');
      $menubar.hide();
      $menubar.find('.ddmenu_parent ul').hide();
      // ハンバーガーが閉じたのでスクロール禁止を解除
      $('body').removeClass('noscroll'); // ★追加
    }
  });

  //-------------------------------------------------
  // 「header nav」など別メニューにドロップダウンだけ適用したい場合
  //-------------------------------------------------
  // 例：header nav へドロップダウンだけ適用（ハンバーガー連動なし）
  //initDropdown($('header nav'), isTouchDevice);
});


//===============================================================
// スムーススクロール（※バージョン2024-1）※通常タイプ
//===============================================================
$(function() {
    // ページ上部へ戻るボタンのセレクター
    var topButton = $('.pagetop');
    // ページトップボタン表示用のクラス名
    var scrollShow = 'pagetop-show';

    // スムーススクロールを実行する関数
    // targetにはスクロール先の要素のセレクターまたは'#'（ページトップ）を指定
    function smoothScroll(target) {
        // スクロール先の位置を計算（ページトップの場合は0、それ以外は要素の位置）
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        // アニメーションでスムーススクロールを実行
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    // ページ内リンクとページトップへ戻るボタンにクリックイベントを設定
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); // デフォルトのアンカー動作をキャンセル
        var id = $(this).attr('href') || '#'; // クリックされた要素のhref属性を取得、なければ'#'
        smoothScroll(id); // スムーススクロールを実行
    });

    // スクロールに応じてページトップボタンの表示/非表示を切り替え
    $(topButton).hide(); // 初期状態ではボタンを隠す
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { // スクロール位置が300pxを超えたら
            $(topButton).fadeIn().addClass(scrollShow); // ボタンを表示
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); // それ以外では非表示
        }
    });

    // ページロード時にURLのハッシュが存在する場合の処理
    if(window.location.hash) {
        // ページの最上部に即時スクロールする
        $('html, body').scrollTop(0);
        // 少し遅延させてからスムーススクロールを実行
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 10);
    }
});


//===============================================================
// 簡易検索ページ
//===============================================================
$(function() {

    // 検索ボックスに入力があった時の処理
    // 'keyup' を 'input' に変更しました
    $('#keyword').on('input', function() {
        
        // 1. 入力された文字を小文字に変換して取得
        var keyword = $(this).val().toLowerCase();
        
        // 2. 検索対象のリスト（.list）をひとつずつチェック
        var hitCount = 0; // ヒットした件数を数える変数
        
        $('.list').each(function() {
            // その項目の data-keyword を取得
            var itemData = $(this).data('keyword');
            
            // キーワードが含まれているか判定
            // (メモ: itemDataがない場合にエラーにならないよう、念のためString変換を入れるのも手ですが、今回は元のままにします)
            if(itemData && itemData.indexOf(keyword) !== -1) {
                $(this).show(); // あれば表示
                hitCount++;     // ヒット件数を+1
            } else {
                $(this).hide(); // なければ非表示
            }
        });
        
        // 3. 一つもヒットしなかった場合、「見つかりません」を出す
        if(hitCount === 0) {
            $('.no-result').show();
        } else {
            $('.no-result').hide();
        }
        
    });

});


//===============================================================
// 詳細ページのサムネイル切り替え（画像/動画 両対応）
//===============================================================
$(function() {

  // サムネvideoの初期設定（コントロール無効化、iOS対策、再生アイコン追加）
  $('.thumbnail video').each(function() {
    var $v = $(this);
    var videoEl = this; // DOM要素そのもの

    // --- 1. iOS対策と属性設定 ---
    $v.attr({
      'preload': 'metadata', // 最初のフレーム情報を読み込む
      'muted': true,         // iOSで制御を受け付けさせるため消音
      'playsinline': true    // インライン再生を許可
    });
    
    videoEl.removeAttribute('controls'); // コントロールバーを消す

    // --- 2. 停止位置の調整 ---
    try {
      videoEl.pause();
      // iOSは0秒だと描画されないことがあるため、0.1秒地点を表示させる
      videoEl.currentTime = 0.1; 
    } catch(e) {}

    // --- 3. 再生アイコンの追加（まだラップされていなければ） ---
    if (!$v.parent().hasClass('thumb-wrap')) {
      $v.wrap('<span class="thumb-wrap is-video"></span>');
      // FA6/FA5両対応クラス
      $v.after('<span class="thumb-play" aria-hidden="true"><i class="fa-solid fa-play fas fa-play"></i></span>');
    }
  });
  
  // サムネ要素（img, video）から、表示用の要素を生成
  function createViewerEl($media) {
    if ($media.is('img')) {
      return $('<img>').attr('src', $media.attr('src'));
    }
    if ($media.is('video')) {
      // <video src> 形式も <video><source></video> 形式も拾う
      var src = $media.attr('src') || $media.find('source:first').attr('src');
      if (!src) return null;
      return $('<video>')
        .attr({ src: src, controls: true, playsinline: true, preload: 'metadata', loop: true });
    }
    return null;
  }

  // 初期表示：直後の .thumbnail の最初の「img か video」を表示
  $('.thumbnail-view').each(function() {
    var $view = $(this);
    var $first = $view.next('.thumbnail').find('img,video').first();
    var $el = createViewerEl($first);

    if ($el) {
      $view.empty().append($el);

      // ▼▼▼ 追加修正：1枚目が動画の場合のiOS対策 ▼▼▼
      // クリック時と同じく、強制的に0.1秒目を表示させて真っ白を防ぐ
      if ($el.is('video')) {
         try {
           $el[0].load(); 
           $el[0].currentTime = 0.1;
         } catch(e) {}
      }
      // ▲▲▲ 追加修正ここまで ▲▲▲
    }
  });

  // サムネイル側クリック（委譲はコンテナに付与）
  $('.thumbnail').on('pointerdown', function(e) {
    // クリック位置から、このコンテナ内の img / video を特定
    var $media = $(e.target).closest('img,video', this);
    if (!$media.length) return;
    e.preventDefault();

    // サムネ video の再生を止めておく（誤再生防止）
    if ($media.is('video') && $media[0].pause) $media[0].pause();

    var $targetView = $(this).prev('.thumbnail-view');
    var $nextEl = createViewerEl($media);
    if (!$nextEl) return;

	// 変更1: hide()(=display:none)だとiOSで描画されないため、透明度0にする
    $nextEl.css('opacity', 0);

    $targetView.find('img,video').fadeOut(400, function() {
      $targetView.empty().append($nextEl);

      // 変更2: 動画の場合、念の為0.1秒目にシークしてiOSに描画を促す
      if ($nextEl.is('video')) {
         try {
           $nextEl[0].load(); // 念の為ロード
           $nextEl[0].currentTime = 0.1;
         } catch(e) {}
      }

      // 変更3: fadeIn()ではなく、opacityを1にするアニメーションにする
      $nextEl.animate({ opacity: 1 }, 400);
    });
  });
});
