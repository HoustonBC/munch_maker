require 'httparty'

class Api::RestaurantsController < ApiController
  def index
    @getLength = HTTParty.get("https://api.yelp.com/v3/businesses/search?location=Boston%2C+MA+02108&ns=1", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    offset = rand(@getLength['total']/20)
    @restaurant = HTTParty.get("https://api.yelp.com/v3/businesses/search?location=Boston%2C+MA+02108&ns=1&offset=#{offset}", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    index = rand(20)
    render json: @restaurant['businesses'][index]
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.location = location_params
    # {:location => [:address1, :city, :zip_code, :state, :country]}
    if @restaurant.save
      @match = Match.new(name: @restaurant.name, restaurant_id: @restaurant.id, user_id: current_user.id)
    end
  end

  private
  def restaurant_params
    params.require('restaurant').permit(:name, :image_url, :price, :rating, :display_phone, {categories: [:title]})
  end

  def location_params
    params['restaurant']['location']['display_address'].join(', ')
  end
end
