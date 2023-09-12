Blockly.Blocks['objectContent'] = {
    init: function(){
        this.appendDummyInput()
            .appendField("objectContent")
        this.appendValueInput('key')
            .setCheck(null)
            .appendField('key')
        this.setInputsInline(true);
        this.setOutput(true, null);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setColour("#1E90FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
} 

// Blockly.Blocks['on']

Blockly.Blocks['objectsCreate'] = {
    init:function(){
        // this.setHelpUrl('Blockly.Msg.LISTS_CREATE_WITH_HELPURL');
        this.setColour('#1E90FF');
        this.appendValueInput('title')
            .setCheck(null)
            .appendField('title')
        this.itemCount_=3;
        this.updateShape_();
        // this.setInputsInline(false);
        this.setOutput(!0,"Array");
        this.setMutator(new Blockly.icons.MutatorIcon(["objects_create_with_item"], this));
        // this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
        
    mutationToDom:function(){
        var a=document.createElement("mutation");
        a.setAttribute("items",this.itemCount_);
        return a
    },
    domToMutation:function(a){
        this.itemCount_=parseInt(a.getAttribute("items"),10);
        this.updateShape_()
    },
    decompose:function(a){
        var b=a.newBlock("objects_create_with_container");
        b.initSvg();
        for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
            var e=a.newBlock("objects_create_with_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c=e.nextConnection}
        return b
    },
    compose:function(a){
        var b=a.getInputTargetBlock("STACK");
        for(a=[];b;)
            a.push(b.valueConnection_),b=b.nextConnection&&b.nextConnection.targetBlock();
        for(b=0;b<this.itemCount_;b++){
            var c=this.getInput("ADD"+b).connection.targetConnection;
            c&&-1==a.indexOf(c)&&c.disconnect()
        }
        this.itemCount_=a.length;
        this.updateShape_();
        for(b=0;b<this.itemCount_;b++)
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"ADD"+b)
    },
    saveConnections:function(a){
        a=a.getInputTargetBlock("STACK");
        for(var b=0;a;){
            var c=this.getInput("ADD"+b);
            a.valueConnection_=c&&c.connection.targetConnection;
            b++;
            a=a.nextConnection&&a.nextConnection.targetBlock()
        }
    },
    updateShape_:function(){
        this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField('create empty object');
        for(var a=0;a<this.itemCount_;a++)
            if(!this.getInput("ADD"+a)){
                var b=this.appendValueInput("ADD"+a);
                0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for(;this.getInput("ADD"+a);)
        this.removeInput("ADD"+a),
        a++
    }
};

Blockly.Blocks['DlgObjectsCreate'] = {
    init:function(){
        // this.setHelpUrl('Blockly.Msg.LISTS_CREATE_WITH_HELPURL');
        this.setColour('#1E90FF');
        this.itemCount_=3;
        this.updateShape_();
        // this.setInputsInline(false);
        this.setOutput(!0,"Array");
        this.setMutator(new Blockly.icons.MutatorIcon(["objects_create_with_item"], this));
        // this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
        
    mutationToDom:function(){
        var a=document.createElement("mutation");
        a.setAttribute("items",this.itemCount_);
        return a
    },
    domToMutation:function(a){
        this.itemCount_=parseInt(a.getAttribute("items"),10);
        this.updateShape_()
    },
    decompose:function(a){
        var b=a.newBlock("objects_create_with_container");
        b.initSvg();
        for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
            var e=a.newBlock("objects_create_with_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c=e.nextConnection
        }
        return b
    },
    compose:function(a){
        var b=a.getInputTargetBlock("STACK");
        for(a=[];b;)
            a.push(b.valueConnection_),b=b.nextConnection&&b.nextConnection.targetBlock();
        for(b=0;b<this.itemCount_;b++){
            var c=this.getInput("ADD"+b).connection.targetConnection;
            c&&-1==a.indexOf(c)&&c.disconnect()
        }
        this.itemCount_=a.length;
        this.updateShape_();
        for(b=0;b<this.itemCount_;b++)
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"ADD"+b)
    },
    saveConnections:function(a){
        a=a.getInputTargetBlock("STACK");
        for(var b=0;a;){
            var c=this.getInput("ADD"+b);
            a.valueConnection_=c&&c.connection.targetConnection;
            b++;
            a=a.nextConnection&&a.nextConnection.targetBlock()
        }
    },
    updateShape_:function(){
        this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField('create empty object');
        for(var a=0;a<this.itemCount_;a++)
            if(!this.getInput("ADD"+a)){
                var b=this.appendValueInput("ADD"+a);
                0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for(;this.getInput("ADD"+a);)
        this.removeInput("ADD"+a),
        a++
    }
};

Blockly.Blocks['objects_create_with_item'] = {
    init:function(){
        this.setColour('#1E90FF');
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);this.setNextStatement(!0);
        // this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu=!1
    }
};

Blockly.Blocks['objects_create_with_container']={
    init:function(){
        this.setColour('#1E90FF');
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu=!1
    }
};