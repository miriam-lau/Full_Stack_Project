class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method: current_user, signed_in?

  private
  def current_user(user)
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def signed_in?
    !!current_user
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end

  #do i need this one?
  # def require_signed_in!
  #
  # end
end
