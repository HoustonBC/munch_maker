class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :image_url, null: false
      t.string :price, null: false
      t.string :rating, null: false
      t.string :display_phone, null: false
      t.string :categories, null: false, array: true
      t.string :location, null: false
      t.timestamps
    end
  end
end
