class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews
    has_many :score_boards
    has_many :users, through: :score_boards
end