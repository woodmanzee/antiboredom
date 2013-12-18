class UserController < ApplicationController
	# GET /user/1
	# GET /user/1.json
	def show
		id = params[:id]
		@user = User.find(id)
	end
end