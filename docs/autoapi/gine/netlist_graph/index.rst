:py:mod:`gine.netlist_graph`
============================

.. py:module:: gine.netlist_graph


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   gine.netlist_graph.NetlistGraph



Functions
~~~~~~~~~

.. autoapisummary::

   gine.netlist_graph.interactive_netlist_graph



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


