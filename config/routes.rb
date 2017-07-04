Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :pantry_items, except: [:new, :show, :edit]
    resources :groceries, except: [:new, :show, :edit]
    resources :recipes, except: [:new, :show, :edit]
    resources :lists, except: [:new, :show, :edit]
    get "/search", to: "pantry_items#search"
  end

  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
