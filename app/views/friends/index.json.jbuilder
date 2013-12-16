json.array!(@friends) do |friend|
  json.extract! friend, :id, :userid, :friendid, :block
  json.url friend_url(friend, format: :json)
end
