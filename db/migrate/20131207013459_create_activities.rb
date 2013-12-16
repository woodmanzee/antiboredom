class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :userid
      t.string :activityid
      t.string :title
      t.boolean :private
      t.string :location
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
