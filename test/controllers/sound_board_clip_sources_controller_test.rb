require 'test_helper'

class SoundBoardClipSourcesControllerTest < ActionController::TestCase
  setup do
    @sound_board_clip_source = sound_board_clip_sources(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sound_board_clip_sources)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sound_board_clip_source" do
    assert_difference('SoundBoardClipSource.count') do
      post :create, sound_board_clip_source: {  }
    end

    assert_redirected_to sound_board_clip_source_path(assigns(:sound_board_clip_source))
  end

  test "should show sound_board_clip_source" do
    get :show, id: @sound_board_clip_source
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sound_board_clip_source
    assert_response :success
  end

  test "should update sound_board_clip_source" do
    patch :update, id: @sound_board_clip_source, sound_board_clip_source: {  }
    assert_redirected_to sound_board_clip_source_path(assigns(:sound_board_clip_source))
  end

  test "should destroy sound_board_clip_source" do
    assert_difference('SoundBoardClipSource.count', -1) do
      delete :destroy, id: @sound_board_clip_source
    end

    assert_redirected_to sound_board_clip_sources_path
  end
end
