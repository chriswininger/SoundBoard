class ImagesController < ApplicationController
  #before_filter :authenticate_user!
	def upload
		uploaded_io = image_params[:file]
		filePath = Rails.root.join('public', 'uploads', 'images', uploaded_io.original_filename)
		puts filePath
		File.open(filePath, 'wb') do |file|
	  		file.write(uploaded_io.read)
	  	end

	  	

		@image = Image.new({
			:title => image_params[:title],
			:path => filePath.to_s,
			:url =>  request.protocol + request.host_with_port + '/uploads/images/' + uploaded_io.original_filename
		})

		respond_to do |format|
			if @image.save
	        	format.json { render action: 'show', status: :created, location: @image }
	        	format.xml { render action: 'show', status: :created, location: @image }
	     	else
	        	format.json { render json: @image.errors, status: :unprocessable_entity }
	        	format.xml { render json: @image.errors, status: :unprocessable_entity }
	      	end	
      	end
	end

	private
		# Never trust parameters from the scary internet, only allow the white list through.
	    def image_params
	      params.require(:image).permit(:title, :path, :url, :file)
	    end
end
