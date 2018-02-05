class Match < ApplicationRecord
  validates :name, presence: true
  belongs_to :restaurant
  belongs_to :user
end
