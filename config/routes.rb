Antiboredom::Application.routes.draw do
  resources :user
  resources :invites
  resources :activities
  resources :friends

  devise_for :users

  get "pages/home"
  get "pages/newsfeed"
  get "pages/signup"

  authenticated :user do
    root :to => "pages#newsfeed", as: :authenticated_root
  end

  devise_scope :user do 
    get 'users/sign_out' => 'devise/sessions#destroy',
      :path_prefix => 'd'
    get 'users/sign_in' => 'devise/sesions#new'

  root :to => "devise/sessions#new"
  end
end
