class Activity < ActiveRecord::Base
  has_many :invites, dependent: :destroy
  belongs_to :user
end
