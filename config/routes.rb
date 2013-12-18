Antiboredom::Application.routes.draw do
  devise_for :users

  resources :invites
  resources :activities
  resources :friends

  get "pages/home"
  get "pages/newsfeed"
  get "pages/signup"

  root :to => "sign_in#new"

  devise_scope :user do
    get "sign_in", :to => "devise/sessions#new"
  end
end
