require "rails_helper"

RSpec.describe Api::UsersController, type: :controller do
  let!(:user) {User.create!(email: "b@b.com", password: "password")}
  describe "GET#index" do
    it "should return a list of all the users" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json["users"][0]["email"]).to eq "b@b.com"
    end
  end
end
