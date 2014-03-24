class ImagesController < ApplicationController
   before_action :set_image, only: [:show, :edit, :update, :destroy]

   #before_filter :authenticate_user!
  	def index
	    @images = Image.all
	    respond_to do |format|
	      format.json { render json: @images.to_json }
	      format.xml { render xml: @images }
	    end
  	end

  	def show
	    respond_to do |format|
	      format.json { render json: @image.to_json }
	      format.xml { render xml: @image.to_xml }
	    end
  	end

  	def update
		respond_to do |format|
	      if @image.update(image_params[:image])
	        format.json { head :no_content }
        	format.xml { head :no_content }
	      else
	        format.xml { render xml: @image.errors, status: :unprocessable_entity }
	        format.json { render json: @image.errors, status: :unprocessable_entity }
	      end
      	end
	end

	def create
		uploaded_io = image_params[:file]
		filePath = Rails.root.join('public', 'uploads', 'images', uploaded_io.original_filename)
		puts filePath
		File.open(filePath, 'wb') do |file|
	  		file.write(uploaded_io.read)
	  	end

	  	puts "here 1"
		@image = Image.new({
			:title => image_params[:title],
			:path => filePath.to_s,
			:url =>  request.protocol + request.host_with_port + '/uploads/images/' + uploaded_io.original_filename
		})
		puts "here 2"

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

	def destroy
		@image.destroy
		respond_to do |format|
		  format.xml { head :no_content }
		  format.json { head :no_content }
		end
	end

	private
		# Never trust parameters from the scary internet, only allow the white list through.
	    def image_params
	      params.require(:image).permit(:title, :path, :url, :file)
	    end

	    def set_image
	    	@image = Image.find(params[:id])
	    end
end
