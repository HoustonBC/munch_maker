class CreateMatches < ActiveRecord::Migration[5.1]
  def change
    create_table :matches do |t|
      t.string :name, null: false
      t.belongs_to :restaurant
      t.belongs_to :user
      t.timestamps
    end
  end
end
