json.extract! manga, :id, :publisher_id, :category_id, :author_id, :title, :description, :created_at, :updated_at
json.url manga_url(manga, format: :json)
