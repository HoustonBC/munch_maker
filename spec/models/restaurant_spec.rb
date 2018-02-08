RSpec.describe Restaurant, type: :model do
  it { should have_many :matches }

  it { should have_valid(:name).when("good burger") }
  it { should_not have_valid(:name).when("") }

  it { should have_valid(:price).when("$$") }
  it { should_not have_valid(:price).when("") }

  it { should have_valid(:rating).when("2") }
  it { should_not have_valid(:rating).when("") }

  it { should have_valid(:display_phone).when("123456789") }
  it { should_not have_valid(:display_phone).when("")}

  it { should have_valid(:image_url).when("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1200px-Hamburger_%28black_bg%29.jpg") }
  it { should_not have_valid(:image_url).when("") }
end
