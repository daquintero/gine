# gine

Interactive netlist visualisation tools compatible with GDSFactory

## Installation

To install use pip:

    $ pip install gine

For a development installation (requires [Node.js](https://nodejs.org) and [Yarn version 1](https://classic.yarnpkg.com/)),

    $ git clone https://github.com/daquintero/gine.git
    $ cd gine
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix gine
    $ jupyter nbextension enable --py --sys-prefix gine

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite gine

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.
