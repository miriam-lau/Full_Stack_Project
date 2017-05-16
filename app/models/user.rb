class User < ApplicationRecord
  validates :username, :email, :password_digest, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  attr_reader :password
  after_intialization :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?

  end

  def self.find_by_credentials

  end


  private

  def ensure_session_token

  end

  def reset_token!

  end
end
