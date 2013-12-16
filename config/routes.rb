Antiboredom::Application.routes.draw do
  devise_for :users

  resources :invites
  resources :activities
  resources :friends
  resources :pages

  get "pages/home"

  root :to => "pages#home"
end
