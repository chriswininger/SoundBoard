class AddImageDefaultIdToClips < ActiveRecord::Migration
  def change
    add_column :clips, :image_default_id, :int
  end
end
