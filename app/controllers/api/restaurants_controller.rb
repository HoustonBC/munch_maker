require 'httparty'
require 'uri'

class Api::RestaurantsController < ApiController

  def index
    search_location = URI.escape(params['loc'])
    @getLength = HTTParty.get("https://api.yelp.com/v3/businesses/search?term=restaurants&location=#{search_location}", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    offset = rand(@getLength['total']/20)
    @restaurant = HTTParty.get("https://api.yelp.com/v3/businesses/search?location=#{search_location}&offset=#{offset}", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    index = rand(20)
    render json: @restaurant['businesses'][index]
  end

  def show
    @restaurant = Restaurant.find(params['id'])
    render json: @restaurant
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.location = location_params
    if @restaurant.save
      @match = Match.create!(name: @restaurant.name, restaurant_id: @restaurant.id, user_id: current_user.id)
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
