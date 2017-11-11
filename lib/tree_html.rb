require "tree_html/version"

module TreeHtml

  NO_DATA_IN_A = {}.freeze
  NO_CHECKBOX = "<label class='placeholder'></label>".freeze
  BLANK = ''.freeze

  def tree_html
    "<ul class='tree-html'>#{li_for_tree_html}</ul>"
  end

  def tree_html_full
    "<!DOCTYPE HTML><html>"\
      "<head><meta charset='utf-8'/><style>#{main_css_for_tree_html + css_for_tree_html}</style></head>"\
      "<body>#{tree_html}</body>"\
    "</html>"
  end

  Css = File.expand_path('../tree_html/tree_html.css', __FILE__)

  def main_css_for_tree_html
    File.read(Css)
  end

  protected

  def li_for_tree_html
    "<li>#{checkbox_for_tree_html}<a #{data_in_a_for_tree_html}>#{label_for_tree_html}</a>#{sub_ul_for_tree_html}</li>"
  end

  def data_in_a_for_tree_html
    data_for_tree_html.map{ |k, v| "data-#{k}='#{v}'" }.join(" ")
  end

  def data_for_tree_html
    NO_DATA_IN_A
  end

  def checkbox_for_tree_html
    if children_for_tree_html.empty?
      NO_CHECKBOX
    else
      "<input type='checkbox' id='#{object_id}'><label for='#{object_id}'></label>"
    end
  end

  def sub_ul_for_tree_html
    if children_for_tree_html.empty?
      BLANK
    else
      "<ul>#{children_for_tree_html.map{|c| c.li_for_tree_html}.join}</ul>"
    end
  end

  def css_for_tree_html
    BLANK
  end
end
