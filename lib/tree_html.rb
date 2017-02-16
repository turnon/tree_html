require "tree_html/version"

module TreeHtml
  def tree_html
    "<ul class='tree-html'>#{li}</ul>"
  end

  def tree_html_full
    "<!DOCTYPE HTML><html><head><meta charset='utf-8'/><style>#{css + css_for_tree_html}</style></head><body>#{tree_html}</body></html>"
  end

  Css = File.expand_path('../tree_html/tree_html.css', __FILE__)

  def css
    File.read(Css)
  end

  protected

  def li
    "<li>#{checkbox}<a>#{label_for_tree_html}</a>#{sub_ul}</li>"
  end

  def checkbox
    children_for_tree_html.empty? ? "<label class='placeholder'></label>" : "<input type='checkbox' id='#{object_id}'><label for='#{object_id}'></label>"
  end

  def sub_ul
    children_for_tree_html.empty? ? '' : "<ul>#{children_for_tree_html.map{|c| c.li}.join}</ul>"
  end

  def css_for_tree_html
    ''
  end
end
