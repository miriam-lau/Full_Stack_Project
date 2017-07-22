class Grocery < ApplicationRecord
  validates :name, :quantity, :user, presence: true
  
  belongs_to :user
end
