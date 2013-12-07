json.array!(@invites) do |invite|
  json.extract! invite, :id, :userid, :activityid, :attending
  json.url invite_url(invite, format: :json)
end
