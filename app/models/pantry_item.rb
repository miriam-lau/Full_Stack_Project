class PantryItem < ApplicationRecord
  validates :name, :quantity, :unit, :user, presence: true

  belongs_to :user
end
