class CreateClips < ActiveRecord::Migration
  def change
    create_table :clips do |t|
      t.string :title, :null => false 
      t.string :default_image, :null => false 
      t.string :playing_image, :null => false 
      t.string :info

      t.timestamps
    end
  end
end
