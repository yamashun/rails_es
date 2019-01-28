class Manga < ApplicationRecord
  belongs_to :publisher
  belongs_to :category
  belongs_to :author
end
