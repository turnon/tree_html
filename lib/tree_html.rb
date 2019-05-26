require "tree_html/version"

module TreeHtml

  NO_DATA_IN_A = {}.freeze
  NO_CHECKBOX = "<label class='placeholder'></label>".freeze
  BLANK = ''.freeze
  NO_CUSTOM_JS = [].freeze
  Css = File.read File.expand_path('../tree_html/tree_html.css', __FILE__)
  Js = Dir.glob("#{File.expand_path(__dir__)}/tree_html/*.js").map{|f| File.read f }.join(';')

  def tree_html
    "<ul class='tree-html'>#{li_for_tree_html}</ul>"
  end

  def tree_html_full
    "<!DOCTYPE HTML><html>"\
      "<head>"\
        "<meta charset='utf-8'/>"\
        "<style>#{Css + css_for_tree_html}</style>"\
        "#{custom_js head_js_for_tree_html}"\
      "</head>"\
      "<body>"\
        "#{tree_html}"\
        "<script>#{Js}</script>"\
        "#{custom_js body_js_for_tree_html}"\
      "</body>"\
    "</html>"
  end

  protected

  def li_for_tree_html
    "<li>#{checkbox}<a #{data_in_a}>#{label_for_tree_html}</a>#{sub_ul}</li>"
  end

  def data_for_tree_html
    NO_DATA_IN_A
  end

  def css_for_tree_html
    BLANK
  end

  def head_js_for_tree_html
    NO_CUSTOM_JS
  end

  def body_js_for_tree_html
    NO_CUSTOM_JS
  end

  private

  def sub_ul
    if children_for_tree_html.empty?
      BLANK
    else
      "<ul>#{children_for_tree_html.map{|c| c.li_for_tree_html}.join}</ul>"
    end
  end

  def checkbox
    if children_for_tree_html.empty?
      NO_CHECKBOX
    else
      "<input type='checkbox' id='#{object_id}'><label for='#{object_id}'></label>"
    end
  end

  def data_in_a
    data_for_tree_html.map{ |k, v| "data-#{k}='#{v}'" }.join(" ")
  end

  def custom_js scripts
    scripts.map do |s|
      src = s[:src] ? "src='#{s[:src]}'" : BLANK
      "<script #{src}>#{s[:text]}</script>"
    end.join
  end
end
