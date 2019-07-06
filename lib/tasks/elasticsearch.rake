namespace :elasticsearch do
  desc 'Elasticsearch のindex作成'
  task :create_index => :environment do
    Manga.create_index!
  end

  desc 'Manga を Elasticsearch に登録'
  task :import_manga_all => :environment do
    Manga.__elasticsearch__.import
  end

  desc 'サジェスト用のindex作成'
  task :create_suggest_index => :environment do
    SearchWordLog.create_index!
  end

  desc 'サジェスト用のキーワードを登録'
  task :import_suggest_word => :environment do
    SearchWordLog.__elasticsearch__.import scope: 'searchable_word'
  end
end
