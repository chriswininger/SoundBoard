class ClipsController < ApplicationController
  before_action :set_clip, only: [:show, :edit, :update, :destroy]

  # GET /clips
  # GET /clips.json
  def index
    @clips = Clip.all
    respond_to do |format|
      format.json { render json: @clips.to_json(:include => [:sound_board_clip_sources, :image_playing, :image_default ]) }
      format.xml { render xml: @clips }
    end
  end

  # GET /clips/1
  # GET /clips/1.json
  def show
    respond_to do |format|
      format.json { render json: @clip.to_json(:include => [:sound_board_clip_sources, :image_playing, :image_default]) }
      format.xml { render xml: @clip.to_xml(:include => [:sound_board_clip_sources, :image_playing, :image_default ]) }
    end
  end

  # POST /clips
  # POST /clips.json
  def create
    @clip = Clip.new(clip_params[:clip])

    respond_to do |format|
      if @clip.save
        format.json { render action: 'show', status: :created, location: @clip }
        format.xml { render action: 'show', status: :created, location: @clip }
      else
        format.json { render json: @clip.errors, status: :unprocessable_entity }
        format.xml { render xml: @clip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clips/1
  # PATCH/PUT /clips/1.json
  def update
    respond_to do |format|
      puts clip_params.inspect

      if @clip.update(clip_params)
        puts 'here 1'
        puts @clip.inspect
        format.html { redirect_to @clip, notice: 'Clip was successfully updated.' }
        format.json { head :no_content }
      else
        puts 'here 2'
        format.html { render xml: @clip.errors, status: :unprocessable_entity }
        format.json { render json: @clip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clips/1
  # DELETE /clips/1.json
  def destroy
    @clip.destroy
    respond_to do |format|
      format.xml { head :no_content }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_clip
      @clip = Clip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def clip_params
      puts params.inspect
      params.require(:clip).permit(:title, :default_image, :playing_image, :info, :image_playing_id, :image_default_id, :clip_sources, :id)
    end
end
