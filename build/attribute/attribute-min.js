YUI.add("attribute",function(B){var J=B.Object,K=".",F="Change",L="get",E="set",I="value",D="clone",M="readOnly",G="writeOnce",C="validator",H;function A(){B.Event.Target.call(this,{emitFacade:true});this._conf=this._conf||new B.State();}A.CLONE={NONE:0,DEEP:1,SHALLOW:2,IMMUTABLE:3};H=A.CLONE;A.prototype={addAtt:function(O,N){var Q,P=(I in N);if(P){Q=N.value;delete N.value;}this._conf.add(O,N);if(P){this.set(O,Q);}},removeAtt:function(N){this._conf.remove(N);},get:function(P){var O=this._conf,Q,N,S,R;if(P.indexOf(K)!==-1){Q=P.split(K);P=Q.shift();}R=O.get(P,I);N=O.get(P,L);S=O.get(P,D);R=(S)?this._cloneAttVal(R,S):R;R=(N)?N.call(this,R):R;R=(Q)?this._getSubAttVal(Q,R):R;return R;},set:function(O,P,N){var U=this._conf,S=U.data,T,V,Q,R=(!S.value||!(O in S.value));if(O.indexOf(K)!==-1){T=O;V=O.split(K);O=V.shift();}if(V&&U.get(O,D)===H.IMMUTABLE){return this;}if(!R){if(U.get(O,G)){return this;}if(U.get(O,M)){return this;}}if(!U.get(O)){}Q=this.get(O);if(V){P=this._setSubAttVal(V,B.clone(Q),P);if(P===undefined){return this;}}this._fireAttChange(O,Q,P,O,T,N);return this;},on:function(){return this.subscribe.apply(this,arguments);},_defAttSet:function(S){var P=this._conf,O=S.attrName,T=S.newVal,R,N=P.get(O,C),Q=P.get(O,E);if(Q){R=Q.call(this,T);if(R!==undefined){T=R;}}if(!N||N.call(this,T)){P.add(O,{value:T});S.newVal=P.get(O,I);}else{S.stopImmediatePropagation();}},_getSubAttVal:function(P,Q){var O=P.length,N;if(O>0){for(N=0;Q!==undefined&&N<O;++N){Q=Q[P[N]];}}return Q;},_setSubAttVal:function(Q,S,P){var O=Q.length-1,N,R;if(O>=0){R=S;for(N=0;R!==undefined&&N<O;++N){R=R[Q[N]];}if(R!==undefined){R[Q[N]]=P;}else{S=undefined;}}return S;},setAtts:function(O){for(var N in O){if(J.owns(O,N)){this.set(N,O[N]);}}},getAtts:function(O){var N={};if(O){N=B.clone(O);}else{B.each(this._conf.get(I),function(Q,P){N[P]=Q;});}return N;},_initAtts:function(N,Q){if(N){var P,S,O,R,T=N;O=this._splitAttVals(Q);for(P in T){if(J.owns(T,P)){S=B.merge(T[P]);R=this._initAttVal(P,S,O);if(R!==undefined){S.value=R;}this.addAtt(P,S);}}}},_splitAttVals:function(Q){var S={},R={},T,N,P;for(var O in Q){if(J.owns(Q,O)){if(O.indexOf(K)!==-1){T=O.split(K);N=T.shift();P=R[N]=R[N]||[];P[P.length]={path:T,value:Q[O]};}else{S[O]=Q[O];}}}return{simple:S,complex:R};},_initAttVal:function(U,S,X){var W=(I in S),O=S.value,N,P,R,Q,Y,V,T;if(!S[M]&&X){N=X.simple;if(N&&J.owns(N,U)){W=true;O=N[U];}P=X.complex;if(P&&J.owns(P,U)){W=true;T=P[U];for(R=0,Q=T.length;R<Q;++R){Y=T[R].path;V=T[R].value;O=this._setSubAttVal(Y,O,V);}}}return O;},_cloneAttVal:function(O,N){switch(N){case H.SHALLOW:O=B.merge(O);break;case H.DEEP:case H.IMMUTABLE:O=B.clone(O);break;}return O;},_fireAttChange:function(Q,S,N,O,T,U,R){Q=Q+F;this.publish(Q,{queuable:false,defaultFn:this._defAttSet});var P={type:Q,prevVal:S,newVal:N,attrName:O,subAttrName:T};if(R){B.mix(P,R);}this.fire(P);}};B.mix(A,B.Event.Target,false,null,1);B.Attribute=A;},"@VERSION@",{requires:["event-target","state"]});YUI.add("state",function(B){var A=B.Lang;B.State=function(){this.data={};};B.State.prototype={add:function(C,D){B.each(D,function(F,E){if(!this.data[E]){this.data[E]={};}this.data[E][C]=F;},this);},remove:function(D,F){var E=this.data,C=function(G){if(E[G]&&(D in E[G])){delete E[G][D];}};if(A.isString(F)){C(F);}else{B.each(F||E,function(H,G){if(A.isString(G)){C(G);}else{C(H);}},this);}},get:function(C,D){var F=this.data;if(D){return F[D]&&F[D][C];}else{var E={};B.each(F,function(H,G){if(C in F[G]){E[G]=H[C];}},this);return E;}},list:function(C,F){var E={},D=this.data,G=!A.isUndefined(F);B.each(this,function(I,H){if(C&&H!==C){return ;}else{if(G&&I!==F){return ;}}E[H]=I;},this);return E;}};},"3.0.0");