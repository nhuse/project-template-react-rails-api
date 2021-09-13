class SessionsController < ApplicationController

    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, except: [:password_digest, :created_at, :updated_at], status: :created
        else
            render json: { error: "Invalid email/password. Please try again." }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end