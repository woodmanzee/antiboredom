Antiboredom::Application.routes.draw do
  devise_for :users

  resources :invites
  resources :activities
  resources :friends

  get "pages/home"
  get "pages/newsfeed"
  get "pages/signup"

  root :to => "pages#home"
end
