class Api::HomesController < ApiController
  def index
    render json: user_signed_in?
  end

end
