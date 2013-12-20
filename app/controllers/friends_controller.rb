class FriendsController < ApplicationController
  before_action :set_friend, only: [:show, :edit, :update, :destroy]

  # GET /friends
  # GET /friends.json
  def index
    @friends = Friend.all
  end

  # GET /friends/1
  # GET /friends/1.json
  def show
	  @user_id = params[:id].to_s
	  @friends = Friend.select("id, userid, friendid").where("userid = ?", @user_id)
  end

  # GET /friends/new
  def new
    @friend = Friend.new
  end

  # GET /friends/1/edit
  def edit
  end

  # POST /friends
  # POST /friends.json
  def create
    @userid = User.select("id").where("id = ?", params[:userid])

    # make sure that user exists
    puts "INCOMING EMAIL: #{friend_params[:email]}, INCOMING ID: #{@userid}, OTHER: #{params[:email]}"
    @friendid = User.select("id").where("email = ?", params[:email])
    puts "FRIEND OBJ: #{@friendid}"
    if @friendid.nil? || @friendid.empty?
      respond_to do |format|
        format.json { render json: "A user with that email does not exist", status: :unprocessable_entity }
      end
    else

      @check1 = Friend.select("userid, friendid").where("userid = ? AND friendid = ?", @userid.first.id, @friendid.first.id)
      @check2 = Friend.select("userid, friendid").where("userid = ? AND friendid = ?", @friendid.first.id, @userid.first.id)
      if (@check2.nil? || @check1.empty?) && (@check2.nil? || @check2.empty?)
        @friend = Friend.new(:userid => @userid.first.id, :friendid => @friendid.first.id)

        respond_to do |format|
          if @friend.save
            format.html { redirect_to @friend, notice: 'Friend was successfully created.' }
            format.json { render action: 'show', status: :created, location: @friend }
          else
            format.html { render action: 'new' }
            format.json { render json: @friend.errors, status: :unprocessable_entity }
          end
        end
      else
        respond_to do |format|
          format.json { render json: @lower, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /friends/1
  # PATCH/PUT /friends/1.json
  def update
    respond_to do |format|
      if @friend.update(friend_params)
        format.html { redirect_to @friend, notice: 'Friend was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @friend.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /friends/1
  # DELETE /friends/1.json
  def destroy
    @friend.destroy
    respond_to do |format|
      format.html { redirect_to friends_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def friend_params
      params.require(:friend).permit(:userid, :friendid, :block)
    end
end
