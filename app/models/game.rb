class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews
    has_many :score_boards, dependent: :destroy

    def highscores_all_users
        self.score_boards.sort{|a, b| a.score <=> b.score}.reverse.take(5)
    end

end