Blockly.Blocks['randomfunc'] = {
    init:function(){
        // this.setHelpUrl('Blockly.Msg.LISTS_CREATE_WITH_HELPURL');
        this.appendDummyInput()
          .appendField("randomfunc");
        this.appendValueInput('randomValue')
          .appendField('randomValue')
        this.setColour('#805ba5');
        this.itemCount_=3;
        this.updateShape_();
        // this.setInputsInline(false);
        // this.setOutput(!0,"Array");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setMutator(new Blockly.icons.MutatorIcon(["_create_with_item"], this));
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
        var b=a.newBlock("_create_with_container");
        b.initSvg();
        for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
            var e=a.newBlock("_create_with_item");
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
            var d=this.getInput("func"+b).connection.targetConnection;
            d&&-1==a.indexOf(d)&&d.disconnect()
        }
        this.itemCount_=a.length;
        this.updateShape_();
        for(b=0;b<this.itemCount_;b++)
        {
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"func"+b)
        }
            
    },
    saveConnections:function(a){
        a=a.getInputTargetBlock("STACK");
        for(var b=0;a;){
            var d=this.getInput("func"+b);
            a.valueConnection_=d&&d.connection.targetConnection;
            b++;
            a=a.nextConnection&&a.nextConnection.targetBlock()
        }
    },
    updateShape_:function(){
        this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField('create empty randomfunc');

        for(var a=0;a<this.itemCount_;a++)
            if(!this.getInput("func"+a)){
                var b = this.appendStatementInput("func"+a).appendField('func'+a);
                // 0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for(;this.getInput("func"+a);)
            this.removeInput("func"+a),a++
        
    }
};

Blockly.Blocks['await_keypress'] = {
    init:function(){
        this.appendDummyInput()
            .appendField("awaitKeypress")
        this.appendValueInput('isDestroy')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('isDestroy')
        this.appendStatementInput("complete")
            .appendField('complete')
        this.setColour('#805ba5')
        this.itemCount_=3;
        this.updateShape_()
        // this.setInputsInline(false);
        // this.setOutput(!0,"Array");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setMutator(new Blockly.icons.MutatorIcon(["_create_with_item"], this));
        
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
        var b=a.newBlock("_create_with_container");
        b.initSvg();
        for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
            var e=a.newBlock("_create_with_item");
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
            var c=this.getInput("key"+b).connection.targetConnection;
            var d=this.getInput("func"+b).connection.targetConnection;
            c&&-1==a.indexOf(c)&&c.disconnect()
            d&&-1==a.indexOf(d)&&d.disconnect()
        }
        this.itemCount_=a.length;
        this.updateShape_();
        for(b=0;b<this.itemCount_;b++)
        {
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"key"+b)
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"func"+b)
        }
            
    },
    saveConnections:function(a){
        a=a.getInputTargetBlock("STACK");
        for(var b=0;a;){
            var c=this.getInput("key"+b);
            var d=this.getInput("func"+b);
            a.valueConnection_=c&&c.connection.targetConnection;
            a.valueConnection_=d&&d.connection.targetConnection;
            b++;
            a=a.nextConnection&&a.nextConnection.targetBlock()
        }
    },
    updateShape_:function(){
        this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField('create empty keypress');
        for(var a=0;a<this.itemCount_;a++)
            if(!this.getInput("key"+a)){
                var b=this.appendValueInput("key"+a).setAlign(Blockly.ALIGN_RIGHT).appendField('key'+a);
                var d=this.appendStatementInput("func"+a).appendField('func'+a);
                // 0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for(;this.getInput("key"+a),this.getInput("func"+a);)
            this.removeInput("key"+a),this.removeInput("func"+a),a++
        
    }
};

Blockly.Blocks['keypress'] = {
    init:function(){
        this.appendDummyInput()
            .appendField("keypress")
        this.appendValueInput('isDestroy')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('isDestroy')
        this.appendStatementInput("complete")
            .appendField('complete')
        this.setColour('#805ba5')
        this.itemCount_=3;
        this.updateShape_()
        // this.setInputsInline(false);
        // this.setOutput(!0,"Array");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setMutator(new Blockly.icons.MutatorIcon(["_create_with_item"], this));
        
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
        var b=a.newBlock("_create_with_container");
        b.initSvg();
        for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){
            var e=a.newBlock("_create_with_item");
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
            var c=this.getInput("key"+b).connection.targetConnection;
            var d=this.getInput("func"+b).connection.targetConnection;
            c&&-1==a.indexOf(c)&&c.disconnect()
            d&&-1==a.indexOf(d)&&d.disconnect()
        }
        this.itemCount_=a.length;
        this.updateShape_();
        for(b=0;b<this.itemCount_;b++)
        {
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"key"+b)
            Blockly.icons.MutatorIcon.reconnect(a[b],this,"func"+b)
        }
            
    },
    saveConnections:function(a){
        a=a.getInputTargetBlock("STACK");
        for(var b=0;a;){
            var c=this.getInput("key"+b);
            var d=this.getInput("func"+b);
            a.valueConnection_=c&&c.connection.targetConnection;
            a.valueConnection_=d&&d.connection.targetConnection;
            b++;
            a=a.nextConnection&&a.nextConnection.targetBlock()
        }
    },
    updateShape_:function(){
        this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField('create empty keypress');
        for(var a=0;a<this.itemCount_;a++)
            if(!this.getInput("key"+a)){
                var b=this.appendValueInput("key"+a).setAlign(Blockly.ALIGN_RIGHT).appendField('key'+a);
                var d=this.appendStatementInput("func"+a).appendField('func'+a);
                // 0==a&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for(;this.getInput("key"+a),this.getInput("func"+a);)
            this.removeInput("key"+a),this.removeInput("func"+a),a++
        
    }
};

Blockly.Blocks['_create_with_item'] = {
    init:function(){
        this.setColour('#805ba5');
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);this.setNextStatement(!0);
        // this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu=!1
    }
};

Blockly.Blocks['_create_with_container']={
    init:function(){
        this.setColour('#805ba5');
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu=!1
    }
};