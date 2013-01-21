class CreateSignalHounds < ActiveRecord::Migration
  def change
    create_table :signal_hounds do |t|
      t.text  :operator_name
      t.float :lat
      t.float :lng
      t.float :dbm
      t.string :network_type
      t.timestamps
    end
  end
end
