require 'test_helper'

class CoverageMapCellTest < Cell::TestCase
  test "city_coverage" do
    invoke :city_coverage
    assert_select "p"
  end
  

end
