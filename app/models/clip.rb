class Clip < ActiveRecord::Base
	has_many :sound_board_clip_sources
	belongs_to :image_playing,
		:class_name => :Image,
		:foreign_key => :image_playing_id

	belongs_to :image_default,
		:class_name => :Image,
		:foreign_key => :image_default_id

	validates :title, :presence => true
	validates :default_image, :presence => true
	validates :playing_image, :presence => true
	validates :image_playing_id, :presence => true
	validates :image_default_id, :presence => true
end
