json.array!(@activities) do |activity|
  json.extract! activity, :id, :userid, :activityid, :title, :private, :location, :start, :end
  json.url activity_url(activity, format: :json)
end
