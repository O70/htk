# -*- coding: utf-8 -*-

import os, sys, shutil

def exec(img_dir):
	result_dir = img_dir + '/results'
	cleans(result_dir)

	for it in os.listdir(img_dir):
		fpath = img_dir + '/' + it
		if os.path.isfile(fpath):
			processing(it, fpath, result_dir)

def cleans(dr):
	try:
		shutil.rmtree(dr)
	except Exception as e:
		pass
	finally:
		os.mkdir(dr)

def processing(fname, fpath, dist_dir):
	print(fname, fpath, dist_dir)

if __name__ == '__main__':
	exec(sys.argv[1])
