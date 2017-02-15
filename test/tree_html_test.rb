require 'test_helper'
require 'tmpdir'

class TreeHtmlTest < Minitest::Test
  class TestNode

    include TreeHtml

    def label_for_tree_html
      "#{@word.upcase} (#{@word})"
    end

    def children_for_tree_html
      sub_nodes
    end

    def initialize word
      @word = word
    end

    def << child
      sub_nodes << child
    end

    def sub_nodes
      @sub_nodes ||= []
    end

  end

  def setup
    %w{a b c d e f g h i j}.each do |w|
      instance_variable_set "@#{w}", TestNode.new(w)
    end
    @a << @b << @c << @e
    @c << @g << @d << @f
    @d << @h
    @h << @i << @j
  end

  def test_that_it_has_a_version_number
    refute_nil ::TreeHtml::VERSION
  end

  TmpFile = File.join Dir.tmpdir, 'tree_html_test.html'

  def test_it_does_something_useful
    File.open(TmpFile, 'w') do |f|
      f.puts @a.tree_html_full
    end
  end
end
