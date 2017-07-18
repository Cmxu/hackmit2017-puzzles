from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Dropout, Flatten
import json
import numpy as np

character_int_value = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, 'g': 16, 'h': 17, 'i': 18, 'j': 19, 'k': 20, 'l': 21, 'm': 22, 'n': 23, 'o': 24, 'p': 25, 'q': 26, 'r': 27, 's': 28, 't': 29, 'u': 30, 'v': 31, 'w': 32, 'x': 33, 'y': 34, 'z': 35}

with open('labels.json') as data_file:
	data = json.load(data_file)

labels = []
images = []

for i in data:
	images.append(np.reshape(np.array([[int(j)] for j in i]),[25,25,1]))
	labels.append([character_int_value[data[i]] == j for j in range(36)])
images = np.array(images)
labels = np.array(labels)

print(labels.shape)

model = Sequential()

model.add(Conv2D(32, (3,3), input_shape=(25,25,1)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Conv2D(32, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Conv2D(64, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Flatten())
model.add(Dense(64))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(36))
model.add(Activation('sigmoid'))

model.compile(loss='categorical_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

model.fit(images, labels, epochs=50, batch_size=64)

with open('names1.json') as data_file:
	data = json.load(data_file)

te_names = []
te_images = []

for i in data:
	te_images.append(np.reshape(np.array([[int(j)] for j in i]),[25,25,1]))
	te_names.append(data[i])
te_images = np.array(te_images)

yPreds = model.predict(te_images)

marcos2 = {v:k for k,v in character_int_value.items()}

names = []

for i in te_names:
	names.append(i[0:len(i)-1])

names = list(set(names))

captchas = {}
count = 0
for i in names:
	count+=1
	print(count)
	tmp_list = [0,0,0,0]
	for j in range(len(te_names)):
		if i in te_names[j]:
			tmp_list[int(te_names[j][-1])] = j
	captchas[i] = tmp_list


solution_input = {}
for index in range(15000):
	name = names[index]
	solution_input[names[index]] = ''.join([marcos2[np.argmax(yPreds[i])] for i in captchas[name]])
	print(name)
	print([marcos2[np.argmax(yPreds[i])] for i in captchas[name]])

solution = {}
solution['solutions'] = []

for key in solution_input:
	dict_to_append = {}
	dict_to_append['name'] = key
	dict_to_append['solution'] = solution_input[key]
	solution['solutions'].append(dict_to_append)


with open('solutions.json', 'w') as file:
	json.dump(solution, file, sort_keys=True, indent=4, separators=(',', ': '))


