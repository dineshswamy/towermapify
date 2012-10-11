require 'test_helper'

class RegionCoverageCellTest < Cell::TestCase
  test "coverage" do
    invoke :coverage
    assert_select "p"
  end
  

end
