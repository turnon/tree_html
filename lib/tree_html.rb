require "tree_html/version"

module TreeHtml
  def tree_html
    "<ul class='tree'>#{li}</ul>"
  end

  def tree_html_full
    "<!DOCTYPE HTML><html><head><meta charset='utf-8'/><style>#{css}</style></head><body>#{tree_html}</body></html>"
  end

  Css = File.expand_path('../tree_html/tree_html.css', __FILE__)

  def css
    File.read Css
  end

  protected

  def li
    "<li>#{checkbox}<a>#{label_for_tree_html}</a>#{sub_ul}</li>"
  end

  def checkbox
    children_for_tree_html.empty? ? '' : "<input type='checkbox'>"
  end

  def sub_ul
    children_for_tree_html.empty? ? '' : "<ul>#{children_for_tree_html.map{|c| c.li}.join}</ul>"
  end
end
