class SoundBoardClipSourcesController < ApplicationController
  before_action :set_sound_board_clip_source, only: [:show, :edit, :update, :destroy]

  # GET /sound_board_clip_sources
  # GET /sound_board_clip_sources.json
  def index
    @sound_board_clip_sources = SoundBoardClipSource.all
    respond_to do |format|
      format.json { render json: @sound_board_clip_sources }
      format.xml { render xml: @sound_board_clip_sources }
    end
  end

  # GET /sound_board_clip_sources/1
  # GET /sound_board_clip_sources/1.json
  def show
    respond_to do |format|
      format.json { render json: @sound_board_clip_source }
      format.xml { render xml: @sound_board_clip_source }
    end
  end

  # POST /sound_board_clip_sources
  # POST /sound_board_clip_sources.json
  def create
    uploaded_io = clip_source_params[:file]
    filePath = Rails.root.join('public', 'uploads', 'clips', uploaded_io.original_filename)

    File.open(filePath, 'wb') do |file|
      file.write(uploaded_io.read)
    end

    @sound_board_clip_source = SoundBoardClipSource.new({
      :clip_id => :null,
      :media_type => uploaded_io.content_type,
      :path_local => filePath.to_s,
      :url => request.protocol + request.host_with_port + '/uploads/clips/' + uploaded_io.original_filename
    })

    respond_to do |format|
      if @sound_board_clip_source.save
        format.json { render action: 'show', status: :created, location: @sound_board_clip_source }
        format.xml { render action: 'show', status: :created, location: @sound_board_clip_source }
      else
        format.json { render json: @sound_board_clip_source.errors, status: :unprocessable_entity }
        format.xml { render xml: @sound_board_clip_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sound_board_clip_sources/1
  # PATCH/PUT /sound_board_clip_sources/1.json
  def update
    respond_to do |format|
      if @sound_board_clip_source.update(sound_board_clip_source_params)
        format.json { head :no_content }
        format.xml { head :no_content }
      else
        format.json { render json: @sound_board_clip_source.errors, status: :unprocessable_entity }
        format.xml { render xml: @sound_board_clip_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sound_board_clip_sources/1
  # DELETE /sound_board_clip_sources/1.json
  def destroy
    @sound_board_clip_source.destroy
    respond_to do |format|
      format.json { head :no_content }
      format.xml { head :no_content }
    end
  end

  private
    def clip_source_params
      params.require(:sound).permit(:path_local, :url, :media_type, :file)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_sound_board_clip_source
      @sound_board_clip_source = SoundBoardClipSource.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sound_board_clip_source_params
      params[:sound_board_clip_source]
    end
end
