class User < ApplicationRecord
    has_secure_password
    has_many :reviews, dependent: :destroy
    has_many :games, through: :reviews
    has_many :score_boards, dependent: :destroy

    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :name, presence: true
    validates :username, presence: true, uniqueness: true

    def tetris_scores
        self.score_boards.filter {|board|
            board.game_id == 1
        }.sort{|a,b| a.score <=> b.score}.reverse.take(5)
    end

    def snake_scores
        self.score_boards.filter {|board|
            board.game_id == 3
        }.sort{|a,b| a.score <=> b.score}.reverse.take(5)
    end

end