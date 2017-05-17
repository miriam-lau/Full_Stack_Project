require 'test_helper'

class Api::PantryItemControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_pantry_item_index_url
    assert_response :success
  end

  test "should get new" do
    get api_pantry_item_new_url
    assert_response :success
  end

  test "should get create" do
    get api_pantry_item_create_url
    assert_response :success
  end

  test "should get show" do
    get api_pantry_item_show_url
    assert_response :success
  end

  test "should get edit" do
    get api_pantry_item_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_pantry_item_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_pantry_item_destroy_url
    assert_response :success
  end

end
