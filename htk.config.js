const mock = true
module.exports = mock ? {
  app: 'python3',
  entry: '~/Workspace/Pythons/Exercises/python-examples/htk/launch.py',
  args: p => p,
  options: { cwd: '~/Workspace/Pythons/Exercises/python-examples/htk/' }
} : {
  app: 'python3',
  entry: 'path/to/launch.py',
  args: p => `--sample-params=${p}`,
  options: { cwd: 'path/to/' }
}
