from keras.models import Sequential
from keras.models import model_from_json
import numpy as np
import scipy.misc as sm

print("Loading Model")

json = open('model.json', 'r')
loaded = json.read()
json.close()

model = model_from_json(loaded)
model.load_weights('model.hdf5')

model.compile(loss='categorical_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

print("Initializing")

tp = np.array([np.random.rand(32,32,3)*256])

current_objective = model.predict(tp)[0,1]

learning_rate = 0.5
misses = 0

print("Starting to Climb")

##The learning rate here doesn't matter, most of the time it never changes from 0.5
##When I was using 0-1 I was having problems with convergence so I implmented it
##All it does it lower the rate if it doesn't improve after a long while

for _ in range(100000):
    mask = np.array([np.random.rand(32,32,3) * 2 -1]) * learning_rate
    
    temp = tp + mask
    temp = np.clip(temp, 0, 256)
    new_obj = model.predict(temp)[0,1]
    if new_obj > current_objective:
        current_objective = new_obj
        tp = temp
        print(current_objective)
        misses = 0
    else:
        misses = misses + 1
    if misses > 100:
        misses = 0
        learning_rate = learning_rate * 0.99
    if current_objective > 0.6:
        break
    
print("Learning Rate: ", learning_rate)
print("Final Objective: ", current_objective)

print("Saving File")

sm.imsave('pfp.jpg', tp[0])
