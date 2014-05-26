class AllowNullClipIdOnSoundSource < ActiveRecord::Migration
	def change
  		change_column :sound_board_clip_sources, :clip_id, :integer, :null => true
	end
end
