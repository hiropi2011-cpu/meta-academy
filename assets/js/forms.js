// METAアカデミー 公式HP：お問い合わせフォームの送信（Formspree）
(function () {
	var form = document.getElementById('contactForm');
	if (!form) return;
	var msg = document.getElementById('formMsg');
	var btn = form.querySelector('button[type=submit]');
	var say = function (text, kind) { if (!msg) return; msg.textContent = text; msg.className = 'form-msg ' + (kind || ''); };

	// URLの ?type=consult などで、ご希望の内容をあらかじめチェック
	var type = new URLSearchParams(location.search).get('type');
	if (type) { var pre = form.querySelector('[data-type="' + type + '"]'); if (pre) pre.checked = true; }

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		say('', '');
		if (!form.checkValidity()) { form.reportValidity(); return; }
		var checks = form.querySelectorAll('input[name="request[]"]');
		if (checks.length && !form.querySelector('input[name="request[]"]:checked')) { say('ご希望の内容を1つ以上お選びください。', 'err'); checks[0].focus(); return; }
		if (/TODO_/.test(form.action)) { say('送信先（フォームのID）がまだ設定されていないため、送信できません。設定後にご利用いただけます。', 'err'); return; }

		btn.disabled = true; btn.classList.add('sending'); say('送信しています…', '');
		fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
			.then(function (r) {
				if (r.ok) { location.href = form.getAttribute('data-thanks') || 'thanks.html'; return; }
				return r.json().then(function (d) { throw new Error((d && d.errors && d.errors.map(function (x) { return x.message; }).join(' / ')) || 'error'); });
			})
			.catch(function () {
				btn.disabled = false; btn.classList.remove('sending');
				say('送信できませんでした。お手数ですが、時間をおいて再度お試しいただくか、info@meta-academy.co.jp へ直接ご連絡ください。', 'err');
			});
	});
})();
