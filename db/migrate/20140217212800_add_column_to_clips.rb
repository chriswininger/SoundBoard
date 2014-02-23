class AddColumnToClips < ActiveRecord::Migration
  def change
    add_column :clips, :image_playing_id, :int
  end
end
