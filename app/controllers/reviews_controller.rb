class ReviewsController < ApplicationController
    def index
        render json: Review.all, include: { user: { only: [:name] }}
    end

    def create
        review = Review.create!(review_params)
        render json: Review.all, include: { user: { only: [:name] }}, status: :created
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update!(review_params)
        render json: review, status: :accepted
    end

    def destroy
        review = Review.find_by!(id: params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:user_id, :game_id, :review)
    end
    
end