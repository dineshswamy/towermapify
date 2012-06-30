class ShowEntryController < ApplicationController
  def theentry
 	@cities = CoverageArea.find(1,10)
  end
end
