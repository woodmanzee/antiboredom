class UserController < ApplicationController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }
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

