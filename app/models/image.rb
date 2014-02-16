class Image < ActiveRecord::Base
  validates :title, :presence => true
  validates :path, :presence => true
  validates :url, :presence => true
end
