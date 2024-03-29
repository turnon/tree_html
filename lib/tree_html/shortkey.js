var TreeHtml = (function(){
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

  function check_if_not(li, tf) {
    var checkbox = li.children[0];
    (checkbox.nodeName === 'INPUT') &&
      (checkbox.checked === tf || (checkbox.checked = tf));
  }

  function check_all(lis, tf) {
    for(var i = 0; i < lis.length; i++) {
      check_if_not(lis[i], tf);
    }
  }

  function check_children(node, tf) {
    var ul, lis;
    (ul = node.querySelector('ul')) &&
      (lis = ul.children) &&
      check_all(lis, tf);
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

  function go(start, end, duration, interval, fun) {
    (function _go(from, step, to){
      setTimeout(function(){
        fun(from);
        if(from === to) return;
        next_target = from + step;
        if ((step < 0) ? (next_target < to) : (next_target > to)){ return _go(to, step, to); }
        _go(from + step, step, to);
      }, interval);
    })(start, (end-start)/(duration/interval), end);
  }

  function jump_and_twinkle(li) {
    if(!li) return;
    var to = li.documentOffsetTop() - (window.innerHeight / 2);
    if(Math.abs(to - window.scrollY) < (window.innerHeight * 5)){
      window.scroll({
        top: to,
        left: 0,
        behavior: 'smooth'
      });
    }else{
      go(window.scrollY, to, 200, 20, function(y){window.scroll(0, y)});
    }
    twinkle(li.querySelector('a'), 6);
  }


  function ascii(li) {
    let lines = []
    function add_line(prefix, text) {
      if (lines.length) lines.push('\n')
      prefix = replace_branchs(prefix)
      lines = lines.concat(prefix)
      lines.push(' ')
      lines.push(text)
    }

    function replace_branchs(array){
      if (array.length === 0) return [];
      let arr = array.map(ele => { return (ele === ' ├─' || ele === ' │ ') && ' │ ' || '   ' })
      arr[array.length - 1] = array[array.length - 1]
      return arr
    }

    function walk(li, prefix) {
      let a = li.querySelector('a')
      let checkbox = a.previousSibling.previousSibling
      let fold = checkbox && (checkbox.checked && '+' || '-') || ' '
      let text = a.innerText
      add_line(prefix, fold + ' ' + text)

      if (!checkbox || checkbox.checked) return
      let ul = li.querySelector('ul')
      if (ul === null) return
      let i = 1
      ul.childNodes.forEach(child => {
          let branch = ul.childNodes.length === i ? ' └─' : ' ├─'
          prefix.push(branch)
          walk(child, prefix)
          prefix.pop()
          i = i + 1
      })
    }

    walk(li, [])
    console.log(lines.join(''))
  }

  var actions = {
    ascii: ascii,
    fold: function(node) {
      check_children(node, true);
    },
    unfold: function(node) {
      check_children(node, false);
    },
    prev: function(node) {
      twinkle(node.querySelector('a'), 6);
      jump_and_twinkle(node.previousSibling);
    },
    next: function(node) {
      twinkle(node.querySelector('a'), 6);
      jump_and_twinkle(node.nextSibling);
    }
  };

  var key_cmds = {f: 'fold', u: 'unfold', p: 'prev', n: 'next', a: 'ascii'};

  var resp_keypress = [function(e) {
    e = e || window.event;
    (cmd = match_key(e)) &&
      (action = actions[cmd]) &&
      (node = hovering()) &&
      action(node);
  }];

  document.onkeypress = function(e) {
    for(var i = 0; i < resp_keypress.length; i++) {
      resp_keypress[i](e);
    }
  };

  return {
    debug: function() {
      debugger;
    },
    more_onkeypress: function(f) {
      resp_keypress.push(f);
    },
    hover_press: function(key, fun) {
      var conn = Math.random().toString();
      key_cmds[key] = conn;
      actions[conn] = fun;
    },
    no_hover_press: function(key) {
      delete actions[key_cmds[key]];
      delete key_cmds[key];
    },
    sub_hover_press: function(old, neo) {
      key_cmds[neo] = key_cmds[old];
      delete key_cmds[old];
    },
  };
})();
