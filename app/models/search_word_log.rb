class SearchWordLog < ApplicationRecord
  include SearchWordLogSearchable

  scope :searchable_word, -> {
    where('hit_number > 0')
  }
end
