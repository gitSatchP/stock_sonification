import maxpy as mp

# load existing max patch
patch = mp.MaxPatch(load_file="mcfm.maxpat")

# create a smaller dictionary, only holding "random"
# objects that generate a number within a range of above 10
# that will be replaced with "stocksounds" abstraction patch
replace = {}
limit = 10
for k, v in patch.objs.items():
    if v._name == "random" and int(v._args[0])>limit:
        replace[k] = v

#loop through dict of all "random objects" and replace with abstraction patch
for k, v in replace.items():

    patch.replace(k, "stocksounds", True, True)

#save the edited patch
patch.save("stockSonification.maxpat")