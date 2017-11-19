var key_cmds = {f: 'fold', p: 'prev', n: 'next'};
(function(){
  var cmd, node, action;
  var id = 0;

  function hovering() {
    var hover = document.querySelector('a:hover');
    return hover && hover.parentNode;
  }

  function match_key(e) {
    var char_code = (typeof e.which == "number") ? e.which : e.keyCode;
    return char_code > 0 && key_cmds[String.fromCharCode(char_code)];
  }

  function check_if_not(li) {
    var checkbox = li.children[0];
    (checkbox.nodeName === 'INPUT') &&
      (checkbox.checked || (checkbox.checked = true));
  }

  function check_all(lis) {
    for(var i = 0; i < lis.length; i++) {
      check_if_not(lis[i]);
    }
  }

  function id_of(li) {
    return li.id || (li.id = 'i' + id++);
  }

  function twinkle(a, num) {
    a.className = 'twinkle';
    setTimeout(function(){_twinkle(a, num);}, 200);
  }

  function _twinkle(a, num) {
    a.className = '';
    (num > 0) && setTimeout(function(){twinkle(a, num - 1);}, 200);
  }

  Element.prototype.documentOffsetTop = function () {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
  };

  function smooth_scroll(to, ms) {
    to = (to < 0 ? 0 : to);
    var per = 20,
        distance = to - window.scrollY,
        t = ms / per,
        step = Math[(distance < 0 ? 'ceil' : 'floor')](distance / t),
        last_step = (distance % t);
    (function scroll() {
      if(window.scrollY === to ||
          (window.scrollY + window.innerHeight == document.documentElement.scrollHeight)) {
        return;
      }else if(window.scrollY + last_step === to) {
        window.scrollTo(0, window.scrollY + last_step);
      }else {
        window.scrollTo(0, window.scrollY + step);
        setTimeout(scroll, per);
      }
    })();
  }

  function jump_and_twinkle(li) {
    if(!li) return;
    smooth_scroll((li.documentOffsetTop() - (window.innerHeight / 2)), 200);
    twinkle(li.querySelector('a'), 3);
  }

  var actions = {
    fold: function(node) {
      var ul, lis;
      (ul = node.querySelector('ul')) &&
        (lis = ul.children) &&
        check_all(lis);
    },
    prev: function(node) {
      twinkle(node.querySelector('a'), 3);
      jump_and_twinkle(node.previousSibling);
    },
    next: function(node) {
      twinkle(node.querySelector('a'), 3);
      jump_and_twinkle(node.nextSibling);
    }
  };

  document.onkeypress = function(e) {
    e = e || window.event;
    (cmd = match_key(e)) &&
      (action = actions[cmd]) &&
      (node = hovering()) &&
      action(node);
  };
})();
