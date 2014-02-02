class CreateSoundBoardClipSources < ActiveRecord::Migration
  def change
    create_table :sound_board_clip_sources do |t|
    	t.integer	:clip_id, :null => false 
    	t.string	:path_local, :null => false
    	t.string	:url, :null => false
    	t.string	:media_type, :null => false
      t.timestamps
    end
  end
end
