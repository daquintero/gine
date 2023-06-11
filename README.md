# gine

[![PyPI Version](https://img.shields.io/pypi/v/gine.svg)](https://pypi.python.org/pypi/gine)
[![Build Status](https://img.shields.io/travis/daquintero/gine.svg)](https://travis-ci.com/daquintero/gine)
[![Documentation Status](https://readthedocs.org/projects/gine/badge/?version=latest)](https://gine.readthedocs.io/en/latest/?version=latest)
[![Updates](https://pyup.io/repos/github/daquintero/gine/shield.svg)](https://pyup.io/repos/github/daquintero/gine/)

Interactive netlist visualisation tools compatible with GDSFactory

- Free software: MIT license
- Documentation: [https://gine.readthedocs.io](https://gine.readthedocs.io)

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
