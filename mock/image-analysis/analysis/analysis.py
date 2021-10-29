# -*- coding: utf-8 -*-

import os, sys, shutil, random
import time

'''
Analog image analysis
'''

def exec(img_dir):
	if not os.path.exists(img_dir):
		print('The image directory does not exist')
		return
	
	result_dir = img_dir + '/results'
	cleans(result_dir)

	for it in os.listdir(img_dir):
		fpath = img_dir + '/' + it
		if os.path.isfile(fpath):
			processing(it, result_dir)

	final_dir = result_dir + '/final'
	mock_prefix = os.getcwd() + '/results.tmp'
	os.mkdir(final_dir)
	for (ind, it) in enumerate(os.listdir(mock_prefix + '/finals')):
		shutil.copyfile(mock_prefix + '/finals/' + it, final_dir + '/' + str(ind) + '_' + it)
	
	shutil.copyfile(mock_prefix + '/others/param.xlsx', result_dir + '/final.xlsx')

	shutil.copyfile(mock_prefix + '/others/param.json', result_dir + '/final.json')

def cleans(dr):
	try:
		shutil.rmtree(dr)
	except Exception as e:
		pass
	finally:
		os.mkdir(dr)

def processing(fname, dist_dir):
	item_dir = dist_dir + '/' + fname
	os.mkdir(item_dir)

	extracts_dir = os.getcwd() + '/results.tmp/extracts'
	extracts = os.listdir(extracts_dir)
	size = random.randint(1, 5)
	random.seed(len(extracts))
	slice = random.sample(extracts, size)

	for it in slice:
		shutil.copyfile(extracts_dir + '/' + it, item_dir + '/' + it)

if __name__ == '__main__':
	# time.sleep(3)
	exec(sys.argv[1])
