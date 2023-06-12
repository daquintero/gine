:py:mod:`gine`
==============

.. py:module:: gine


Submodules
----------
.. toctree::
   :titlesonly:
   :maxdepth: 1

   _version/index.rst
   example/index.rst
   netlist_graph/index.rst
   utils/index.rst


Package Contents
----------------

Classes
~~~~~~~

.. autoapisummary::

   gine.HelloWorld
   gine.NetlistGraph



Functions
~~~~~~~~~

.. autoapisummary::

   gine.interactive_netlist_graph
   gine.convert_gdsfactory_netlist
   gine._jupyter_labextension_paths
   gine._jupyter_nbextension_paths



Attributes
~~~~~~~~~~

.. autoapisummary::

   gine.__version__
   gine.NPM_PACKAGE_RANGE


.. py:data:: __version__
   :value: '0.0.5'

   

.. py:data:: NPM_PACKAGE_RANGE
   :value: '0.0.5'

   

.. py:class:: HelloWorld(**kwargs)


   Bases: :py:obj:`ipywidgets.DOMWidget`

   An example widget.

   .. py:attribute:: _view_name

      

   .. py:attribute:: _model_name

      

   .. py:attribute:: _view_module

      

   .. py:attribute:: _model_module

      

   .. py:attribute:: _view_module_version

      

   .. py:attribute:: _model_module_version

      

   .. py:attribute:: value

      


.. py:class:: NetlistGraph(**kwargs)


   Bases: :py:obj:`ipywidgets.DOMWidget`

   Widget element that contains the javascript interactive netlist.

   .. py:attribute:: _view_name

      

   .. py:attribute:: _model_name

      

   .. py:attribute:: _view_module

      

   .. py:attribute:: _model_module

      

   .. py:attribute:: _view_module_version

      

   .. py:attribute:: _model_module_version

      

   .. py:attribute:: netlist_graph_data

      

   .. py:attribute:: value

      


.. py:function:: interactive_netlist_graph(gdsfactory_netlist: dict)

   This function converts a GDSFactory netlist into a `gine` netlist, and then returns an interactive netlist widget.


.. py:function:: convert_gdsfactory_netlist(gdsfactory_netlist: dict)

   Converts between gdsfactory inherent netlist to `gine`-compatible netlists.

   GDSFactory netlist format:
   ```
   netlist={
       "instances": {
           "lft": coupler,
           "top": waveguide,
           "rgt": coupler,
       },
       "connections": {
           "lft,out0": "rgt,in0",
           "lft,out1": "top,in0",
           "top,out0": "rgt,in1",
       },
       "ports": {
           "in0": "lft,in0",
           "in1": "lft,in1",
           "out0": "rgt,out0",
           "out1": "rgt,out1",
       },
   }
   ```

   `gine` netlist format:
   ```
   netlist = {
       nodes: [
           {id: "heyhey", someproperty: "beer"},
           {id: "oioi", someproperty: "ale"},
       ],
       links: [
           {"source": "heyhey", "target": "oioi", "value": 1},
       ],
   }
   ```

   Part of the objective is to retain information of the ports, but I am trying to see how to do this in a force-graph implementation. Personally I am less interested in ports but it would be good for future compatibility. The problem is that I would have to make each port an element. I can save it as a property for now.


.. py:function:: _jupyter_labextension_paths()

   Called by Jupyter Lab Server to detect if it is a valid labextension and
   to install the widget

   :returns: * **src** (*Source directory name to copy files from. Webpack outputs generated files*) -- into this directory and Jupyter Lab copies from this directory during
               widget installation
             * **dest** (*Destination directory name to install widget files to. Jupyter Lab copies*) -- from `src` directory into <jupyter path>/labextensions/<dest> directory
               during widget installation


.. py:function:: _jupyter_nbextension_paths()

   Called by Jupyter Notebook Server to detect if it is a valid nbextension and
   to install the widget

   :returns: * **section** (*The section of the Jupyter Notebook Server to change.*) -- Must be 'notebook' for widget extensions
             * **src** (*Source directory name to copy files from. Webpack outputs generated files*) -- into this directory and Jupyter Notebook copies from this directory during
               widget installation
             * **dest** (*Destination directory name to install widget files to. Jupyter Notebook copies*) -- from `src` directory into <jupyter path>/nbextensions/<dest> directory
               during widget installation
             * **require** (*Path to importable AMD Javascript module inside the*) -- <jupyter path>/nbextensions/<dest> directory


