// Shared waitlist form handler for Fewer Better Dates
// Wire any <form data-waitlist-form> to POST /api/waitlist as JSON.
(function () {
  var params = new URLSearchParams(window.location.search);

  document.querySelectorAll('[data-utm]').forEach(function (el) {
    var v = params.get(el.getAttribute('data-utm'));
    if (v) el.value = v;
  });

  document.querySelectorAll('form[data-waitlist-form]').forEach(function (form) {
    var confirmEl = document.getElementById(form.getAttribute('data-confirm-target') || 'confirm');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {};
      new FormData(form).forEach(function (value, key) {
        if (key === 'frustration') {
          data.frustration = data.frustration || [];
          data.frustration.push(value);
        } else {
          data[key] = value;
        }
      });

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
        .then(function () {
          form.classList.add('hide');
          if (confirmEl) confirmEl.classList.add('show');
        })
        .catch(function () {
          if (submitBtn) submitBtn.disabled = false;
          alert("Something went wrong. Please try again in a moment.");
        });
    });
  });
})();
