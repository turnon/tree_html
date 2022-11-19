# TreeHtml

Generate plain css tree structure.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'tree_html'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install tree_html

## Usage

In Node class, `include TreeHtml`.

Then implement `label_for_tree_html` and `children_for_tree_html` for Branch class, and `label_for_tree_html` for Leaf class.

Finally, call `tree_html` on node object to get ul/li fragment, or `tree_html_full` to get a html file with pre-defined style.

By Default, any object can be leaf, and renders as `to_s`.

You may overwrite `data_for_tree_html`, `head_js_for_tree_html`, `body_js_for_tree_html`, `css_for_tree_html` to specify your own style.

In generated html, hover a branch and

- press `f`/`u` to fold/unfold it's children
- press `p`/`n` to jump to it's previous/next sibling branch
- press `a` to print ascii tree in console

You may change these function keys in `body_js_for_tree_html`.

Or checkout [test/tree_html_test.rb](https://github.com/turnon/tree_html/blob/master/test/tree_html_test.rb) to see how to use.

## Extending

You may register more handlers for responsing key press. For example, to do something when hovering on any `li` and pressing `r`

```javascript
TreeHtml.hover_press('r', function(li){
  // actions
})
```

You may also group `li`s with same key under additional `ul`:

```javascript
var switch = TreeHtmlGroup({
  name: 'by_whatever_key',
  key: function get_path(li) {
    var p = li.querySelector('a').innerText.replace(/* key calculation here */)
    return '<b>' + p + '</b>'
  }
})

switch('by_whatever_key')
switch('') // switch back
```
