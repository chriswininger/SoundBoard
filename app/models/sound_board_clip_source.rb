class SoundBoardClipSource < ActiveRecord::Base
	belongs_to :clip

	validates :path_local, :presence => true
	validates :url, :presence => true
	validates :media_type, :presence => true
end
