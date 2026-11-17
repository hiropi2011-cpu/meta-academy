// メタバース総合案内のバナー（2026-11-17）
// 押すと Threedive AI（株式会社メタバーズ）の案内の窓を開く。
// 窓のプログラム（embed-popup.js）が読み込めなかったときは、ふつうのリンクとして新しいタブで開く。
// 「アバターの変え方」のヘルプ（開閉は HTML の details だけ）は、窓が閉じているときはバナーの上、
// 窓が開いている間は窓の横（PC）か窓の上（スマホ）に移す（2026-11-17 石島さんの相談）。
(function () {
	var banner = document.getElementById('mvBanner');
	if (!banner) return;
	var body = document.body;
	var root = document.documentElement;
	body.classList.add('has-mv'); // 「ページの先頭へ」ボタンとフッターをバナーの分だけずらす

	var LAUNCHER = '.td-popup-MBZiptXsT0-launcher';
	var SHELL = '.td-popup-MBZiptXsT0-shell';

	var main = banner.querySelector('.mv-main');
	main.addEventListener('click', function (e) {
		var launcher = document.querySelector(LAUNCHER);
		if (!launcher) return; // 読み込めていない → 新しいタブで開く
		e.preventDefault();
		launcher.click(); // 案内の窓を開く（もう一度押すと閉じる）
	});

	var help = document.getElementById('mvHelp');
	if (!help) return;

	function place() {
		var shell = document.querySelector(SHELL);
		var open = !!shell && getComputedStyle(shell).display !== 'none';
		body.classList.toggle('mv-open', open);
		help.classList.remove('is-side', 'is-above');
		help.style.top = help.style.bottom = help.style.right = help.style.width = help.style.maxHeight = '';
		if (!open) { // 窓が閉じている → バナーのすぐ上（位置は CSS。バナーの高さだけ渡す）
			root.style.setProperty('--mv-bh', banner.offsetHeight + 'px');
			return;
		}
		var r = shell.getBoundingClientRect();
		var vw = root.clientWidth;
		var vh = window.innerHeight;
		var room = r.left - 24; // 窓の左の空き
		if (room >= 260) { // PC：窓の左横に、窓の上端そろえで
			var top = Math.max(12, r.top);
			help.classList.add('is-side');
			help.style.top = top + 'px';
			help.style.right = (vw - r.left + 12) + 'px';
			help.style.width = Math.min(320, room) + 'px';
			help.style.maxHeight = (vh - top - 12) + 'px';
		} else { // スマホ：窓のすぐ上
			help.classList.add('is-above');
			help.style.bottom = (vh - r.top + 8) + 'px';
			help.style.maxHeight = Math.max(60, r.top - 16) + 'px';
		}
	}

	// 窓の開け閉め（Threedive のボタンの aria-expanded が変わる。× や Esc で閉じたときも）を見張る
	function watch() {
		var launcher = document.querySelector(LAUNCHER);
		if (!launcher) return false;
		new MutationObserver(place).observe(launcher, { attributes: true, attributeFilter: ['aria-expanded'] });
		return true;
	}
	if (!watch()) {
		var tries = 0;
		var timer = setInterval(function () { if (watch() || ++tries > 40) clearInterval(timer); }, 250);
	}
	window.addEventListener('resize', place);
	window.addEventListener('load', place); // 文字の読み込みでバナーの高さが変わるので測り直す
	place();
})();
