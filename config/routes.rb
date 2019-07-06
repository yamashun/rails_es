Rails.application.routes.draw do
  resources :mangas do
    collection do
      get :suggest
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
