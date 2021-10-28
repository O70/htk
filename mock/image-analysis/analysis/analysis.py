# -*- coding: utf-8 -*-

import os, sys, shutil, random

def exec(img_dir):
	if not os.path.exists(img_dir):
		print('The image directory does not exist')
		return
	
	result_dir = img_dir + '/results'
	cleans(result_dir)

	for it in os.listdir(img_dir):
		fpath = img_dir + '/' + it
		if os.path.isfile(fpath):
			processing(it, fpath, result_dir)

	mock_prefix = os.getcwd() + '/results.tmp'
	final_dir = result_dir + '/final'
	os.mkdir(final_dir)
	for (ind, it) in enumerate(os.listdir(mock_prefix + '/finals')):
		shutil.copyfile(mock_prefix + '/finals/' + it, final_dir + '/' + str(ind) + '_' + it)
	shutil.copyfile(mock_prefix + '/others/param.xlsx', result_dir + '/final.xlsx')

def cleans(dr):
	try:
		shutil.rmtree(dr)
	except Exception as e:
		pass
	finally:
		os.mkdir(dr)

def processing(fname, fpath, dist_dir):
	item_dir = dist_dir + '/' + fname
	os.mkdir(item_dir)

	for it in range(0, random.randint(1, 5)):
		shutil.copyfile(fpath, '%s/%d_%s' % (item_dir, it, fname))

if __name__ == '__main__':
	exec(sys.argv[1])
