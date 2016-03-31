/* =========================================================
 * bootstrap-treeview.js v1.2.0
 * =========================================================
 * Copyright 2013 Jonathan Miles
 * Project URL : http://www.jondmiles.com/bootstrap-treeview
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

;
(function ($, window, document, undefined) {

    /*global jQuery, console*/

    //'use strict';
    var gbInputs = new Array();
    var pluginName = 'treeview';

    var _default = {};

    _default.settings = {

        inputHolder: "点击输入内容",
        canEditNode: false,
        injectStyle: true,

        levels: 2,

        expandIcon: 'glyphicon glyphicon-plus',
        collapseIcon: 'glyphicon glyphicon-minus',
        emptyIcon: 'glyphicon',
        nodeIcon: '',
        selectedIcon: '',
        checkedIcon: 'glyphicon glyphicon-check',
        uncheckedIcon: 'glyphicon glyphicon-unchecked',

        color: undefined, // '#000000',
        backColor: undefined, // '#FFFFFF',
        borderColor: undefined, // '#dddddd',
        onhoverColor: '#F5F5F5',
        selectedColor: '#FFFFFF',
        selectedBackColor: '#428bca',
        searchResultColor: '#D9534F',
        searchResultBackColor: undefined, //'#FFFFFF',

        enableLinks: false,
        highlightSelected: true,
        highlightSearchResults: true,
        showBorder: true,
        showIcon: true,
        showCheckbox: false,
        checkUIds: {},
        showTags: false,
        multiSelect: false,

        exeDeleteNode: undefined,
        // Event handlers
        onNodeChecked: undefined,
        onNodeCollapsed: undefined,
        onNodeDisabled: undefined,
        onNodeEnabled: undefined,
        onNodeExpanded: undefined,
        onNodeSelected: undefined,
        onNodeUnchecked: undefined,
        onNodeUnselected: undefined,
        onSearchComplete: undefined,
        onSearchCleared: undefined,
        onDeleteNode: undefined,
        onAddNode: undefined,
        onBuildTree: undefined
    };

    _default.options = {
        silent: false,
        ignoreChildren: false
    };

    _default.searchOptions = {
        ignoreCase: true,
        exactMatch: false,
        revealResults: true
    };

    var Tree = function (element, options) {

        this.$element = $(element);
        this.elementId = element.id;
        this.styleId = this.elementId + '-style';
        this.addNodeIndex = 0;//添加node节点的下标
        this.init(options);

        return {

            // Options (public access)
            options: this.options,

            // Initialize / destroy methods
            init: $.proxy(this.init, this),
            remove: $.proxy(this.remove, this),

            // Get methods
            getNode: $.proxy(this.getNode, this),
            getParent: $.proxy(this.getParent, this),
            getSiblings: $.proxy(this.getSiblings, this),
            getSelected: $.proxy(this.getSelected, this),
            getUnselected: $.proxy(this.getUnselected, this),
            getExpanded: $.proxy(this.getExpanded, this),
            getCollapsed: $.proxy(this.getCollapsed, this),
            getChecked: $.proxy(this.getChecked, this),
            getUnchecked: $.proxy(this.getUnchecked, this),
            getDisabled: $.proxy(this.getDisabled, this),
            getEnabled: $.proxy(this.getEnabled, this),

            // Select methods
            selectNode: $.proxy(this.selectNode, this),
            unselectNode: $.proxy(this.unselectNode, this),
            toggleNodeSelected: $.proxy(this.toggleNodeSelected, this),

            // Expand / collapse methods
            collapseAll: $.proxy(this.collapseAll, this),
            collapseNode: $.proxy(this.collapseNode, this),
            expandAll: $.proxy(this.expandAll, this),
            expandNode: $.proxy(this.expandNode, this),
            toggleNodeExpanded: $.proxy(this.toggleNodeExpanded, this),
            revealNode: $.proxy(this.revealNode, this),

            // Expand / collapse methods
            checkAll: $.proxy(this.checkAll, this),
            checkNode: $.proxy(this.checkNode, this),
            uncheckAll: $.proxy(this.uncheckAll, this),
            uncheckNode: $.proxy(this.uncheckNode, this),
            toggleNodeChecked: $.proxy(this.toggleNodeChecked, this),

            // Disable / enable methods
            disableAll: $.proxy(this.disableAll, this),
            disableNode: $.proxy(this.disableNode, this),
            enableAll: $.proxy(this.enableAll, this),
            enableNode: $.proxy(this.enableNode, this),
            toggleNodeDisabled: $.proxy(this.toggleNodeDisabled, this),

            // Search methods
            search: $.proxy(this.search, this),
            clearSearch: $.proxy(this.clearSearch, this)
        };
    };

    Tree.prototype.init = function (options) {

        this.tree = [];
        this.nodes = [];

        if (options.data) {
            if (typeof options.data === 'string') {
                options.data = $.parseJSON(options.data);
            }
            this.tree = $.extend(true, {}, options.data);
            delete options.data;
        }
        if (options.checkUIds) {
            if (typeof options.checkUIds === 'string') {
                options.checkUIds = $.parseJSON(options.checkUIds);
            }
        }
        this.options = $.extend({}, _default.settings, options);
        $.extend(true, _default.settings, options);
        this.destroy();
        this.subscribeEvents();
        this.setInitialStates({nodes: this.tree}, 0);
        this.render();
    };

    Tree.prototype.remove = function () {
        this.destroy();
        $.removeData(this, pluginName);
        $('#' + this.styleId).remove();
    };

    Tree.prototype.destroy = function () {

        if (!this.initialized) return;

        this.$wrapper.remove();
        this.$wrapper = null;

        // Switch off events
        this.unsubscribeEvents();

        // Reset this.initialized flag
        this.initialized = false;
    };

    Tree.prototype.unsubscribeEvents = function () {

        this.$element.off('click');
        this.$element.off('nodeChecked');
        this.$element.off('nodeCollapsed');
        this.$element.off('nodeDisabled');
        this.$element.off('nodeEnabled');
        this.$element.off('nodeExpanded');
        this.$element.off('nodeSelected');
        this.$element.off('nodeUnchecked');
        this.$element.off('nodeUnselected');
        this.$element.off('searchComplete');
        this.$element.off('searchCleared');
    };

    Tree.prototype.subscribeEvents = function () {

        this.unsubscribeEvents();

        this.$element.on('click', $.proxy(this.clickHandler, this));

        if (typeof (this.options.onNodeChecked) === 'function') {
            this.$element.on('nodeChecked', this.options.onNodeChecked);
        }

        if (typeof (this.options.onNodeCollapsed) === 'function') {
            this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
        }

        if (typeof (this.options.onNodeDisabled) === 'function') {
            this.$element.on('nodeDisabled', this.options.onNodeDisabled);
        }

        if (typeof (this.options.onNodeEnabled) === 'function') {
            this.$element.on('nodeEnabled', this.options.onNodeEnabled);
        }

        if (typeof (this.options.onNodeExpanded) === 'function') {
            this.$element.on('nodeExpanded', this.options.onNodeExpanded);
        }

        if (typeof (this.options.onNodeSelected) === 'function') {
            this.$element.on('nodeSelected', this.options.onNodeSelected);
        }

        if (typeof (this.options.onNodeUnchecked) === 'function') {
            this.$element.on('nodeUnchecked', this.options.onNodeUnchecked);
        }

        if (typeof (this.options.onNodeUnselected) === 'function') {
            this.$element.on('nodeUnselected', this.options.onNodeUnselected);
        }

        if (typeof (this.options.onSearchComplete) === 'function') {
            this.$element.on('searchComplete', this.options.onSearchComplete);
        }

        if (typeof (this.options.onSearchCleared) === 'function') {
            this.$element.on('searchCleared', this.options.onSearchCleared);
        }

        if (typeof (this.options.onDeleteNode) === 'function') {
            this.$element.on('deleteNode', this.options.onDeleteNode);
        }

        if (typeof (this.options.onAddNode) === 'function') {
            this.$element.on('addNode', this.options.onAddNode);
        }

        if (typeof (this.options.onBuildTree) === 'function') {
            this.$element.on('buildTree', this.options.onBuildTree);
        }

    };

    /*
     Recurse the tree structure and ensure all nodes have
     valid initial states.  User defined states will be preserved.
     For performance we also take this opportunity to
     index nodes in a flattened structure
     */
    Tree.prototype.setInitialStates = function (node, level) {

        if (!node.nodes) return;
        level += 1;

        var parent = node;
        var _this = this;
        $.each(node.nodes, function checkStates(index, node) {

            // nodeId : unique, incremental identifier
            node.nodeId = _this.nodes.length;

            // parentId : transversing up the tree
            node.parentId = parent.nodeId;

            // if not provided set selectable default value
            if (!node.hasOwnProperty('selectable')) {
                node.selectable = true;
            }

            // where provided we should preserve states
            node.state = node.state || {};

            // set checked state; unless set always false
            if (!node.state.hasOwnProperty('checked')) {
                node.state.checked = false;
            }

            // set enabled state; unless set always false
            if (!node.state.hasOwnProperty('disabled')) {
                node.state.disabled = false;
            }

            // set expanded state; if not provided based on levels
            if (!node.state.hasOwnProperty('expanded')) {
                if (!node.state.disabled &&
                    (level < _this.options.levels) &&
                    (node.nodes && node.nodes.length > 0)) {
                    node.state.expanded = true;
                }
                else {
                    node.state.expanded = false;
                }
            }

            // set selected state; unless set always false
            if (!node.state.hasOwnProperty('selected')) {
                node.state.selected = false;
            }

            // index nodes in a flattened structure for use later
            _this.nodes.push(node);

            // recurse child nodes and transverse the tree
            if (node.nodes) {
                _this.setInitialStates(node, level);
            }
        });
    };

    Tree.prototype.clickHandler = function (event) {
        if (!this.options.enableLinks) event.preventDefault();

        var target = $(event.target);
        var node = this.findNode(target);
        if (!node || node.state.disabled) return;

        var classList = target.attr('class') ? target.attr('class').split(' ') : [];
        if ((classList.indexOf('expand-icon') !== -1)) {
            this.toggleExpandedState(node, _default.options);
            this.render();
        }
        else if ((classList.indexOf('check-icon') !== -1)) {

            this.toggleCheckedState(node, _default.options);
            this.render();
        }
        else if ((classList.indexOf('bt_node_input') !== -1)) {
        }
        else if ((classList.indexOf('bt_node_edit') !== -1)&&this.options.canEditNode) {
            this.editNode(target);
        }
        else if ((classList.indexOf('icon-delete') !== -1)) {
            this.deleteNode(target);//弹出 是 否 按钮
        }
        else if ((classList.indexOf('bt-delete-true') !== -1)) {
            this.deleteNodeTrue(target);
        }
        else if ((classList.indexOf('icon-add') !== -1)) {
            this.addNode(target);
        }
        else {
            if (node.selectable) {
                this.toggleSelectedState(node, _default.options);
            } else {
                this.toggleExpandedState(node, _default.options);
            }

            this.render();
        }
    };

    // Looks up the DOM for the closest parent list item to retrieve the
    // data attribute nodeid, which is used to lookup the node in the flattened structure.
    Tree.prototype.findNode = function (target) {

        var nodeId = target.closest('li.list-group-item').attr('data-nodeid');
        var node = this.nodes[nodeId];

        if (!node) {
            console.log('Error: node does not exist');
        }
        return node;
    };

    Tree.prototype.toggleExpandedState = function (node, options) {
        if (!node) return;
        this.setExpandedState(node, !node.state.expanded, options);
    };

    Tree.prototype.setExpandedState = function (node, state, options) {

        if (state === node.state.expanded) return;

        if (state && node.nodes) {

            // Expand a node
            node.state.expanded = true;
            if (!options.silent) {
                this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
            }
        }
        else if (!state) {

            // Collapse a node
            node.state.expanded = false;
            if (!options.silent) {
                this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
            }

            // Collapse child nodes
            if (node.nodes && !options.ignoreChildren) {
                $.each(node.nodes, $.proxy(function (index, node) {
                    this.setExpandedState(node, false, options);
                }, this));
            }
        }
    };

    Tree.prototype.toggleSelectedState = function (node, options) {
        if (!node) return;
        this.setSelectedState(node, !node.state.selected, options);
    };

    Tree.prototype.setSelectedState = function (node, state, options) {

        if (state === node.state.selected) return;

        if (state) {

            // If multiSelect false, unselect previously selected
            if (!this.options.multiSelect) {
                $.each(this.findNodes('true', 'g', 'state.selected'), $.proxy(function (index, node) {
                    this.setSelectedState(node, false, options);
                }, this));
            }

            // Continue selecting node
            node.state.selected = true;
            if (!options.silent) {
                this.$element.trigger('nodeSelected', $.extend(true, {}, node));
            }
        }
        else {

            // Unselect node
            node.state.selected = false;
            if (!options.silent) {
                this.$element.trigger('nodeUnselected', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.toggleCheckedState = function (node, options) {
        if (!node) return;
        this.setCheckedState(node, !node.state.checked, options);
    };

    Tree.prototype.setCheckedState = function (node, state, options) {

        if (state === node.state.checked) return;

        if (state) {

            // Check node
            node.state.checked = true;

            if (!options.silent) {
                this.$element.trigger('nodeChecked', $.extend(true, {}, node));
            }
        }
        else {

            // Uncheck node
            node.state.checked = false;
            if (!options.silent) {
                this.$element.trigger('nodeUnchecked', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.setDisabledState = function (node, state, options) {

        if (state === node.state.disabled) return;

        if (state) {

            // Disable node
            node.state.disabled = true;

            // Disable all other states
            this.setExpandedState(node, false, options);
            this.setSelectedState(node, false, options);
            this.setCheckedState(node, false, options);

            if (!options.silent) {
                this.$element.trigger('nodeDisabled', $.extend(true, {}, node));
            }
        }
        else {

            // Enabled node
            node.state.disabled = false;
            if (!options.silent) {
                this.$element.trigger('nodeEnabled', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.render = function () {

        if (!this.initialized) {

            // Setup first time only components
            this.$element.addClass(pluginName);
            this.$wrapper = $(this.template.list);

            this.injectStyle();

            this.initialized = true;
        }

        this.$element.empty().append(this.$wrapper.empty());

        // Build tree
        this.buildTree(this.tree, 0);
    };

    // Starting from the root node, and recursing down the
    // structure we build the tree one node at a time
    Tree.prototype.buildTree = function (nodes, level) {

        if (!nodes) return;
        level += 1;

        var _this = this;
        var node;
        $.each(nodes, function addNodes(id, node) {
            if (id == "vm") {
                return;
            }//去掉虚拟节点
            var treeItem = $(_this.template.item)
                .addClass('node-' + _this.elementId)
                .addClass(node.state.checked ? 'node-checked' : '')
                .addClass(node.state.disabled ? 'node-disabled' : '')
                .addClass(node.state.selected ? 'node-selected' : '')
                .addClass(node.searchResult ? 'search-result' : '')
                .attr('data-nodeid', node.nodeId)
                .attr("data-id", id)
                .attr('style', _this.buildStyleOverride(node));

            // Add indent/spacer to mimic tree structure
            for (var i = 0; i < (level - 1); i++) {
                treeItem.append(_this.template.indent);
            }
            var isNodesEmpty = true;
            for (var index in node.nodes) {
                if (index != "vm") {
                    isNodesEmpty = false;
                }
            }
            // Add expand, collapse or empty spacer icons
            var classList = [];
            if (node.nodes && !isNodesEmpty) {
                classList.push('expand-icon');
                if (node.state.expanded) {
                    classList.push(_this.options.collapseIcon);
                }
                else {
                    classList.push(_this.options.expandIcon);
                }
            }
            else {
                //classList.push(_this.options.emptyIcon);
                classList.push(_this.options.collapseIcon);
            }


            treeItem
                .append($(_this.template.icon)
                    .addClass(classList.join(' '))
            );
            if (_this.options.canEditNode) {
                //添加隐藏的input
                var ids = id.split("_");
                var inputName = "columns";
                var idsLen = ids.length;
                for (var ni = 0; ni < idsLen; ni++) {
                    inputName += "[items][" + ids[ni] + "]";
                }
                var uidName = inputName + "[uid]";
                var picName = inputName + "[pic]";
                inputName += "[value]";
                var input = $(_this.template.input);
                input.addClass("hidden")
                    .addClass("bt_node_input")
                    .addClass("bt_node_value")
                    .attr("name", inputName)
                    .attr("data-top",node.state.top?'true':'false')
                    .val(node.text);
                treeItem
                    .append(input);
                if (node.uid) {
                    //添加隐藏的uid input
                    input = $(_this.template.hiddenInput);
                    input.attr("name", uidName).addClass("bt_node_uid")
                        .val(node.uid);
                }
                if (node.pic) {
                    //添加隐藏的pic input
                    input = $(_this.template.hiddenInput);
                    input.attr("name", picName).addClass("bt_node_pic")
                        .val(node.pic);
                }
                treeItem
                    .append(input);
            }

            // Add node icon
            if (_this.options.showIcon) {

                var classList = ['node-icon'];

                classList.push(node.icon || _this.options.nodeIcon);
                if (node.state.selected) {
                    classList.pop();
                    classList.push(node.selectedIcon || _this.options.selectedIcon ||
                        node.icon || _this.options.nodeIcon);
                }

                treeItem
                    .append($(_this.template.icon)
                        .addClass(classList.join(' '))
                );
            }
            if (_this.options.checkUIds && _this.options.checkUIds[node.uid]) {
                if (node["state"]) {
                    node["state"]["checked"] = true;
                    //node["state"]["expanded"] = true;
                }
                else {
                    node["state"] = {};
                    node["state"]["checked"] = true;
                    //node["state"]["expanded"] = true;
                }
            }
            // Add check / unchecked icon
            if (_this.options.showCheckbox) {

                var classList = ['check-icon'];
                //判断uid是否要选中
                if (_this.options.checkUIds) {
                    if (node.state.checked || _this.options.checkUIds[node.uid]) {
                        classList.push(_this.options.checkedIcon);
                    }
                    else {
                        classList.push(_this.options.uncheckedIcon);
                    }
                }
                else {
                    if (node.state.checked) {
                        classList.push(_this.options.checkedIcon);
                    }
                    else {
                        classList.push(_this.options.uncheckedIcon);
                    }
                }


                treeItem
                    .append($(_this.template.icon)
                        .addClass(classList.join(' '))
                );
            }

            // Add text
            if (_this.options.enableLinks) {
                // Add hyperlink
                treeItem
                    .append($(_this.template.link)
                        .attr('href', node.href)
                        .addClass("bt_node_edit")
                        .append(node.text)
                );
            }
            else {
                // otherwise just text
                treeItem
                    .append($(_this.template.text)
                        .addClass("bt_node_edit")
                        .html(node.text)
                );
            }

            // Add tags as badges
            if (_this.options.showTags && node.tags) {
                $.each(node.tags, function addTag(id, tag) {
                    treeItem
                        .append($(_this.template.badge)
                            .append(tag)
                    );
                });
            }
            // Add  tools
            if (_this.options.showTools) {
                treeItem
                    .append(_this.template.toolAdd);
                if(!node.state.unDel){
                    treeItem
                        .append(_this.template.toolDel);
                }
            }

            // Add item to the tree
            _this.$wrapper.append(treeItem);

            // Recursively add child ndoes
            if (node.nodes && node.state.expanded && !node.state.disabled) {
                return _this.buildTree(node.nodes, level);
            }
        });
        this.bindNodeInputsBlurEvent(Tree);
        this.$element.trigger('buildTree', $.extend(true, {}, this.tree));
    };
    Tree.prototype.isNodesEmpty = function (nodes) {
        for (var index in nodes) {
            if (index != "vm") {
                return false;
            }
        }
        return true;
    }
    // Define any node level style override for
    // 1. selectedNode
    // 2. node|data assigned color overrides
    Tree.prototype.buildStyleOverride = function (node) {

        if (node.state.disabled) return '';

        var color = node.color;
        var backColor = node.backColor;

        if (this.options.highlightSelected && node.state.selected) {
            if (this.options.selectedColor) {
                color = this.options.selectedColor;
            }
            if (this.options.selectedBackColor) {
                backColor = this.options.selectedBackColor;
            }
        }

        if (this.options.highlightSearchResults && node.searchResult && !node.state.disabled) {
            if (this.options.searchResultColor) {
                color = this.options.searchResultColor;
            }
            if (this.options.searchResultBackColor) {
                backColor = this.options.searchResultBackColor;
            }
        }

        return 'color:' + color +
            ';background-color:' + backColor + ';';
    };

    // Add inline style into head
    Tree.prototype.injectStyle = function () {

        if (this.options.injectStyle && !document.getElementById(this.styleId)) {
            $('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
        }
    };

    // Construct trees style based on user options
    Tree.prototype.buildStyle = function () {

        var style = '.node-' + this.elementId + '{';

        if (this.options.color) {
            style += 'color:' + this.options.color + ';';
        }

        if (this.options.backColor) {
            style += 'background-color:' + this.options.backColor + ';';
        }

        if (!this.options.showBorder) {
            style += 'border:none;';
        }
        else if (this.options.borderColor) {
            style += 'border:1px solid ' + this.options.borderColor + ';';
        }
        style += '}';

        if (this.options.onhoverColor) {
            style += '.node-' + this.elementId + ':not(.node-disabled):hover{' +
                'background-color:' + this.options.onhoverColor + ';' +
                '}';
        }

        return this.css + style;
    };

    Tree.prototype.template = {
        list: '<ul class="list-group"></ul>',
        item: '<li class="list-group-item"></li>',
        hiddenInput: '<input  type="hidden" >',
        input: '<input  type="text" maxlength="15" required placeholder="' + _default.settings.inputHolder + '">',
        text: '<span></span>',
        indent: '<span class="indent"></span>',
        icon: '<span class="icon"></span>',
        link: '<a href="#" style="color:inherit;"></a>',
        badge: '<span class="badge"></span>',
        toolAdd: '<a href="javascript:;" class="bt_add_sub "  title="添加" style="margin-left: 10px; " ><i class="icon-add" ></i></a>',
        toolDel:'<a href="javascript:;" class="bt_del_sub "  title="删除" style="margin-left: 10px;margin-right: 10px"><i class="icon-delete" ></i>' +
        '<span class="bt_del_btn_tools " style="display: none;">'+
        '<button class="btn btn-primary btn-xs btn-tree-delete  bt-delete-true">是</button>'+
        '<button class="btn btn-default btn-xs btn-tree-delete  bt-delete-false">否</button>'+
        '</span>'+
        '</a>'
    };

    Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}'


    /**
     Returns a single node object that matches the given node id.
     @param {Number} nodeId - A node's unique identifier
     @return {Object} node - Matching node
     */
    Tree.prototype.getNode = function (nodeId) {
        return this.nodes[nodeId];
    };

    /**
     Returns the parent node of a given node, if valid otherwise returns undefined.
     @param {Object|Number} identifier - A valid node or node id
     @returns {Object} node - The parent node
     */
    Tree.prototype.getParent = function (identifier) {
        var node = this.identifyNode(identifier);
        return this.nodes[node.parentId];
    };

    /**
     Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
     @param {Object|Number} identifier - A valid node or node id
     @returns {Array} nodes - Sibling nodes
     */
    Tree.prototype.getSiblings = function (identifier) {
        var node = this.identifyNode(identifier);
        var parent = this.getParent(node);
        var nodes = parent ? parent.nodes : this.tree;
        return nodes.filter(function (obj) {
            return obj.nodeId !== node.nodeId;
        });
    };

    /**
     Returns an array of selected nodes.
     @returns {Array} nodes - Selected nodes
     */
    Tree.prototype.getSelected = function () {
        return this.findNodes('true', 'g', 'state.selected');
    };

    /**
     Returns an array of unselected nodes.
     @returns {Array} nodes - Unselected nodes
     */
    Tree.prototype.getUnselected = function () {
        return this.findNodes('false', 'g', 'state.selected');
    };

    /**
     Returns an array of expanded nodes.
     @returns {Array} nodes - Expanded nodes
     */
    Tree.prototype.getExpanded = function () {
        return this.findNodes('true', 'g', 'state.expanded');
    };

    /**
     Returns an array of collapsed nodes.
     @returns {Array} nodes - Collapsed nodes
     */
    Tree.prototype.getCollapsed = function () {
        return this.findNodes('false', 'g', 'state.expanded');
    };

    /**
     Returns an array of checked nodes.
     @returns {Array} nodes - Checked nodes
     */
    Tree.prototype.getChecked = function () {
        return this.findNodes('true', 'g', 'state.checked');
    };

    /**
     Returns an array of unchecked nodes.
     @returns {Array} nodes - Unchecked nodes
     */
    Tree.prototype.getUnchecked = function () {
        return this.findNodes('false', 'g', 'state.checked');
    };

    /**
     Returns an array of disabled nodes.
     @returns {Array} nodes - Disabled nodes
     */
    Tree.prototype.getDisabled = function () {
        return this.findNodes('true', 'g', 'state.disabled');
    };

    /**
     Returns an array of enabled nodes.
     @returns {Array} nodes - Enabled nodes
     */
    Tree.prototype.getEnabled = function () {
        return this.findNodes('false', 'g', 'state.disabled');
    };


    /**
     Set a node state to selected
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.selectNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setSelectedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Set a node state to unselected
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.unselectNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setSelectedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a node selected state; selecting if unselected, unselecting if selected.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeSelected = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleSelectedState(node, options);
        }, this));

        this.render();
    };


    /**
     Collapse all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.collapseAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.expanded');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Collapse a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.collapseNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Expand all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.expandAll = function (options) {
        options = $.extend({}, _default.options, options);

        if (options && options.levels) {
            this.expandLevels(this.tree, options.levels, options);
        }
        else {
            var identifiers = this.findNodes('false', 'g', 'state.expanded');
            this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
                this.setExpandedState(node, true, options);
            }, this));
        }

        this.render();
    };

    /**
     Expand a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.expandNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, true, options);
            if (node.nodes && (options && options.levels)) {
                this.expandLevels(node.nodes, options.levels - 1, options);
            }
        }, this));

        this.render();
    };

    Tree.prototype.expandLevels = function (nodes, level, options) {
        options = $.extend({}, _default.options, options);

        $.each(nodes, $.proxy(function (index, node) {
            this.setExpandedState(node, (level > 0) ? true : false, options);
            if (node.nodes) {
                this.expandLevels(node.nodes, level - 1, options);
            }
        }, this));
    };

    /**
     Reveals a given tree node, expanding the tree from node to root.
     @param {Object|Number|Array} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.revealNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            var parentNode = this.getParent(node);
            while (parentNode) {
                this.setExpandedState(parentNode, true, options);
                parentNode = this.getParent(parentNode);
            }
            ;
        }, this));

        this.render();
    };

    /**
     Toggles a nodes expanded state; collapsing if expanded, expanding if collapsed.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeExpanded = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleExpandedState(node, options);
        }, this));

        this.render();
    };
    /**
     * 删除节点 弹出 是 否 按钮
     * @param target
     */
    Tree.prototype.deleteNode = function (target) {
        var btns = target.next();
        $(".bt_del_btn_tools").hide();
        btns.fadeToggle('fast');

    };
    /**
     * 删除节点 点击 是 后执行
     * @param target
     */
    Tree.prototype.deleteNodeTrue = function (target) {
        var li = target.parent().parent().parent();
        this.options.exeDeleteNode.call(this,target,li);
    };
    /**
     * 绑定input离开事件
     */
    Tree.prototype.bindNodeInputsBlurEvent = function () {
        var t = this;
        $(".bt_node_input").unbind("blur").bind("blur", function () {
            var input = $(this);
            var par = input.parent();
            var val = input.val();
            var top = input.data("top");
            if (!val) {
                val = _default.settings.inputHolder;
            }
            input.addClass("hidden");
            par.find("span.bt_node_edit").html(val).removeClass("hidden");
            if(top){
                $("#fdName").val(val);
            }
            t.editTreeNode(input.attr("name"), val);
        });
    };

    /**
     * 编辑节点
     * @param target
     */
    Tree.prototype.editNode = function (target) {
        var par = target.parent();
        var input = par.find("input").removeClass("hidden");
        var text = par.find("span.bt_node_edit").addClass("hidden");
        input.val(text.html());
        input.removeClass("hidden");
        text.addClass("hidden");
        input.select();
    };
    /**
     * 添加节点
     * @param target
     */
    Tree.prototype.addNode = function (target) {
        var par = target.parent().parent();
        var id = par.data("id");
        this.addTreeNode(id);
    };
    /**
     * 编辑 tree上的节点
     */
    Tree.prototype.editTreeNode = function (id, value) {
        var input = $("input[name='" + id + "']");
        var par = input.parent();
        var targetNodeId = par.data("id");
        var ids = targetNodeId.split("_");
        var idsLen = ids.length;
        switch (idsLen) {
            case 1:
                this.tree[ids[0]]["text"] = value;
                break;
            case 2:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["text"] = value;
                break;
            case 3:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["text"] = value;
                break;
            case 4:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["text"] = value;
                break;
            case 5:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["text"] = value;
                break;
            case 6:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["text"] = value;
                break;
            case 7:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["text"] = value;
                break;
            case 8:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7]]
                    ["text"] = value;
                break;
            case 9:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]]
                    ["text"] = value;
                break;
            case 10:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8] + "_" + ids[9]]
                    ["text"] = value;
                break;
            default :
                return;
        }
        this.render();
    };
    /**
     * 添加 tree上的节点
     * @param targetNodeId
     */
    Tree.prototype.addTreeNode = function (targetNodeId) {
        var ids = targetNodeId.split("_");
        var indexStr = "";
        var idsLen = ids.length;
        var node = {
            text: _default.settings.inputHolder,
            href: '#',
            tags: ['0'],
            nodes: {},
            state: {
                expanded: true
            }

        };
        var tmp = "";
        switch (idsLen) {
            case 1:
                this.tree[ids[0]]["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 2:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 3:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 4:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 5:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 6:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 7:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 8:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 9:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            case 10:
                this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8] + "_" + ids[9]]
                    ["nodes"][targetNodeId + "_" + this.addNodeIndex++] = node;
                break;
            default :
                return;
        }
        this.setInitialStates({nodes: this.tree}, 0);
        this.render();
    };
    /**
     * 删除 tree上的节点
     * @param targetNodeId
     */
    Tree.prototype.deleteTreeNode = function (targetNodeId) {
        var ids = targetNodeId.split("_");
        var node = this.tree;
        var indexStr = "";
        var idsLen = ids.length;
        switch (idsLen) {
            case 1:
                delete this.tree[ids[0]];
                break;
            case 2:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]];
                break;
            case 3:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]];
                break;
            case 4:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]];
                break;
            case 5:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]];
                break;
            case 6:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]];
                break;
            case 7:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]];
                break;
            case 8:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7]];
                break;
            case 9:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]];
                break;
            case 10:
                delete this.tree[ids[0]]
                    ["nodes"][ids[0] + "_" + ids[1]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8]]
                    ["nodes"][ids[0] + "_" + ids[1] + "_" + ids[2] + "_" + ids[3] + "_" + ids[4] + "_" + ids[5] + "_" + ids[6] + "_" + ids[7] + "_" + ids[8] + "_" + ids[9]];
                break;
            default :
                return;
        }
        this.render();
    };
    /**
     Check all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.checkAll = function (options) {
        var identifiers = this.findNodes('false', 'g', 'state.checked');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Check a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.checkNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Uncheck all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.uncheckAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.checked');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Uncheck a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.uncheckNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a nodes checked state; checking if unchecked, unchecking if checked.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeChecked = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleCheckedState(node, options);
        }, this));

        this.render();
    };


    /**
     Disable all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.disableAll = function (options) {
        var identifiers = this.findNodes('false', 'g', 'state.disabled');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Disable a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.disableNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Enable all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.enableAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.disabled');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Enable a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.enableNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a nodes disabled state; disabling is enabled, enabling if disabled.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeDisabled = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, !node.state.disabled, options);
        }, this));

        this.render();
    };


    /**
     Common code for processing multiple identifiers
     */
    Tree.prototype.forEachIdentifier = function (identifiers, options, callback) {

        options = $.extend({}, _default.options, options);

        if (!(identifiers instanceof Array)) {
            identifiers = [identifiers];
        }

        $.each(identifiers, $.proxy(function (index, identifier) {
            callback(this.identifyNode(identifier), options);
        }, this));
    };

    /*
     Identifies a node from either a node id or object
     */
    Tree.prototype.identifyNode = function (identifier) {
        return ((typeof identifier) === 'number') ?
            this.nodes[identifier] :
            identifier;
    };

    /**
     Searches the tree for nodes (text) that match given criteria
     @param {String} pattern - A given string to match against
     @param {optional Object} options - Search criteria options
     @return {Array} nodes - Matching nodes
     */
    Tree.prototype.search = function (pattern, options) {
        options = $.extend({}, _default.searchOptions, options);

        this.clearSearch({render: false});

        var results = [];
        if (pattern && pattern.length > 0) {

            if (options.exactMatch) {
                pattern = '^' + pattern + '$';
            }

            var modifier = 'g';
            if (options.ignoreCase) {
                modifier += 'i';
            }

            results = this.findNodes(pattern, modifier);

            // Add searchResult property to all matching nodes
            // This will be used to apply custom styles
            // and when identifying result to be cleared
            $.each(results, function (index, node) {
                node.searchResult = true;
            })
        }

        // If revealResults, then render is triggered from revealNode
        // otherwise we just call render.
        if (options.revealResults) {
            this.revealNode(results);
        }
        else {
            this.render();
        }

        this.$element.trigger('searchComplete', $.extend(true, {}, results));

        return results;
    };

    /**
     Clears previous search results
     */
    Tree.prototype.clearSearch = function (options) {

        options = $.extend({}, {render: true}, options);

        var results = $.each(this.findNodes('true', 'g', 'searchResult'), function (index, node) {
            node.searchResult = false;
        });

        if (options.render) {
            this.render();
        }

        this.$element.trigger('searchCleared', $.extend(true, {}, results));
    };

    /**
     Find nodes that match a given criteria
     @param {String} pattern - A given string to match against
     @param {optional String} modifier - Valid RegEx modifiers
     @param {optional String} attribute - Attribute to compare pattern against
     @return {Array} nodes - Nodes that match your criteria
     */
    Tree.prototype.findNodes = function (pattern, modifier, attribute) {

        modifier = modifier || 'g';
        attribute = attribute || 'text';

        var _this = this;
        return $.grep(this.nodes, function (node) {
            var val = _this.getNodeValue(node, attribute);
            if (typeof val === 'string') {
                return val.match(new RegExp(pattern, modifier));
            }
        });
    };

    /**
     Recursive find for retrieving nested attributes values
     All values are return as strings, unless invalid
     @param {Object} obj - Typically a node, could be any object
     @param {String} attr - Identifies an object property using dot notation
     @return {String} value - Matching attributes string representation
     */
    Tree.prototype.getNodeValue = function (obj, attr) {
        var index = attr.indexOf('.');
        if (index > 0) {
            var _obj = obj[attr.substring(0, index)];
            var _attr = attr.substring(index + 1, attr.length);
            return this.getNodeValue(_obj, _attr);
        }
        else {
            if (obj.hasOwnProperty(attr)) {
                return obj[attr].toString();
            }
            else {
                return undefined;
            }
        }
    };

    var logError = function (message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    // Prevent against multiple instantiations,
    // handle updates and method calls
    $.fn[pluginName] = function (options, args) {
        var result;

        this.each(function () {
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                if (!_this) {
                    logError('Not initialized, can not call method : ' + options);
                }
                else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                    logError('No such method : ' + options);
                }
                else {
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    result = _this[options].apply(_this, args);
                }
            }
            else if (typeof options === 'boolean') {
                result = _this;
            }
            else {
                $.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
            }
        });
        return result || this;
    };

})(jQuery, window, document);
