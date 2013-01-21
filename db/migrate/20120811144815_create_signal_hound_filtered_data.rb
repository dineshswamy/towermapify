class CreateSignalHoundFilteredData < ActiveRecord::Migration
  def change
    create_table :signal_hound_filtered_data do |t|
	t.string :operator_name
	t.integer :operator_id
	t.float  :lan
	t.float  :lon
	t.float	 :dbm
	t.float  :weight 
      t.timestamps
    end
  end
end
