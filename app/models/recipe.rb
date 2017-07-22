class Recipe < ApplicationRecord
  validates :name, :user, presence: true
  
  belongs_to :user
end
