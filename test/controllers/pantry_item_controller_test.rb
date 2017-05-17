require 'test_helper'

class PantryItemControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pantry_item_index_url
    assert_response :success
  end

  test "should get new" do
    get pantry_item_new_url
    assert_response :success
  end

  test "should get create" do
    get pantry_item_create_url
    assert_response :success
  end

  test "should get show" do
    get pantry_item_show_url
    assert_response :success
  end

  test "should get edit" do
    get pantry_item_edit_url
    assert_response :success
  end

  test "should get update" do
    get pantry_item_update_url
    assert_response :success
  end

  test "should get destroy" do
    get pantry_item_destroy_url
    assert_response :success
  end

end
