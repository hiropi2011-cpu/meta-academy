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
