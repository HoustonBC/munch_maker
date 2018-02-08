class Restaurant < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :image_url, presence: true
  validates :price, presence: true
  validates :rating, presence: true
  validates :display_phone, presence: true
  validates :categories, presence: true
  validates :location, presence: true
  has_many :matches
  has_many :users, through: :matches
end
