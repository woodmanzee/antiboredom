class AddIdToFriends < ActiveRecord::Migration
  def change
    drop_table :friends
    create_table :friends do |t|
      t.integer :friendid
      t.integer :userid
      t.boolean :block
    end
  end
end
