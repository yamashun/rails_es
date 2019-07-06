class SearchWordLog < ApplicationRecord
  include SearchWordLogSearchable

  scope :searchable_word, -> {
    where('hit_number > 1')
  }
end
