class CreateSearchWordLog < ActiveRecord::Migration[5.2]
  def change
    create_table :search_word_logs do |t|
      t.string :word
      t.integer :hit_number
    end
  end
end
