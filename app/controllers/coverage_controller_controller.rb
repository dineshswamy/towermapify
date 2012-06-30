class CoverageControllerController < ApplicationController

def list
@cities = CoverageArea.find(:all)
end

end
