require 'test_helper'

class Api::GroceriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_groceries_index_url
    assert_response :success
  end

  test "should get new" do
    get api_groceries_new_url
    assert_response :success
  end

  test "should get create" do
    get api_groceries_create_url
    assert_response :success
  end

  test "should get show" do
    get api_groceries_show_url
    assert_response :success
  end

  test "should get edit" do
    get api_groceries_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_groceries_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_groceries_destroy_url
    assert_response :success
  end

end
