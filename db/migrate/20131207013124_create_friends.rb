class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.string :userid
      t.string :friendid
      t.boolean :block

      t.timestamps
    end
  end
end
