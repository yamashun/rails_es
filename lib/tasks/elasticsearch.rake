namespace :elasticsearch do
  desc 'Elasticsearch のindex作成'
  task :create_index => :environment do
    Manga.create_index!
  end

  desc 'Manga を Elasticsearch に登録'
  task :import_manga_all => :environment do
    Manga.__elasticsearch__.import
  end
end
