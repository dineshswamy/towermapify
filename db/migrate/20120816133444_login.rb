class Login < ActiveRecord::Migration
  def up
  		create_table :login do |t|
  			t.text :user_name, :limit => 100
  			t.text :name,:limit=>100
  			t.text :designation, :limit=>100
  			t.text :access	,:limit=>100
  			t.text :password,:limit=>100
  			t.text :department, :limit=>100
  			t.text :last_visit_from_machine,:limit=>100 
  			t.timestamps
  		end
  end

  def down
  end
end
