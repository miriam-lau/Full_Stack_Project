class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],
      params[:user][:password])

    if @user
      sign_in(@user)
      render "api/users/show"
    else
      render(json: ["Invalid Credentials"], status: 401)
    end
  end

  def destroy
    @user = current_user
    if @user
      sign_out
      #should it render to index?
      render "api/users/show"
    else
      render(json: ["Not Signed In"], status: 404)
    end
  end
end
