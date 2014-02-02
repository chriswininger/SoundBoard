class Clip < ActiveRecord::Base
	has_many :sound_board_clip_sources

	validates :title, :presence => true
	validates :default_image, :presence => true
	validates :playing_image, :presence => true
end
