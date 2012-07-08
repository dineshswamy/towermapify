module GenKmlHelper

def getstyle(id)
	stylehash = Hash.new
	stylehash[0]="reliance"
	stylehash[1]="airtel"
	stylehash[3]="reliance"
	stylehash[17]="reliance"
	stylehash[4]="vodafone"
	stylehash[5]="aircel"
	stylehash[6]="bsnl"
	stylehash[7]="idea"
	stylehash[10]="mts"
	stylehash[13]="docomo"
	stylehash[12]="docomo"
return stylehash[id]
end

def getAvailableOperators

end
end


