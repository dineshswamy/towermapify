class CreateSignalHoundData < ActiveRecord::Migration
  def change
    create_table :signal_hound_data do |t|
      t.text :operator_name
      t.text  :operator_id
      t.float :lat
      t.float :lon
      t.float :dbm
      t.string :network_type
      t.timestamps
    end
  end
end
