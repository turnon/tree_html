var TreeHtmlGroup = (function () {
  var tree = document.querySelector('ul')
  var group_id = 0
  var tree_id_prefix = 0

  function group_by_key(ul, key_func) {
    var last_key = null
    var lis_groups = []

    function last_group() {
      return lis_groups[lis_groups.length - 1]
    }

    var children_count = ul.children.length
    for (var i = 0; i < children_count; i++) {
      var li = ul.children[i]
      callee_path = key_func(li)
      if (last_key !== callee_path) {
        last_key = callee_path
        lis_groups.push([])
      }
      last_group().push(li)
    }

    if (lis_groups.length == 1 && key_func(lis_groups[0][0]) == key_func(ul.parentElement)) {
      return
    }

    lis_groups.forEach(function (group) {
      var key = key_func(group[0])
      wrap_into_group(group, key)
    })
  }

  function wrap_into_group(lis, key) {
    var id = 'g' + group_id++
    var html = '<li>' +
      '<input type="checkbox" id="' + id + '">' +
      '<label for="' + id + '"></label>' +
      '<a>' + key + '</a>' +
      '<ul></ul>' +
      '</li>'

    lis[0].insertAdjacentHTML('beforebegin', html)
    var ul = document.querySelector('#' + id + ' ~ ul')
    lis.forEach(function (li) {
      ul.insertAdjacentElement('beforeend', li)
    })
  }

  function switch_tree(name) {
    var id = name === '' ? name : name_to_id(name)
    document.querySelectorAll('.tree-html').forEach(function (tree) {
      if (tree.id !== id) {
        tree.style = 'display:none'
      } else {
        tree.style = ''
      }
    })
  }

  function name_to_id(name) {
    return 'tree-html-group-' + name
  }

  return function (opt) {
    var id = name_to_id(opt['name'])
    if (document.getElementById(id)) {
      return switch_tree
    }

    var id_pattern = '$1p-' + tree_id_prefix++ + '$2$3'
    var li_ids_changed = tree.innerHTML
      .replace(/(<input type="checkbox" id=")(.+?)(">)/, id_pattern)
      .replace(/(<label for=")(.+?)(">)/, id_pattern)

    tree.insertAdjacentHTML('beforebegin', '<ul id="' + id + '" class="tree-html" style="display:none">' + li_ids_changed + '</ul>')

    var uls = document.querySelectorAll('#' + id + ',#' + id + ' ul')
    var key_func = opt['key']
    for (var i = uls.length - 1; i > 0; i--) {
      var ul = uls[i]
      group_by_key(ul, key_func)
    }

    return switch_tree
  }
})();
