json.array!(@friends) do |friend|
  json.extract! friend, :id, :userid, :friendid
end
