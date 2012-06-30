require 'test_helper'

class ShowEntryControllerTest < ActionController::TestCase
  test "should get theentry" do
    get :theentry
    assert_response :success
  end

end
