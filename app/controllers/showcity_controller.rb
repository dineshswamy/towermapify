class ShowcityController < ApplicationController
  def list
 @cities = CoverageArea.all
  end
end
