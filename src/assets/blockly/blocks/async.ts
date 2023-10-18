// @ts-nocheck
import BLK from "blockly"
import blockColor from "../config"

const async_f = (Blockly: typeof BLK) => {
    Blockly.Blocks.procedures_defnoreturn = {
        init: function () {
            var a = new Blockly.FieldTextInput("", Blockly.Procedures.rename);
            a.setSpellcheck(!1);
            this.appendDummyInput()
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
                .appendField(a, "NAME").appendField("", "PARAMS");
            this.setMutator(new Blockly.icons.MutatorIcon(["procedures_mutatorarg"], this));
            (this.workspace.options.comments || this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
            // this.setColour(Blockly.Blocks.procedures.HUE);
            this.setColour(blockColor.async)
            this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
            this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
            this.arguments_ = []; this.argumentVarModels_ = [];
            this.setStatements_(!0); this.statementConnection_ = null
        },
        setStatements_: function (a) {
            this.hasStatements_ !== a && (a ? (this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO),
                this.getInput("RETURN") && this.moveInputBefore("STACK", "RETURN")) : this.removeInput("STACK", !0),
                this.hasStatements_ = a)
        },
        updateParams_: function () {
            for (var a = !1, b = {}, c = 0; c < this.arguments_.length; c++) {
                if (b["arg_" + this.arguments_[c].toLowerCase()]) {
                    a = !0;
                    break
                }
                b["arg_" + this.arguments_[c].toLowerCase()] = !0
            }
            a ? this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING) : this.setWarningText(null); a = "";
            this.arguments_.length && (a = Blockly.Msg.PROCEDURES_BEFORE_PARAMS + " " + this.arguments_.join(", "));
            Blockly.Events.disable();
            try {
                this.setFieldValue(a, "PARAMS")
            }
            finally {
                Blockly.Events.enable()
            }
        },
        mutationToDom: function (a) {
            var b = document.createElement("mutation");
            a && b.setAttribute("name", this.getFieldValue("NAME"));
            for (var c = 0; c < this.argumentVarModels_.length; c++) {
                var d = document.createElement("arg"), e = this.argumentVarModels_[c];
                d.setAttribute("name", e.name);
                d.setAttribute("varId", e.getId());
                a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
                b.appendChild(d)
            }
            this.hasStatements_ || b.setAttribute("statements", "false");
            return b
        },
        domToMutation: function (a) {
            this.arguments_ = []; this.argumentVarModels_ = [];
            for (var b = 0, c; c = a.childNodes[b]; b++)
                if ("arg" == c.nodeName.toLowerCase()) {
                    var d = c.getAttribute("name");
                    c = c.getAttribute("varId");
                    this.arguments_.push(d);
                    d = Blockly.Variables.getOrCreateVariablePackage(this.workspace, c, d, "");
                    this.argumentVarModels_.push(d)
                }
            this.updateParams_(); Blockly.Procedures.mutateCallers(this);
            this.setStatements_("false" !== a.getAttribute("statements"))
        },
        decompose: function (a) {
            var b = a.newBlock("procedures_mutatorcontainer");
            b.initSvg(); this.getInput("RETURN") ? b.setFieldValue(this.hasStatements_ ? "TRUE" : "FALSE", "STATEMENTS") : b.getInput("STATEMENT_INPUT").setVisible(!1);
            for (var c = b.getInput("STACK").connection, d = 0; d < this.arguments_.length; d++) {
                var e = a.newBlock("procedures_mutatorarg");
                e.initSvg(); e.setFieldValue(this.arguments_[d], "NAME");
                e.oldLocation = d; c.connect(e.previousConnection);
                c = e.nextConnection
            }
            Blockly.Procedures.mutateCallers(this);
            return b
        },
        compose: function (a) {
            this.arguments_ = [];
            this.paramIds_ = [];
            this.argumentVarModels_ = [];
            for (var b = a.getInputTargetBlock("STACK"); b;) {
                var c = b.getFieldValue("NAME");
                this.arguments_.push(c);
                c = this.workspace.getVariable(c, "");
                this.argumentVarModels_.push(c);
                this.paramIds_.push(b.id);
                b = b.nextConnection && b.nextConnection.targetBlock()
            }
            this.updateParams_();
            Blockly.Procedures.mutateCallers(this);
            a = a.getFieldValue("STATEMENTS");
            if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a))
                if (a)
                    this.setStatements_(!0), Blockly.icons.MutatorIcon.reconnect(this.statementConnection_, this, "STACK"),
                        this.statementConnection_ = null;
                else {
                    a = this.getInput("STACK").connection;
                    if (this.statementConnection_ = a.targetConnection)
                        a = a.targetBlock(), a.unplug(), a.bumpNeighbours_();
                    this.setStatements_(!1)
                }
        },
        getProcedureDef: function () {
            return [this.getFieldValue("NAME"), this.arguments_, !1]
        },
        getVars: function () {
            return this.arguments_
        },
        getVarModels: function () {
            return this.argumentVarModels_
        },
        renameVarById: function (a, b) {
            var c = this.workspace.getVariableById(a);
            if ("" == c.type) {
                c = c.name;
                for (var d = this.workspace.getVariableById(b), e = !1, f = 0; f < this.argumentVarModels_.length; f++)
                    this.argumentVarModels_[f].getId() == a && (this.arguments_[f] = d.name, this.argumentVarModels_[f] = d, e = !0);
                e && this.displayRenamedVar_(c, d.name)
            }
        },
        updateVarName: function (a) {
            for (var b = a.name, c = !1, d = 0; d < this.argumentVarModels_.length; d++)
                if (this.argumentVarModels_[d].getId() == a.getId()) {
                    var e = this.arguments_[d];
                    this.arguments_[d] = b; c = !0
                }
            c && this.displayRenamedVar_(e, b)
        },
        displayRenamedVar_: function (a, b) {
            this.updateParams_();
            if (this.mutator.isVisible())
                for (var c = this.mutator.workspace_.getAllBlocks(), d = 0, e; e = c[d]; d++)
                    "procedures_mutatorarg" == e.type && Blockly.Names.equals(a, e.getFieldValue("NAME")) && e.setFieldValue(b, "NAME")
        },
        customContextMenu: function (a) {
            var b = { enabled: !0 }, c = this.getFieldValue("NAME");
            b.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", c);
            var d = goog.dom.createDom("mutation");
            d.setAttribute("name", c);
            for (var e = 0; e < this.arguments_.length; e++)
                c = goog.dom.createDom("arg"), c.setAttribute("name", this.arguments_[e]), d.appendChild(c);
            d = goog.dom.createDom("block", null, d);
            d.setAttribute("type", this.callType_);
            b.callback = Blockly.ContextMenu.callbackFactory(this, d);
            a.push(b);
            if (!this.isCollapsed())
                for (e = 0; e < this.arguments_.length; e++)
                    b = { enabled: !0 }, c = this.arguments_[e],
                        b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c),
                        d = goog.dom.createDom("field", null, c),
                        d.setAttribute("name", "VAR"),
                        d = goog.dom.createDom("block", null, d),
                        d.setAttribute("type", "variables_get"),
                        b.callback = Blockly.ContextMenu.callbackFactory(this, d),
                        a.push(b)
        },
        callType_: "procedures_callnoreturn"
    };
}

export default async_f
