class ScoreBoardsController < ApplicationController
    def show
        scores = ScoreBoard.where(game_id: params[:game_id])
        if scores.length > 0
            render json: scores, only: [:score], include: { user: { only: [:username] }}, status: :ok
        else
            render json: { error: "Game not found" }, status: :not_found
        end
    end

    def create
        score = ScoreBoard.create!(score_params)
        render json: score, status: :created
    end

    private

    def score_params
        params.permit(:user_id, :game_id, :score)
    end
end