# -*- coding: utf-8 -*-

import os, sys, shutil, random

def exec(img_dir):
	result_dir = img_dir + '/results'
	cleans(result_dir)

	for it in os.listdir(img_dir):
		fpath = img_dir + '/' + it
		if os.path.isfile(fpath):
			processing(it, fpath, result_dir)

	mock_prefix = '/Users/Guiwang/Workspace/JavaScripts/Projects/thraex-boardroom/db.tmp'
	shutil.copyfile(mock_prefix + '/a.png', result_dir + '/final.png')
	shutil.copyfile(mock_prefix + '/meetings.xlsx', result_dir + '/final.xlsx')

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
