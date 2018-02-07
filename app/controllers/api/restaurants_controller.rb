require 'httparty'

class Api::RestaurantsController < ApiController
  def index
    @getLength = HTTParty.get("https://api.yelp.com/v3/businesses/search?location=Boston%2C+MA+02108&ns=1", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    offset = rand(@getLength['total']/20)
    @restaurant = HTTParty.get("https://api.yelp.com/v3/businesses/search?location=Boston%2C+MA+02108&ns=1&offset=#{offset}", :headers=>{"Authorization"=>"Bearer #{ENV['YELP_KEY']}"})
    index = rand(20)
    render json: @restaurant['businesses'][index]
  end
end
