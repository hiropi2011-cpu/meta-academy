// METAアカデミー 公式HP試作：ヘッダーの切り替え・スマホメニュー・ふわっと表示
(function () {
	var header = document.getElementById('siteHeader');
	var menuBtn = document.getElementById('menuBtn');
	var menu = document.getElementById('mobileMenu');
	var toTop = document.getElementById('toTop');

	function onScroll() {
		var y = window.scrollY || document.documentElement.scrollTop;
		if (header) header.classList.toggle('scrolled', y > 40);
		if (toTop) toTop.classList.toggle('show', y > 600);
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	function closeMenu() {
		if (!menu) return;
		menu.classList.remove('open');
		menu.setAttribute('aria-hidden', 'true');
		menuBtn.classList.remove('open');
		menuBtn.setAttribute('aria-expanded', 'false');
		document.body.classList.remove('menu-open');
	}
	if (menuBtn && menu) {
		menuBtn.addEventListener('click', function () {
			var open = !menu.classList.contains('open');
			menu.classList.toggle('open', open);
			menu.setAttribute('aria-hidden', open ? 'false' : 'true');
			menuBtn.classList.toggle('open', open);
			menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
			document.body.classList.toggle('menu-open', open);
		});
		menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
	}

	// ヒーローの動画：再生できたら写真から動画へ切り替える（再生できない環境は写真のまま）
	var heroVideo = document.getElementById('heroVideo');
	var heroBg = heroVideo && heroVideo.parentNode;
	var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (heroVideo && heroBg && !reduce) {
		var showVideo = function () { heroBg.classList.add('video-on'); };
		heroVideo.addEventListener('playing', showVideo, { once: true });
		var p = heroVideo.play();
		if (p && p.catch) { p.catch(function () { /* 自動再生が拒否されたら写真のまま */ }); }
	}

	// ヒーローの文字とボタン：再生直後（約1秒後）から左右に順に中央へ。最初の1回だけ
	var hero = document.getElementById('hero');
	if (hero) {
		var startHero = function () { hero.classList.add('ready'); };
		if (reduce) { startHero(); }
		else { window.setTimeout(startHero, 1000); }
	}

	// 画面に入ったら、ふわっと表示
	var targets = document.querySelectorAll('.sec-head, .feature, .support-item, .flow-steps li, .course, .split, .student-card, .club, .contact-card');
	targets.forEach(function (el) { el.classList.add('reveal'); });
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
			});
		}, { threshold: 0.12 });
		targets.forEach(function (el) { io.observe(el); });
	} else {
		targets.forEach(function (el) { el.classList.add('in'); });
	}
})();
