class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.string :userid
      t.string :activityid
      t.boolean :attending

      t.timestamps
    end
  end
end
