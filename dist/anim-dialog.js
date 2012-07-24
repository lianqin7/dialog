define("#dialog/0.9.0/anim-dialog",["./base-dialog","#overlay/0.9.7/mask","#jquery/1.7.2/jquery","#overlay/0.9.7/overlay","#position/0.9.2/position","#iframe-shim/0.9.2/iframe-shim","#widget/0.9.16/widget","#base/0.9.16/base","#class/0.9.2/class","#events/0.9.1/events","#base/0.9.16/aspect","#base/0.9.16/attribute","#widget/0.9.16/daparser","#widget/0.9.16/auto-render","#easing/0.9.3/easing"],function(require,exports,module){function createLayer(elem){this._layer||(this._layer=new Overlay({width:elem.outerWidth(!0),height:elem.outerHeight(!0),zIndex:100,visible:!0,style:{overflow:"hidden"},align:{baseElement:elem[0]}})),this._layer.set("align",this._layer.get("align")).show()}var $=require("#jquery/1.7.2/jquery"),Overlay=require("#overlay/0.9.7/overlay"),easing=require("#easing/0.9.3/easing"),BaseDialog=require("./base-dialog"),AnimDialog=BaseDialog.extend({attrs:{effect:{type:"fade",duration:400,easing:"easeOut",from:"up"},showEffect:{},hideEffect:{}},show:function(){this._rendered||this.render();var elem=this.element,that=this,ef=this.get("showEffect");ef=$.extend(null,this.get("effect"),ef),ef.type==null&&(ef={type:"none"});if(ef.type==="none")elem.show();else if(ef.type==="fade")elem.hide().fadeIn(ef.duration,ef.easing);else if(ef.type==="slide"){var properties=/left|right/i.test(ef.from)?{width:"toggle"}:{height:"toggle"};elem.hide().animate(properties,{duration:ef.duration,easing:ef.easing})}else if(ef.type==="move"){elem.removeAttr("tabindex"),elem.css({display:"block"}),createLayer.call(this,elem);var width=this._layer.get("width"),height=this._layer.get("height"),properties;elem.appendTo(this._layer.element).css({top:0,left:0,display:"block"}),ef.from==="left"?(elem.css("left",0-width),properties={left:"+="+width}):ef.from==="right"?(elem.css("left",width),properties={left:"-="+width}):ef.from==="up"?(elem.css("top",0-height),properties={top:"+="+height}):ef.from==="down"&&(elem.css("top",height),properties={top:"-="+height}),elem.animate(properties,{duration:ef.duration,easing:ef.easing,complete:function(){that.element.appendTo(document.body),that.set("align",that.get("align")),that.set("visible","true"),that._layer.hide(),elem.attr("tabindex","-1"),elem.focus()}})}return this},hide:function(){var elem=this.element,that=this,ef=this.get("hideEffect");ef=$.extend(null,this.get("effect"),ef),ef.type==null&&(ef={type:"none"});if(!ef||ef.type==="none")elem.hide();else if(ef.type==="fade")elem.fadeOut(ef.duration,ef.easing);else if(ef.type==="slide"){var properties=/left|right/i.test(ef.from)?{width:"toggle"}:{height:"toggle"};elem.animate(properties,{duration:ef.duration,easing:ef.easing})}else if(ef.type==="move"){if(elem.css("display")==="none")return;createLayer.call(this,elem);var width=this._layer.get("width"),height=this._layer.get("height"),properties;elem.appendTo(this._layer.element).css({top:0,left:0,display:"block"}),ef.from==="left"?properties={left:"-="+width}:ef.from==="right"?properties={left:"+="+width}:ef.from==="up"?properties={top:"-="+height}:ef.from==="down"&&(properties={top:"+="+height}),elem.animate(properties,{duration:ef.duration,easing:ef.easing,complete:function(){elem.appendTo(document.body),that.set("align",that.get("align")),elem.hide(),that.set("visible",!1),that._layer.hide()}})}return this}});module.exports=AnimDialog});