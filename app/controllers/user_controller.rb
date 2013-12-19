class UserController < ApplicationController
	# GET /user/1
	# GET /user/1.json
	def show
		id = params[:id]
		if params[:id].to_s == "cur"
			id = current_user.id
		end
		@user = User.find(id)
	end

end