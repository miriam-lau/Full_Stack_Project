@lists.each do |list|
  json.partial! 'list', list: list
end
