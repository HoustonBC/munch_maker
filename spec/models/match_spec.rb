RSpec.describe Match, type: :model do
  it { should belong_to :user }
  it { should belong_to :restaurant }

  it { should have_valid(:name).when("good burger") }
  it { should_not have_valid(:name).when("") }
end
