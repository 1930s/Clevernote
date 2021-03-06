class Api::TaggingsController < ApplicationController
  def index
    unless current_user
      render json: ["You are not logged in"], status: 404
    end

    @taggings = current_user.taggings
    render :index
  end


  def create
    @tagging = Tagging.new(tagging_params)
    unless params[:tagging][:tag_id]
      tag = Tag.find_by(name: params[:tagging][:name])
      unless tag
        tag = Tag.create(owner_id: current_user.id, name: params[:tagging][:name])
      end
       @tagging.tag_id = tag.id
    end
      
    if @tagging.save
      render :show
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end

  def destroy
    @tagging = Tagging.find_by(id: params[:id])

    if @tagging
      @tagging.destroy
      render :show
    else
      render json: ["Tagging does not exist"], status: 404
    end
  end

  private 
  def tagging_params
    params.require(:tagging).permit(:note_id, :tag_id)
  end
end
