class SoundBoardClipSource < ActiveRecord::Base
	belongs_to :clip

	validates :clip_id, :presence => true
	validates :path_local, :presence => true
	validates :url, :presence => true
	validates :media_type, :presence => true
end
