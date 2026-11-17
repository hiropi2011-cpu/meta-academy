// メタバース総合案内のバナー（2026-11-17）
// 押すと Threedive AI（株式会社メタバーズ）の案内の窓を開く。
// 窓のプログラム（embed-popup.js）が読み込めなかったときは、ふつうのリンクとして新しいタブで開く。
(function () {
	var banner = document.getElementById('mvBanner');
	if (!banner) return;
	document.body.classList.add('has-mv'); // 「ページの先頭へ」ボタンとフッターをバナーの分だけ上へ

	var main = banner.querySelector('.mv-main');
	main.addEventListener('click', function (e) {
		var launcher = document.querySelector('.td-popup-MBZiptXsT0-launcher');
		if (!launcher) return; // 読み込めていない → 新しいタブで開く
		e.preventDefault();
		launcher.click(); // 案内の窓を開く（もう一度押すと閉じる）
	});
})();
