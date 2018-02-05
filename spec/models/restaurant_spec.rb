RSpec.describe Restaurant, type: :model do
  it { should have_many :matches }

  it { should have_valid(:name).when("good burger") }
  it { should_not have_valid(:name).when("") }

  it { should have_valid(:address).when("500 summer street") }
  it { should_not have_valid(:address).when("")}

  it { should have_valid(:city).when("Boston") }
  it { should_not have_valid(:city).when("") }

  it { should have_valid(:state).when("MA")}
  it { should_not have_valid(:state).when("") }

  it { should have_valid(:zip).when("00000") }
  it { should_not have_valid(:zip).when("0000") }

  it { should have_valid(:picture).when("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1200px-Hamburger_%28black_bg%29.jpg") }
  it { should_not have_valid(:picture).when("") }
end
