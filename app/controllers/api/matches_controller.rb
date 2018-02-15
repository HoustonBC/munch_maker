class Api::MatchesController < ApiController
  def index
    render json: Match.where(user_id: current_user.id)
  end

  def show
  end

  def destroy
    match = Match.find(params['id'])
    match.delete
  end
end
