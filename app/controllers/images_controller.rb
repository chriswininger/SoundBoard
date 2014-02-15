class ImagesController < ApplicationController
  #before_filter :authenticate_user!
	def upload
    	puts params.inspect
    	uploaded_io = params[:picture]
    	File.open(Rails.root.join('public', 'uploads', 'images', uploaded_io.original_filename), 'wb') do |file|
      		file.write(uploaded_io.read)
      	end
    end
end
