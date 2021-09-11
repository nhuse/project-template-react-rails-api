class User < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :games, through: :reviews
    has_many :score_boards
    has_many :games, through: :score_boards

    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :name, presence: true
end