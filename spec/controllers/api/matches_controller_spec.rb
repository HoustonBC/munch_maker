require "rails_helper"

RSpec.describe Api::MatchesController, type: :controller do
  let!(:user) {User.create!(email: "b@b.com", password: "password", id: 1)}
  let!(:test_restaurant) { Restaurant.create!(id: 1, name: "Wendy's", image_url: "this.url", price: '3', rating: '3', display_phone: '1111111111', location: 'boston', categories: ['burgers']) }
  let!(:test_match) {Match.create!(name: "Wendy's", user_id: 1, restaurant_id: 1)}

  before(:each) do
    sign_in(user)
  end
  describe "GET#index" do

    it "should return a list of restaurants with a matching user id" do

      get :index
      returned_json = JSON.parse(response.body)
      expect(subject.current_user).to_not eq(nil)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json[0]["id"]).to eq 1
      expect(returned_json[0]["name"]).to eq "Wendy's"


    end
  end

end
