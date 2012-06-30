require 'test_helper'

class GenKmlControllerTest < ActionController::TestCase
  test "should get generatekml" do
    get :generatekml
    assert_response :success
  end

end
