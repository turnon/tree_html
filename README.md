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

In Node class, `include TreeHtml`, then implement `label_for_tree_graph` and `children_for_tree_graph`, then call`tree_html` on node object to get ul/li fragment, or `tree_html_full` to get a html file with pre-defined style.

Or checkout [test/tree_html_test.rb](https://github.com/turnon/tree_html/blob/master/test/tree_html_test.rb) to see how to use.

