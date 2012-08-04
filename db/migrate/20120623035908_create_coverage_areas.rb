class CreateCoverageAreas < ActiveRecord::Migration
  def change
    create_table :coverage_areas do |t|

      t.timestamps
    end
  end
end
