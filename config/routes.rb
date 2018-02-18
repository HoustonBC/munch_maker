Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :restaurants
    resources :homes
    resources :matches
    resources :users
  end

  resources :restaurants, only: [:index]

  get '*path' => 'homes#index'

end
