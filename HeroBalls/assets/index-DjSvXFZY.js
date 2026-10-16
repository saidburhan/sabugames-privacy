(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ka="170",Rc=0,fo=1,Pc=2,Ol=1,Lc=2,cn=3,Rn=0,Re=1,pe=2,wn=0,yi=1,po=2,mo=3,go=4,Ic=5,kn=100,Dc=101,Uc=102,Nc=103,Fc=104,Bc=200,Oc=201,zc=202,Gc=203,jr=204,Qr=205,Hc=206,kc=207,Vc=208,Wc=209,Xc=210,qc=211,Yc=212,Zc=213,$c=214,ta=0,ea=1,na=2,bi=3,ia=4,sa=5,ra=6,aa=7,zl=0,Jc=1,Kc=2,An=0,jc=1,Qc=2,th=3,eh=4,nh=5,ih=6,sh=7,Gl=300,wi=301,Ai=302,oa=303,la=304,lr=306,ca=1e3,Xn=1001,ha=1002,Ne=1003,rh=1004,gs=1005,Je=1006,pr=1007,qn=1008,fn=1009,Hl=1010,kl=1011,os=1012,Va=1013,Zn=1014,Ke=1015,us=1016,Wa=1017,Xa=1018,Ci=1020,Vl=35902,Wl=1021,Xl=1022,qe=1023,ql=1024,Yl=1025,Ei=1026,Ri=1027,qa=1028,Ya=1029,Zl=1030,Za=1031,$a=1033,$s=33776,Js=33777,Ks=33778,js=33779,ua=35840,fa=35841,da=35842,pa=35843,ma=36196,ga=37492,_a=37496,va=37808,xa=37809,Ma=37810,Sa=37811,ya=37812,Ea=37813,Ta=37814,ba=37815,wa=37816,Aa=37817,Ca=37818,Ra=37819,Pa=37820,La=37821,Qs=36492,Ia=36494,Da=36495,$l=36283,Ua=36284,Na=36285,Fa=36286,ah=3200,oh=3201,Jl=0,lh=1,bn="",fe="srgb",Li="srgb-linear",cr="linear",ee="srgb",ti=7680,_o=519,ch=512,hh=513,uh=514,Kl=515,fh=516,dh=517,ph=518,mh=519,vo=35044,xo="300 es",hn=2e3,nr=2001;class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mr=Math.PI/180,Ba=180/Math.PI;function Di(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[s&255]+Me[s>>8&255]+Me[s>>16&255]+Me[s>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function ye(s,t,e){return Math.max(t,Math.min(e,s))}function gh(s,t){return(s%t+t)%t}function gr(s,t,e){return(1-e)*s+e*t}function Gi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ce(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,r,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],_=i[0],m=i[3],d=i[6],b=i[1],E=i[4],M=i[7],N=i[2],R=i[5],A=i[8];return r[0]=a*_+o*b+l*N,r[3]=a*m+o*E+l*R,r[6]=a*d+o*M+l*A,r[1]=c*_+h*b+f*N,r[4]=c*m+h*E+f*R,r[7]=c*d+h*M+f*A,r[2]=u*_+p*b+g*N,r[5]=u*m+p*E+g*R,r[8]=u*d+p*M+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=e*f+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(_r.makeScale(t,e)),this}rotate(t){return this.premultiply(_r.makeRotation(-t)),this}translate(t,e){return this.premultiply(_r.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const _r=new Ot;function jl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ir(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function _h(){const s=ir("canvas");return s.style.display="block",s}const Mo={};function es(s){s in Mo||(Mo[s]=!0,console.warn(s))}function vh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function xh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(s.r=un(s.r),s.g=un(s.g),s.b=un(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bn?cr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function un(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ti(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const So=[.64,.33,.3,.6,.15,.06],yo=[.2126,.7152,.0722],Eo=[.3127,.329],To=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bo=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[Li]:{primaries:So,whitePoint:Eo,transfer:cr,toXYZ:To,fromXYZ:bo,luminanceCoefficients:yo,workingColorSpaceConfig:{unpackColorSpace:fe},outputColorSpaceConfig:{drawingBufferColorSpace:fe}},[fe]:{primaries:So,whitePoint:Eo,transfer:ee,toXYZ:To,fromXYZ:bo,luminanceCoefficients:yo,outputColorSpaceConfig:{drawingBufferColorSpace:fe}}});let ei;class Sh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=ir("canvas")),ei.width=t.width,ei.height=t.height;const n=ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=un(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(un(e[n]/255)*255):e[n]=un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let yh=0;class Ql{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Di(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(vr(i[a].image)):r.push(vr(i[a]))}else r=vr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Sh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eh=0;class Ee extends Ii{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=Xn,i=Xn,r=Je,a=qn,o=qe,l=fn,c=Ee.DEFAULT_ANISOTROPY,h=bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Di(),this.name="",this.source=new Ql(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ca:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case ha:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ca:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case ha:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=Gl;Ee.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,i=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,M=(p+1)/2,N=(d+1)/2,R=(h+u)/4,A=(f+_)/4,P=(g+m)/4;return E>M&&E>N?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=R/n,r=A/n):M>N?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=R/i,r=P/i):N<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(N),n=A/r,i=P/r),this.set(n,i,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Th extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ee(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ql(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends Th{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class tc extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3];const u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==u||c!==p||h!==g){let m=1-o;const d=l*u+c*p+h*g+f*_,b=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const N=Math.sqrt(E),R=Math.atan2(N,d*b);m=Math.sin(m*R)/N,o=Math.sin(o*R)/N}const M=o*b;if(l=l*m+u*M,c=c*m+p*M,h=h*m+g*M,f=f*m+_*M,m===1-o){const N=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=N,c*=N,h*=N,f*=N}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*p-c*u,t[e+1]=l*g+h*u+c*f-o*p,t[e+2]=c*g+h*p+o*u-l*f,t[e+3]=h*g-o*f-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),u=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"YZX":this._x=u*h*f+c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f-u*p*g;break;case"XZY":this._x=u*h*f-c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*f+this._w*u,this._x=n*f+this._x*u,this._y=i*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xr.copy(this).projectOnVector(t),this.sub(xr)}reflect(t){return this.sub(xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xr=new I,wo=new fs;class jn{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ke):ke.fromBufferAttribute(r,a),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(t.matrixWorld),this.union(_s)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hi),vs.subVectors(this.max,Hi),ni.subVectors(t.a,Hi),ii.subVectors(t.b,Hi),si.subVectors(t.c,Hi),vn.subVectors(ii,ni),xn.subVectors(si,ii),Un.subVectors(ni,si);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Un.z,Un.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Un.z,0,-Un.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Un.y,Un.x,0];return!Mr(e,ni,ii,si,vs)||(e=[1,0,0,0,1,0,0,0,1],!Mr(e,ni,ii,si,vs))?!1:(xs.crossVectors(vn,xn),e=[xs.x,xs.y,xs.z],Mr(e,ni,ii,si,vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const sn=[new I,new I,new I,new I,new I,new I,new I,new I],ke=new I,_s=new jn,ni=new I,ii=new I,si=new I,vn=new I,xn=new I,Un=new I,Hi=new I,vs=new I,xs=new I,Nn=new I;function Mr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Nn.fromArray(s,r);const o=i.x*Math.abs(Nn.x)+i.y*Math.abs(Nn.y)+i.z*Math.abs(Nn.z),l=t.dot(Nn),c=e.dot(Nn),h=n.dot(Nn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const wh=new jn,ki=new I,Sr=new I;class Ui{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ki.subVectors(t,this.center);const e=ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ki,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ki.copy(t.center).add(Sr)),this.expandByPoint(ki.copy(t.center).sub(Sr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rn=new I,yr=new I,Ms=new I,Mn=new I,Er=new I,Ss=new I,Tr=new I;class ec{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(rn.copy(this.origin).addScaledVector(this.direction,e),rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){yr.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(yr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ms),o=Mn.dot(this.direction),l=-Mn.dot(Ms),c=Mn.lengthSq(),h=Math.abs(1-a*a);let f,u,p,g;if(h>0)if(f=a*l-o,u=a*o-l,g=r*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,p=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(yr).addScaledVector(Ms,u),p}intersectSphere(t,e){rn.subVectors(t.center,this.origin);const n=rn.dot(this.direction),i=rn.dot(rn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,rn)!==null}intersectTriangle(t,e,n,i,r){Er.subVectors(e,t),Ss.subVectors(n,t),Tr.crossVectors(Er,Ss);let a=this.direction.dot(Tr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,t);const l=o*this.direction.dot(Ss.crossVectors(Mn,Ss));if(l<0)return null;const c=o*this.direction.dot(Er.cross(Mn));if(c<0||l+c>a)return null;const h=-o*Mn.dot(Tr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,i,r,a,o,l,c,h,f,u,p,g,_,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,u,p,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,f,u,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ri.setFromMatrixColumn(t,0).length(),r=1/ri.setFromMatrixColumn(t,1).length(),a=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,p=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,p=l*f,g=c*h,_=c*f;e[0]=u+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,p=l*f,g=c*h,_=c*f;e[0]=u-_*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,p=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*f,e[8]=g*f+p,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*f+g,e[10]=u-_*f}else if(t.order==="XZY"){const u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=a*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ah,t,Ch)}lookAt(t,e,n){const i=this.elements;return Le.subVectors(t,e),Le.lengthSq()===0&&(Le.z=1),Le.normalize(),Sn.crossVectors(n,Le),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Le.x+=1e-4:Le.z+=1e-4,Le.normalize(),Sn.crossVectors(n,Le)),Sn.normalize(),ys.crossVectors(Le,Sn),i[0]=Sn.x,i[4]=ys.x,i[8]=Le.x,i[1]=Sn.y,i[5]=ys.y,i[9]=Le.y,i[2]=Sn.z,i[6]=ys.z,i[10]=Le.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],b=n[3],E=n[7],M=n[11],N=n[15],R=i[0],A=i[4],P=i[8],y=i[12],x=i[1],C=i[5],H=i[9],F=i[13],V=i[2],X=i[6],k=i[10],$=i[14],O=i[3],at=i[7],ut=i[11],vt=i[15];return r[0]=a*R+o*x+l*V+c*O,r[4]=a*A+o*C+l*X+c*at,r[8]=a*P+o*H+l*k+c*ut,r[12]=a*y+o*F+l*$+c*vt,r[1]=h*R+f*x+u*V+p*O,r[5]=h*A+f*C+u*X+p*at,r[9]=h*P+f*H+u*k+p*ut,r[13]=h*y+f*F+u*$+p*vt,r[2]=g*R+_*x+m*V+d*O,r[6]=g*A+_*C+m*X+d*at,r[10]=g*P+_*H+m*k+d*ut,r[14]=g*y+_*F+m*$+d*vt,r[3]=b*R+E*x+M*V+N*O,r[7]=b*A+E*C+M*X+N*at,r[11]=b*P+E*H+M*k+N*ut,r[15]=b*y+E*F+M*$+N*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*f-i*c*f-r*o*u+n*c*u+i*o*p-n*l*p)+_*(+e*l*p-e*c*u+r*a*u-i*a*p+i*c*h-r*l*h)+m*(+e*c*f-e*o*p-r*a*f+n*a*p+r*o*h-n*c*h)+d*(-i*o*h-e*l*f+e*o*u+i*a*f-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],b=f*m*c-_*u*c+_*l*p-o*m*p-f*l*d+o*u*d,E=g*u*c-h*m*c-g*l*p+a*m*p+h*l*d-a*u*d,M=h*_*c-g*f*c+g*o*p-a*_*p-h*o*d+a*f*d,N=g*f*l-h*_*l-g*o*u+a*_*u+h*o*m-a*f*m,R=e*b+n*E+i*M+r*N;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=b*A,t[1]=(_*u*r-f*m*r-_*i*p+n*m*p+f*i*d-n*u*d)*A,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*d+n*l*d)*A,t[3]=(f*l*r-o*u*r-f*i*c+n*u*c+o*i*p-n*l*p)*A,t[4]=E*A,t[5]=(h*m*r-g*u*r+g*i*p-e*m*p-h*i*d+e*u*d)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*d-e*l*d)*A,t[7]=(a*u*r-h*l*r+h*i*c-e*u*c-a*i*p+e*l*p)*A,t[8]=M*A,t[9]=(g*f*r-h*_*r-g*n*p+e*_*p+h*n*d-e*f*d)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*d+e*o*d)*A,t[11]=(h*o*r-a*f*r-h*n*c+e*f*c+a*n*p-e*o*p)*A,t[12]=N*A,t[13]=(h*_*i-g*f*i+g*n*u-e*_*u-h*n*m+e*f*m)*A,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*f*i-h*o*i+h*n*l-e*f*l-a*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,p=r*h,g=r*f,_=a*h,m=a*f,d=o*f,b=l*c,E=l*h,M=l*f,N=n.x,R=n.y,A=n.z;return i[0]=(1-(_+d))*N,i[1]=(p+M)*N,i[2]=(g-E)*N,i[3]=0,i[4]=(p-M)*R,i[5]=(1-(u+d))*R,i[6]=(m+b)*R,i[7]=0,i[8]=(g+E)*A,i[9]=(m-b)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ri.set(i[0],i[1],i[2]).length();const a=ri.set(i[4],i[5],i[6]).length(),o=ri.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ve.copy(this);const c=1/r,h=1/a,f=1/o;return Ve.elements[0]*=c,Ve.elements[1]*=c,Ve.elements[2]*=c,Ve.elements[4]*=h,Ve.elements[5]*=h,Ve.elements[6]*=h,Ve.elements[8]*=f,Ve.elements[9]*=f,Ve.elements[10]*=f,e.setFromRotationMatrix(Ve),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=hn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),f=(e+t)/(e-t),u=(n+i)/(n-i);let p,g;if(o===hn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===nr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=hn){const l=this.elements,c=1/(e-t),h=1/(n-i),f=1/(a-r),u=(e+t)*c,p=(n+i)*h;let g,_;if(o===hn)g=(a+r)*f,_=-2*f;else if(o===nr)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ri=new I,Ve=new ne,Ah=new I(0,0,0),Ch=new I(1,1,1),Sn=new I,ys=new I,Le=new I,Ao=new ne,Co=new fs;class Qe{constructor(t=0,e=0,n=0,i=Qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ao.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ao,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Co.setFromEuler(this),this.setFromQuaternion(Co,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qe.DEFAULT_ORDER="XYZ";class nc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rh=0;const Ro=new I,ai=new fs,an=new ne,Es=new I,Vi=new I,Ph=new I,Lh=new fs,Po=new I(1,0,0),Lo=new I(0,1,0),Io=new I(0,0,1),Do={type:"added"},Ih={type:"removed"},oi={type:"childadded",child:null},br={type:"childremoved",child:null};class ve extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new I,e=new Qe,n=new fs,i=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ne},normalMatrix:{value:new Ot}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(Po,t)}rotateY(t){return this.rotateOnAxis(Lo,t)}rotateZ(t){return this.rotateOnAxis(Io,t)}translateOnAxis(t,e){return Ro.copy(t).applyQuaternion(this.quaternion),this.position.add(Ro.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Po,t)}translateY(t){return this.translateOnAxis(Lo,t)}translateZ(t){return this.translateOnAxis(Io,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Es.copy(t):Es.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Vi,Es,this.up):an.lookAt(Es,Vi,this.up),this.quaternion.setFromRotationMatrix(an),i&&(an.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(an),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Do),oi.child=t,this.dispatchEvent(oi),oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ih),br.child=t,this.dispatchEvent(br),br.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Do),oi.child=t,this.dispatchEvent(oi),oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,t,Ph),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Lh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ve.DEFAULT_UP=new I(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const We=new I,on=new I,wr=new I,ln=new I,li=new I,ci=new I,Uo=new I,Ar=new I,Cr=new I,Rr=new I,Pr=new he,Lr=new he,Ir=new he;class Xe{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),We.subVectors(t,e),i.cross(We);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){We.subVectors(i,e),on.subVectors(n,e),wr.subVectors(t,e);const a=We.dot(We),o=We.dot(on),l=We.dot(wr),c=on.dot(on),h=on.dot(wr),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ln.x),l.addScaledVector(a,ln.y),l.addScaledVector(o,ln.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Pr.setScalar(0),Lr.setScalar(0),Ir.setScalar(0),Pr.fromBufferAttribute(t,e),Lr.fromBufferAttribute(t,n),Ir.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Pr,r.x),a.addScaledVector(Lr,r.y),a.addScaledVector(Ir,r.z),a}static isFrontFacing(t,e,n,i){return We.subVectors(n,e),on.subVectors(t,e),We.cross(on).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return We.subVectors(this.c,this.b),on.subVectors(this.a,this.b),We.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Xe.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Xe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;li.subVectors(i,n),ci.subVectors(r,n),Ar.subVectors(t,n);const l=li.dot(Ar),c=ci.dot(Ar);if(l<=0&&c<=0)return e.copy(n);Cr.subVectors(t,i);const h=li.dot(Cr),f=ci.dot(Cr);if(h>=0&&f<=h)return e.copy(i);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(li,a);Rr.subVectors(t,r);const p=li.dot(Rr),g=ci.dot(Rr);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(ci,o);const m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return Uo.subVectors(r,i),o=(f-h)/(f-h+(p-g)),e.copy(i).addScaledVector(Uo,o);const d=1/(m+_+u);return a=_*d,o=u*d,e.copy(n).addScaledVector(li,a).addScaledVector(ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Dr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Yt.workingColorSpace){if(t=gh(t,1),e=ye(e,0,1),n=ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Dr(a,r,t+1/3),this.g=Dr(a,r,t),this.b=Dr(a,r,t-1/3)}return Yt.toWorkingColorSpace(this,i),this}setStyle(t,e=fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fe){const n=ic[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=un(t.r),this.g=un(t.g),this.b=un(t.b),this}copyLinearToSRGB(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fe){return Yt.fromWorkingColorSpace(Se.copy(this),t),Math.round(ye(Se.r*255,0,255))*65536+Math.round(ye(Se.g*255,0,255))*256+Math.round(ye(Se.b*255,0,255))}getHexString(t=fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,i=Se.g,r=Se.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=fe){Yt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,i=Se.b;return t!==fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(Ts);const n=gr(yn.h,Ts.h,e),i=gr(yn.s,Ts.s,e),r=gr(yn.l,Ts.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new $t;$t.NAMES=ic;let Dh=0;class Ni extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Di(),this.name="",this.blending=yi,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jr,this.blendDst=Qr,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jr&&(n.blendSrc=this.blendSrc),this.blendDst!==Qr&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_o&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Jt extends Ni{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const de=new I,bs=new ot;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vo,this.updateRanges=[],this.gpuType=Ke,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)bs.fromBufferAttribute(this,e),bs.applyMatrix3(t),this.setXY(e,bs.x,bs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix3(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix4(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyNormalMatrix(t),this.setXYZ(e,de.x,de.y,de.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.transformDirection(t),this.setXYZ(e,de.x,de.y,de.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),i=Ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),i=Ce(i,this.array),r=Ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vo&&(t.usage=this.usage),t}}class sc extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class rc extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uh=0;const Be=new ne,Ur=new ve,hi=new I,Ie=new jn,Wi=new jn,_e=new I;class we extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jl(t)?rc:sc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Be.makeRotationFromQuaternion(t),this.applyMatrix4(Be),this}rotateX(t){return Be.makeRotationX(t),this.applyMatrix4(Be),this}rotateY(t){return Be.makeRotationY(t),this.applyMatrix4(Be),this}rotateZ(t){return Be.makeRotationZ(t),this.applyMatrix4(Be),this}translate(t,e,n){return Be.makeTranslation(t,e,n),this.applyMatrix4(Be),this}scale(t,e,n){return Be.makeScale(t,e,n),this.applyMatrix4(Be),this}lookAt(t){return Ur.lookAt(t),Ur.updateMatrix(),this.applyMatrix4(Ur.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ie.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Wi.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(Ie.min,Wi.min),Ie.expandByPoint(_e),_e.addVectors(Ie.max,Wi.max),Ie.expandByPoint(_e)):(Ie.expandByPoint(Wi.min),Ie.expandByPoint(Wi.max))}Ie.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(hi.fromBufferAttribute(t,c),_e.add(hi)),i=Math.max(i,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new I,l[P]=new I;const c=new I,h=new I,f=new I,u=new ot,p=new ot,g=new ot,_=new I,m=new I;function d(P,y,x){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,y),f.fromBufferAttribute(n,x),u.fromBufferAttribute(r,P),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),h.sub(c),f.sub(c),p.sub(u),g.sub(u);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(C),m.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),o[P].add(_),o[y].add(_),o[x].add(_),l[P].add(m),l[y].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,y=b.length;P<y;++P){const x=b[P],C=x.start,H=x.count;for(let F=C,V=C+H;F<V;F+=3)d(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const E=new I,M=new I,N=new I,R=new I;function A(P){N.fromBufferAttribute(i,P),R.copy(N);const y=o[P];E.copy(y),E.sub(N.multiplyScalar(N.dot(y))).normalize(),M.crossVectors(R,y);const C=M.dot(l[P])<0?-1:1;a.setXYZW(P,E.x,E.y,E.z,C)}for(let P=0,y=b.length;P<y;++P){const x=b[P],C=x.start,H=x.count;for(let F=C,V=C+H;F<V;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,f=new I;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let d=0;d<h;d++)u[g++]=c[p++]}return new Ye(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const No=new ne,Fn=new ec,ws=new Ui,Fo=new I,As=new I,Cs=new I,Rs=new I,Nr=new I,Ps=new I,Bo=new I,Ls=new I;class Ht extends ve{constructor(t=new we,e=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(Nr.fromBufferAttribute(f,t),a?Ps.addScaledVector(Nr,h):Ps.addScaledVector(Nr.sub(e),h))}e.add(Ps)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(r),Fn.copy(t.ray).recast(t.near),!(ws.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(ws,Fo)===null||Fn.origin.distanceToSquared(Fo)>(t.far-t.near)**2))&&(No.copy(r).invert(),Fn.copy(t.ray).applyMatrix4(No),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=b,N=E;M<N;M+=3){const R=o.getX(M),A=o.getX(M+1),P=o.getX(M+2);i=Is(this,d,t,n,c,h,f,R,A,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);i=Is(this,a,t,n,c,h,f,b,E,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=b,N=E;M<N;M+=3){const R=M,A=M+1,P=M+2;i=Is(this,d,t,n,c,h,f,R,A,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=m,E=m+1,M=m+2;i=Is(this,a,t,n,c,h,f,b,E,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Nh(s,t,e,n,i,r,a,o){let l;if(t.side===Re?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Rn,o),l===null)return null;Ls.copy(o),Ls.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ls);return c<e.near||c>e.far?null:{distance:c,point:Ls.clone(),object:s}}function Is(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,As),s.getVertexPosition(l,Cs),s.getVertexPosition(c,Rs);const h=Nh(s,t,e,n,As,Cs,Rs,Bo);if(h){const f=new I;Xe.getBarycoord(Bo,As,Cs,Rs,f),i&&(h.uv=Xe.getInterpolatedAttribute(i,o,l,c,f,new ot)),r&&(h.uv1=Xe.getInterpolatedAttribute(r,o,l,c,f,new ot)),a&&(h.normal=Xe.getInterpolatedAttribute(a,o,l,c,f,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new I,materialIndex:0};Xe.getNormal(As,Cs,Rs,u.normal),h.face=u,h.barycoord=f}return h}class Fi extends we{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(f,2));function g(_,m,d,b,E,M,N,R,A,P,y){const x=M/A,C=N/P,H=M/2,F=N/2,V=R/2,X=A+1,k=P+1;let $=0,O=0;const at=new I;for(let ut=0;ut<k;ut++){const vt=ut*C-F;for(let It=0;It<X;It++){const Kt=It*x-H;at[_]=Kt*b,at[m]=vt*E,at[d]=V,c.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[d]=R>0?1:-1,h.push(at.x,at.y,at.z),f.push(It/A),f.push(1-ut/P),$+=1}}for(let ut=0;ut<P;ut++)for(let vt=0;vt<A;vt++){const It=u+vt+X*ut,Kt=u+vt+X*(ut+1),Z=u+(vt+1)+X*(ut+1),nt=u+(vt+1)+X*ut;l.push(It,Kt,nt),l.push(Kt,Z,nt),O+=6}o.addGroup(p,O,y),p+=O,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Pi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function be(s){const t={};for(let e=0;e<s.length;e++){const n=Pi(s[e]);for(const i in n)t[i]=n[i]}return t}function Fh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ac(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const Bh={clone:Pi,merge:be};var Oh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends Ni{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Oh,this.fragmentShader=zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pi(t.uniforms),this.uniformsGroups=Fh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class oc extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new I,Oo=new ot,zo=new ot;class Oe extends oc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ba*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,Oo,zo),e.subVectors(zo,Oo)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(mr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ui=-90,fi=1;class Gh extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Oe(ui,fi,t,e);i.layers=this.layers,this.add(i);const r=new Oe(ui,fi,t,e);r.layers=this.layers,this.add(r);const a=new Oe(ui,fi,t,e);a.layers=this.layers,this.add(a);const o=new Oe(ui,fi,t,e);o.layers=this.layers,this.add(o);const l=new Oe(ui,fi,t,e);l.layers=this.layers,this.add(l);const c=new Oe(ui,fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lc extends Ee{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:wi,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hh extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new lc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Fi(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:wn});r.uniforms.tEquirect.value=e;const a=new Ht(i,r),o=e.minFilter;return e.minFilter===qn&&(e.minFilter=Je),new Gh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Fr=new I,kh=new I,Vh=new Ot;class Gn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fr.subVectors(n,e).cross(kh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Fr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vh.getNormalMatrix(t),i=this.coplanarPoint(Fr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bn=new Ui,Ds=new I;class Ja{constructor(t=new Gn,e=new Gn,n=new Gn,i=new Gn,r=new Gn,a=new Gn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],f=i[6],u=i[7],p=i[8],g=i[9],_=i[10],m=i[11],d=i[12],b=i[13],E=i[14],M=i[15];if(n[0].setComponents(l-r,u-c,m-p,M-d).normalize(),n[1].setComponents(l+r,u+c,m+p,M+d).normalize(),n[2].setComponents(l+a,u+h,m+g,M+b).normalize(),n[3].setComponents(l-a,u-h,m-g,M-b).normalize(),n[4].setComponents(l-o,u-f,m-_,M-E).normalize(),e===hn)n[5].setComponents(l+o,u+f,m+_,M+E).normalize();else if(e===nr)n[5].setComponents(o,f,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(t){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ds.x=i.normal.x>0?t.max.x:t.min.x,Ds.y=i.normal.y>0?t.max.y:t.min.y,Ds.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cc(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Wh(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class je extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,u=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const b=d*u-a;for(let E=0;E<c;E++){const M=E*f-r;g.push(M,-b,0),_.push(0,0,1),m.push(E/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const E=b+c*d,M=b+c*(d+1),N=b+1+c*(d+1),R=b+1+c*d;p.push(E,M,R),p.push(M,N,R)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Yh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,su=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ru=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,au=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,du=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Su="gl_FragColor = linearToOutputTexel( gl_FragColor );",yu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Au=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Cu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ru=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Iu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Du=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ou=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ku=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$u=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ju=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ku=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ju=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,of=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Af=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Of=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,td=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ed=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,id=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ad=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,od=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ld=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ud=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,md=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_d=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Md=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ed=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Td=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:Xh,alphahash_pars_fragment:qh,alphamap_fragment:Yh,alphamap_pars_fragment:Zh,alphatest_fragment:$h,alphatest_pars_fragment:Jh,aomap_fragment:Kh,aomap_pars_fragment:jh,batching_pars_vertex:Qh,batching_vertex:tu,begin_vertex:eu,beginnormal_vertex:nu,bsdfs:iu,iridescence_fragment:su,bumpmap_pars_fragment:ru,clipping_planes_fragment:au,clipping_planes_pars_fragment:ou,clipping_planes_pars_vertex:lu,clipping_planes_vertex:cu,color_fragment:hu,color_pars_fragment:uu,color_pars_vertex:fu,color_vertex:du,common:pu,cube_uv_reflection_fragment:mu,defaultnormal_vertex:gu,displacementmap_pars_vertex:_u,displacementmap_vertex:vu,emissivemap_fragment:xu,emissivemap_pars_fragment:Mu,colorspace_fragment:Su,colorspace_pars_fragment:yu,envmap_fragment:Eu,envmap_common_pars_fragment:Tu,envmap_pars_fragment:bu,envmap_pars_vertex:wu,envmap_physical_pars_fragment:Bu,envmap_vertex:Au,fog_vertex:Cu,fog_pars_vertex:Ru,fog_fragment:Pu,fog_pars_fragment:Lu,gradientmap_pars_fragment:Iu,lightmap_pars_fragment:Du,lights_lambert_fragment:Uu,lights_lambert_pars_fragment:Nu,lights_pars_begin:Fu,lights_toon_fragment:Ou,lights_toon_pars_fragment:zu,lights_phong_fragment:Gu,lights_phong_pars_fragment:Hu,lights_physical_fragment:ku,lights_physical_pars_fragment:Vu,lights_fragment_begin:Wu,lights_fragment_maps:Xu,lights_fragment_end:qu,logdepthbuf_fragment:Yu,logdepthbuf_pars_fragment:Zu,logdepthbuf_pars_vertex:$u,logdepthbuf_vertex:Ju,map_fragment:Ku,map_pars_fragment:ju,map_particle_fragment:Qu,map_particle_pars_fragment:tf,metalnessmap_fragment:ef,metalnessmap_pars_fragment:nf,morphinstance_vertex:sf,morphcolor_vertex:rf,morphnormal_vertex:af,morphtarget_pars_vertex:of,morphtarget_vertex:lf,normal_fragment_begin:cf,normal_fragment_maps:hf,normal_pars_fragment:uf,normal_pars_vertex:ff,normal_vertex:df,normalmap_pars_fragment:pf,clearcoat_normal_fragment_begin:mf,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:_f,iridescence_pars_fragment:vf,opaque_fragment:xf,packing:Mf,premultiplied_alpha_fragment:Sf,project_vertex:yf,dithering_fragment:Ef,dithering_pars_fragment:Tf,roughnessmap_fragment:bf,roughnessmap_pars_fragment:wf,shadowmap_pars_fragment:Af,shadowmap_pars_vertex:Cf,shadowmap_vertex:Rf,shadowmask_pars_fragment:Pf,skinbase_vertex:Lf,skinning_pars_vertex:If,skinning_vertex:Df,skinnormal_vertex:Uf,specularmap_fragment:Nf,specularmap_pars_fragment:Ff,tonemapping_fragment:Bf,tonemapping_pars_fragment:Of,transmission_fragment:zf,transmission_pars_fragment:Gf,uv_pars_fragment:Hf,uv_pars_vertex:kf,uv_vertex:Vf,worldpos_vertex:Wf,background_vert:Xf,background_frag:qf,backgroundCube_vert:Yf,backgroundCube_frag:Zf,cube_vert:$f,cube_frag:Jf,depth_vert:Kf,depth_frag:jf,distanceRGBA_vert:Qf,distanceRGBA_frag:td,equirect_vert:ed,equirect_frag:nd,linedashed_vert:id,linedashed_frag:sd,meshbasic_vert:rd,meshbasic_frag:ad,meshlambert_vert:od,meshlambert_frag:ld,meshmatcap_vert:cd,meshmatcap_frag:hd,meshnormal_vert:ud,meshnormal_frag:fd,meshphong_vert:dd,meshphong_frag:pd,meshphysical_vert:md,meshphysical_frag:gd,meshtoon_vert:_d,meshtoon_frag:vd,points_vert:xd,points_frag:Md,shadow_vert:Sd,shadow_frag:yd,sprite_vert:Ed,sprite_frag:Td},lt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},$e={basic:{uniforms:be([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:be([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:be([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:be([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:be([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:be([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:be([lt.points,lt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:be([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:be([lt.common,lt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:be([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:be([lt.sprite,lt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:be([lt.common,lt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:be([lt.lights,lt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};$e.physical={uniforms:be([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Us={r:0,b:0,g:0},On=new Qe,bd=new ne;function wd(s,t,e,n,i,r,a){const o=new $t(0);let l=r===!0?0:1,c,h,f=null,u=0,p=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function _(b){let E=!1;const M=g(b);M===null?d(o,l):M&&M.isColor&&(d(M,1),E=!0);const N=s.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,a):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(b,E){const M=g(E);M&&(M.isCubeTexture||M.mapping===lr)?(h===void 0&&(h=new Ht(new Fi(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Pi($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),On.copy(E.backgroundRotation),On.x*=-1,On.y*=-1,On.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(bd.makeRotationFromEuler(On)),h.material.toneMapped=Yt.getTransfer(M.colorSpace)!==ee,(f!==M||u!==M.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,f=M,u=M.version,p=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ht(new je(2,2),new Pn({name:"BackgroundMaterial",uniforms:Pi($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(M.colorSpace)!==ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||u!==M.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,f=M,u=M.version,p=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,E){b.getRGB(Us,ac(s)),n.buffers.color.setClear(Us.r,Us.g,Us.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),l=E,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:_,addToRenderList:m}}function Ad(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(x,C,H,F,V){let X=!1;const k=f(F,H,C);r!==k&&(r=k,c(r.object)),X=p(x,F,H,V),X&&g(x,F,H,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(x,C,H,F),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function f(x,C,H){const F=H.wireframe===!0;let V=n[x.id];V===void 0&&(V={},n[x.id]=V);let X=V[C.id];X===void 0&&(X={},V[C.id]=X);let k=X[F];return k===void 0&&(k=u(l()),X[F]=k),k}function u(x){const C=[],H=[],F=[];for(let V=0;V<e;V++)C[V]=0,H[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:F,object:x,attributes:{},index:null}}function p(x,C,H,F){const V=r.attributes,X=C.attributes;let k=0;const $=H.getAttributes();for(const O in $)if($[O].location>=0){const ut=V[O];let vt=X[O];if(vt===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(vt=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(vt=x.instanceColor)),ut===void 0||ut.attribute!==vt||vt&&ut.data!==vt.data)return!0;k++}return r.attributesNum!==k||r.index!==F}function g(x,C,H,F){const V={},X=C.attributes;let k=0;const $=H.getAttributes();for(const O in $)if($[O].location>=0){let ut=X[O];ut===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor));const vt={};vt.attribute=ut,ut&&ut.data&&(vt.data=ut.data),V[O]=vt,k++}r.attributes=V,r.attributesNum=k,r.index=F}function _(){const x=r.newAttributes;for(let C=0,H=x.length;C<H;C++)x[C]=0}function m(x){d(x,0)}function d(x,C){const H=r.newAttributes,F=r.enabledAttributes,V=r.attributeDivisors;H[x]=1,F[x]===0&&(s.enableVertexAttribArray(x),F[x]=1),V[x]!==C&&(s.vertexAttribDivisor(x,C),V[x]=C)}function b(){const x=r.newAttributes,C=r.enabledAttributes;for(let H=0,F=C.length;H<F;H++)C[H]!==x[H]&&(s.disableVertexAttribArray(H),C[H]=0)}function E(x,C,H,F,V,X,k){k===!0?s.vertexAttribIPointer(x,C,H,V,X):s.vertexAttribPointer(x,C,H,F,V,X)}function M(x,C,H,F){_();const V=F.attributes,X=H.getAttributes(),k=C.defaultAttributeValues;for(const $ in X){const O=X[$];if(O.location>=0){let at=V[$];if(at===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(at=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(at=x.instanceColor)),at!==void 0){const ut=at.normalized,vt=at.itemSize,It=t.get(at);if(It===void 0)continue;const Kt=It.buffer,Z=It.type,nt=It.bytesPerElement,St=Z===s.INT||Z===s.UNSIGNED_INT||at.gpuType===Va;if(at.isInterleavedBufferAttribute){const st=at.data,Ct=st.stride,Ut=at.offset;if(st.isInstancedInterleavedBuffer){for(let Lt=0;Lt<O.locationSize;Lt++)d(O.location+Lt,st.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Lt=0;Lt<O.locationSize;Lt++)m(O.location+Lt);s.bindBuffer(s.ARRAY_BUFFER,Kt);for(let Lt=0;Lt<O.locationSize;Lt++)E(O.location+Lt,vt/O.locationSize,Z,ut,Ct*nt,(Ut+vt/O.locationSize*Lt)*nt,St)}else{if(at.isInstancedBufferAttribute){for(let st=0;st<O.locationSize;st++)d(O.location+st,at.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let st=0;st<O.locationSize;st++)m(O.location+st);s.bindBuffer(s.ARRAY_BUFFER,Kt);for(let st=0;st<O.locationSize;st++)E(O.location+st,vt/O.locationSize,Z,ut,vt*nt,vt/O.locationSize*st*nt,St)}}else if(k!==void 0){const ut=k[$];if(ut!==void 0)switch(ut.length){case 2:s.vertexAttrib2fv(O.location,ut);break;case 3:s.vertexAttrib3fv(O.location,ut);break;case 4:s.vertexAttrib4fv(O.location,ut);break;default:s.vertexAttrib1fv(O.location,ut)}}}}b()}function N(){P();for(const x in n){const C=n[x];for(const H in C){const F=C[H];for(const V in F)h(F[V].object),delete F[V];delete C[H]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const H in C){const F=C[H];for(const V in F)h(F[V].object),delete F[V];delete C[H]}delete n[x.id]}function A(x){for(const C in n){const H=n[C];if(H[x.id]===void 0)continue;const F=H[x.id];for(const V in F)h(F[V].object),delete F[V];delete H[x.id]}}function P(){y(),a=!0,r!==i&&(r=i,c(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:y,dispose:N,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Cd(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,f){f!==0&&(s.drawArraysInstanced(n,c,h,f),e.update(h,n,f))}function o(c,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];e.update(p,n,1)}function l(c,h,f,u){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Rd(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==qe&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==fn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ke&&!P)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:N,maxSamples:R}}function Pd(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Gn,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||n!==0||i;return i=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=s.get(f);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,E=b*4;let M=d.clippingState||null;l.value=M,M=h(g,u,E,p);for(let N=0;N!==E;++N)M[N]=e[N];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,M=p;E!==_;++E,M+=4)a.copy(f[E]).applyMatrix4(b,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ld(s){let t=new WeakMap;function e(a,o){return o===oa?a.mapping=wi:o===la&&(a.mapping=Ai),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===oa||o===la)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Hh(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class hc extends oc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Mi=4,Go=[.125,.215,.35,.446,.526,.582],Vn=20,Br=new hc,Ho=new $t;let Or=null,zr=0,Gr=0,Hr=!1;const Hn=(1+Math.sqrt(5))/2,di=1/Hn,ko=[new I(-Hn,di,0),new I(Hn,di,0),new I(-di,0,Hn),new I(di,0,Hn),new I(0,Hn,-di),new I(0,Hn,di),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Vo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Or=this._renderer.getRenderTarget(),zr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Or,zr,Gr),this._renderer.xr.enabled=Hr,t.scissorTest=!1,Ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wi||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Or=this._renderer.getRenderTarget(),zr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:us,format:qe,colorSpace:Li,depthBuffer:!1},i=Wo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wo(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Id(r)),this._blurMaterial=Dd(r,t,e)}return i}_compileMaterial(t){const e=new Ht(this._lodPlanes[0],t);this._renderer.compile(e,Br)}_sceneToCubeUV(t,e,n,i){const o=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(Ho),h.toneMapping=An,h.autoClear=!1;const p=new Jt({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),g=new Ht(new Fi,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Ho),_=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const E=this._cubeSize;Ns(i,b*E,d>2?E:0,E,E),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===wi||t.mapping===Ai;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ht(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ns(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Br)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ko[(i-r-1)%ko.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Ht(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Vn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Vn;m>Vn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vn}`);const d=[];let b=0;for(let A=0;A<Vn;++A){const P=A/_,y=Math.exp(-P*P/2);d.push(y),A===0?b+=y:A<m&&(b+=2*y)}for(let A=0;A<d.length;A++)d[A]=d[A]/b;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-n;const M=this._sizeLods[i],N=3*M*(i>E-Mi?i-E+Mi:0),R=4*(this._cubeSize-M);Ns(e,N,R,3*M,2*M),l.setRenderTarget(e),l.render(f,Br)}}function Id(s){const t=[],e=[],n=[];let i=s;const r=s-Mi+1+Go.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Mi?l=Go[a-s+Mi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,_=3,m=2,d=1,b=new Float32Array(_*g*p),E=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,P=R>2?0:-1,y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(y,_*g*R),E.set(u,m*g*R);const x=[R,R,R,R,R,R];M.set(x,d*g*R)}const N=new we;N.setAttribute("position",new Ye(b,_)),N.setAttribute("uv",new Ye(E,m)),N.setAttribute("faceIndex",new Ye(M,d)),t.push(N),i>Mi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wo(s,t,e){const n=new $n(s,t,e);return n.texture.mapping=lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ns(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Dd(s,t,e){const n=new Float32Array(Vn),i=new I(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Xo(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function qo(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ka(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ud(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===oa||l===la,h=l===wi||l===Ai;if(c||h){let f=t.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Vo(s)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Vo(s)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Nd(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Fd(s,t,e,n){const i={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}u.removeEventListener("dispose",a),delete i[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(f){const u=f.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],s.ARRAY_BUFFER)}}function c(f){const u=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let E=0,M=b.length;E<M;E+=3){const N=b[E+0],R=b[E+1],A=b[E+2];u.push(N,R,R,A,A,N)}}else if(g!==void 0){const b=g.array;_=g.version;for(let E=0,M=b.length/3-1;E<M;E+=3){const N=E+0,R=E+1,A=E+2;u.push(N,R,R,A,A,N)}}else return;const m=new(jl(u)?rc:sc)(u,1);m.version=_;const d=r.get(f);d&&t.remove(d),r.set(f,m)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function Bd(s,t,e){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,p){s.drawElements(n,p,r,u*a),e.update(p,n,1)}function c(u,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,u*a,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function f(u,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<u.length;d++)c(u[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,_,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*_[b];e.update(d,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Od(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function zd(s,t,e){const n=new WeakMap,i=new he;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let x=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var p=x;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let N=o.attributes.position.count*M,R=1;N>t.maxTextureSize&&(R=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const A=new Float32Array(N*R*4*f),P=new tc(A,N,R,f);P.type=Ke,P.needsUpdate=!0;const y=M*4;for(let C=0;C<f;C++){const H=d[C],F=b[C],V=E[C],X=N*R*4*C;for(let k=0;k<H.count;k++){const $=k*y;g===!0&&(i.fromBufferAttribute(H,k),A[X+$+0]=i.x,A[X+$+1]=i.y,A[X+$+2]=i.z,A[X+$+3]=0),_===!0&&(i.fromBufferAttribute(F,k),A[X+$+4]=i.x,A[X+$+5]=i.y,A[X+$+6]=i.z,A[X+$+7]=0),m===!0&&(i.fromBufferAttribute(V,k),A[X+$+8]=i.x,A[X+$+9]=i.y,A[X+$+10]=i.z,A[X+$+11]=V.itemSize===4?i.w:1)}}u={count:f,texture:P,size:new ot(N,R)},n.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Gd(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,f=t.get(l,h);if(i.get(f)!==c&&(t.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return f}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class uc extends Ee{constructor(t,e,n,i,r,a,o,l,c,h=Ei){if(h!==Ei&&h!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ei&&(n=Zn),n===void 0&&h===Ri&&(n=Ci),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ne,this.minFilter=l!==void 0?l:Ne,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const fc=new Ee,Yo=new uc(1,1),dc=new tc,pc=new bh,mc=new lc,Zo=[],$o=[],Jo=new Float32Array(16),Ko=new Float32Array(9),jo=new Float32Array(4);function Bi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Zo[i];if(r===void 0&&(r=new Float32Array(i),Zo[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function me(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ge(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function hr(s,t){let e=$o[t];e===void 0&&(e=new Int32Array(t),$o[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Hd(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function kd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;s.uniform2fv(this.addr,t),ge(e,t)}}function Vd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;s.uniform3fv(this.addr,t),ge(e,t)}}function Wd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;s.uniform4fv(this.addr,t),ge(e,t)}}function Xd(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;jo.set(n),s.uniformMatrix2fv(this.addr,!1,jo),ge(e,n)}}function qd(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ko.set(n),s.uniformMatrix3fv(this.addr,!1,Ko),ge(e,n)}}function Yd(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Jo.set(n),s.uniformMatrix4fv(this.addr,!1,Jo),ge(e,n)}}function Zd(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function $d(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;s.uniform2iv(this.addr,t),ge(e,t)}}function Jd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;s.uniform3iv(this.addr,t),ge(e,t)}}function Kd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;s.uniform4iv(this.addr,t),ge(e,t)}}function jd(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Qd(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;s.uniform2uiv(this.addr,t),ge(e,t)}}function tp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;s.uniform3uiv(this.addr,t),ge(e,t)}}function ep(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;s.uniform4uiv(this.addr,t),ge(e,t)}}function np(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Yo.compareFunction=Kl,r=Yo):r=fc,e.setTexture2D(t||r,i)}function ip(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||pc,i)}function sp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||mc,i)}function rp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||dc,i)}function ap(s){switch(s){case 5126:return Hd;case 35664:return kd;case 35665:return Vd;case 35666:return Wd;case 35674:return Xd;case 35675:return qd;case 35676:return Yd;case 5124:case 35670:return Zd;case 35667:case 35671:return $d;case 35668:case 35672:return Jd;case 35669:case 35673:return Kd;case 5125:return jd;case 36294:return Qd;case 36295:return tp;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return np;case 35679:case 36299:case 36307:return ip;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return rp}}function op(s,t){s.uniform1fv(this.addr,t)}function lp(s,t){const e=Bi(t,this.size,2);s.uniform2fv(this.addr,e)}function cp(s,t){const e=Bi(t,this.size,3);s.uniform3fv(this.addr,e)}function hp(s,t){const e=Bi(t,this.size,4);s.uniform4fv(this.addr,e)}function up(s,t){const e=Bi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function fp(s,t){const e=Bi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function dp(s,t){const e=Bi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function pp(s,t){s.uniform1iv(this.addr,t)}function mp(s,t){s.uniform2iv(this.addr,t)}function gp(s,t){s.uniform3iv(this.addr,t)}function _p(s,t){s.uniform4iv(this.addr,t)}function vp(s,t){s.uniform1uiv(this.addr,t)}function xp(s,t){s.uniform2uiv(this.addr,t)}function Mp(s,t){s.uniform3uiv(this.addr,t)}function Sp(s,t){s.uniform4uiv(this.addr,t)}function yp(s,t,e){const n=this.cache,i=t.length,r=hr(e,i);me(n,r)||(s.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||fc,r[a])}function Ep(s,t,e){const n=this.cache,i=t.length,r=hr(e,i);me(n,r)||(s.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||pc,r[a])}function Tp(s,t,e){const n=this.cache,i=t.length,r=hr(e,i);me(n,r)||(s.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||mc,r[a])}function bp(s,t,e){const n=this.cache,i=t.length,r=hr(e,i);me(n,r)||(s.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||dc,r[a])}function wp(s){switch(s){case 5126:return op;case 35664:return lp;case 35665:return cp;case 35666:return hp;case 35674:return up;case 35675:return fp;case 35676:return dp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return _p;case 5125:return vp;case 36294:return xp;case 36295:return Mp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return Tp;case 36289:case 36303:case 36311:case 36292:return bp}}class Ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ap(e.type)}}class Cp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wp(e.type)}}class Rp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function Qo(s,t){s.seq.push(t),s.map[t.id]=t}function Pp(s,t,e){const n=s.name,i=n.length;for(kr.lastIndex=0;;){const r=kr.exec(n),a=kr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Qo(e,c===void 0?new Ap(o,s,t):new Cp(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Rp(o),Qo(e,f)),e=f}}}class tr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Pp(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function tl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Lp=37297;let Ip=0;function Dp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const el=new Ot;function Up(s){Yt._getMatrix(el,Yt.workingColorSpace,s);const t=`mat3( ${el.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(s)){case cr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function nl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Dp(s.getShaderSource(t),a)}else return i}function Np(s,t){const e=Up(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fp(s,t){let e;switch(t){case jc:e="Linear";break;case Qc:e="Reinhard";break;case th:e="Cineon";break;case eh:e="ACESFilmic";break;case ih:e="AgX";break;case sh:e="Neutral";break;case nh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fs=new I;function Bp(){Yt.getLuminanceCoefficients(Fs);const s=Fs.x.toFixed(4),t=Fs.y.toFixed(4),e=Fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Op(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function zp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gp(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function ns(s){return s!==""}function il(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(s){return s.replace(Hp,Vp)}const kp=new Map;function Vp(s,t){let e=Gt[t];if(e===void 0){const n=kp.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oa(e)}const Wp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rl(s){return s.replace(Wp,Xp)}function Xp(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function al(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function qp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ol?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===cn&&(t="SHADOWMAP_TYPE_VSM"),t}function Yp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case wi:case Ai:t="ENVMAP_TYPE_CUBE";break;case lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ai:t="ENVMAP_MODE_REFRACTION";break}return t}function $p(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case zl:t="ENVMAP_BLENDING_MULTIPLY";break;case Jc:t="ENVMAP_BLENDING_MIX";break;case Kc:t="ENVMAP_BLENDING_ADD";break}return t}function Jp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Kp(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qp(e),c=Yp(e),h=Zp(e),f=$p(e),u=Jp(e),p=Op(e),g=zp(r),_=i.createProgram();let m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),d.length>0&&(d+=`
`)):(m=[al(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),d=[al(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Gt.tonemapping_pars_fragment:"",e.toneMapping!==An?Fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,Np("linearToOutputTexel",e.outputColorSpace),Bp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ns).join(`
`)),a=Oa(a),a=il(a,e),a=sl(a,e),o=Oa(o),o=il(o,e),o=sl(o,e),a=rl(a),o=rl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=b+m+a,M=b+d+o,N=tl(i,i.VERTEX_SHADER,E),R=tl(i,i.FRAGMENT_SHADER,M);i.attachShader(_,N),i.attachShader(_,R),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(C){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(N).trim(),V=i.getShaderInfoLog(R).trim();let X=!0,k=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,N,R);else{const $=nl(i,N,"vertex"),O=nl(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+$+`
`+O)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(F===""||V==="")&&(k=!1);k&&(C.diagnostics={runnable:X,programLog:H,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:d}})}i.deleteShader(N),i.deleteShader(R),P=new tr(i,_),y=Gp(i,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,Lp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ip++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=R,this}let jp=0;class Qp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tm(t),e.set(t,n)),n}}class tm{constructor(t){this.id=jp++,this.code=t,this.usedTimes=0}}function em(s,t,e,n,i,r,a){const o=new nc,l=new Qp,c=new Set,h=[],f=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,x,C,H,F){const V=H.fog,X=F.geometry,k=y.isMeshStandardMaterial?H.environment:null,$=(y.isMeshStandardMaterial?e:t).get(y.envMap||k),O=$&&$.mapping===lr?$.image.height:null,at=g[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ut=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,vt=ut!==void 0?ut.length:0;let It=0;X.morphAttributes.position!==void 0&&(It=1),X.morphAttributes.normal!==void 0&&(It=2),X.morphAttributes.color!==void 0&&(It=3);let Kt,Z,nt,St;if(at){const te=$e[at];Kt=te.vertexShader,Z=te.fragmentShader}else Kt=y.vertexShader,Z=y.fragmentShader,l.update(y),nt=l.getVertexShaderID(y),St=l.getFragmentShaderID(y);const st=s.getRenderTarget(),Ct=s.state.buffers.depth.getReversed(),Ut=F.isInstancedMesh===!0,Lt=F.isBatchedMesh===!0,Xt=!!y.map,K=!!y.matcap,et=!!$,w=!!y.aoMap,wt=!!y.lightMap,Q=!!y.bumpMap,_t=!!y.normalMap,rt=!!y.displacementMap,Rt=!!y.emissiveMap,mt=!!y.metalnessMap,T=!!y.roughnessMap,v=y.anisotropy>0,B=y.clearcoat>0,q=y.dispersion>0,j=y.iridescence>0,Y=y.sheen>0,yt=y.transmission>0,ct=v&&!!y.anisotropyMap,gt=B&&!!y.clearcoatMap,kt=B&&!!y.clearcoatNormalMap,tt=B&&!!y.clearcoatRoughnessMap,xt=j&&!!y.iridescenceMap,Pt=j&&!!y.iridescenceThicknessMap,Dt=Y&&!!y.sheenColorMap,Mt=Y&&!!y.sheenRoughnessMap,Wt=!!y.specularMap,zt=!!y.specularColorMap,ie=!!y.specularIntensityMap,L=yt&&!!y.transmissionMap,ht=yt&&!!y.thicknessMap,W=!!y.gradientMap,J=!!y.alphaMap,pt=y.alphaTest>0,ft=!!y.alphaHash,Ft=!!y.extensions;let ce=An;y.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ce=s.toneMapping);const xe={shaderID:at,shaderType:y.type,shaderName:y.name,vertexShader:Kt,fragmentShader:Z,defines:y.defines,customVertexShaderID:nt,customFragmentShaderID:St,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Lt,batchingColor:Lt&&F._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&F.instanceColor!==null,instancingMorph:Ut&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:st===null?s.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Li,alphaToCoverage:!!y.alphaToCoverage,map:Xt,matcap:K,envMap:et,envMapMode:et&&$.mapping,envMapCubeUVHeight:O,aoMap:w,lightMap:wt,bumpMap:Q,normalMap:_t,displacementMap:u&&rt,emissiveMap:Rt,normalMapObjectSpace:_t&&y.normalMapType===lh,normalMapTangentSpace:_t&&y.normalMapType===Jl,metalnessMap:mt,roughnessMap:T,anisotropy:v,anisotropyMap:ct,clearcoat:B,clearcoatMap:gt,clearcoatNormalMap:kt,clearcoatRoughnessMap:tt,dispersion:q,iridescence:j,iridescenceMap:xt,iridescenceThicknessMap:Pt,sheen:Y,sheenColorMap:Dt,sheenRoughnessMap:Mt,specularMap:Wt,specularColorMap:zt,specularIntensityMap:ie,transmission:yt,transmissionMap:L,thicknessMap:ht,gradientMap:W,opaque:y.transparent===!1&&y.blending===yi&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:pt,alphaHash:ft,combine:y.combine,mapUv:Xt&&_(y.map.channel),aoMapUv:w&&_(y.aoMap.channel),lightMapUv:wt&&_(y.lightMap.channel),bumpMapUv:Q&&_(y.bumpMap.channel),normalMapUv:_t&&_(y.normalMap.channel),displacementMapUv:rt&&_(y.displacementMap.channel),emissiveMapUv:Rt&&_(y.emissiveMap.channel),metalnessMapUv:mt&&_(y.metalnessMap.channel),roughnessMapUv:T&&_(y.roughnessMap.channel),anisotropyMapUv:ct&&_(y.anisotropyMap.channel),clearcoatMapUv:gt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:kt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(y.sheenRoughnessMap.channel),specularMapUv:Wt&&_(y.specularMap.channel),specularColorMapUv:zt&&_(y.specularColorMap.channel),specularIntensityMapUv:ie&&_(y.specularIntensityMap.channel),transmissionMapUv:L&&_(y.transmissionMap.channel),thicknessMapUv:ht&&_(y.thicknessMap.channel),alphaMapUv:J&&_(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(_t||v),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Xt||J),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Ct,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:It,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:ce,decodeVideoTexture:Xt&&y.map.isVideoTexture===!0&&Yt.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:Rt&&y.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===pe,flipSided:y.side===Re,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ft&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&y.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return xe.vertexUv1s=c.has(1),xe.vertexUv2s=c.has(2),xe.vertexUv3s=c.has(3),c.clear(),xe}function d(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)x.push(C),x.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(b(x,y),E(x,y),x.push(s.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function b(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function E(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const x=g[y.type];let C;if(x){const H=$e[x];C=Bh.clone(H.uniforms)}else C=y.uniforms;return C}function N(y,x){let C;for(let H=0,F=h.length;H<F;H++){const V=h[H];if(V.cacheKey===x){C=V,++C.usedTimes;break}}return C===void 0&&(C=new Kp(s,x,y,r),h.push(C)),C}function R(y){if(--y.usedTimes===0){const x=h.indexOf(y);h[x]=h[h.length-1],h.pop(),y.destroy()}}function A(y){l.remove(y)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:N,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:P}}function nm(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function im(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ol(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ll(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(f,u,p,g,_,m){let d=s[t];return d===void 0?(d={id:f.id,object:f,geometry:u,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},s[t]=d):(d.id=f.id,d.object=f,d.geometry=u,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function o(f,u,p,g,_,m){const d=a(f,u,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):e.push(d)}function l(f,u,p,g,_,m){const d=a(f,u,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):e.unshift(d)}function c(f,u){e.length>1&&e.sort(f||im),n.length>1&&n.sort(u||ol),i.length>1&&i.sort(u||ol)}function h(){for(let f=t,u=s.length;f<u;f++){const p=s[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function sm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new ll,s.set(n,[a])):i>=r.length?(a=new ll,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function rm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new $t};break;case"SpotLight":e={position:new I,direction:new I,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function am(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let om=0;function lm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function cm(s){const t=new rm,e=am(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new ne,a=new ne;function o(c){let h=0,f=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,b=0,E=0,M=0,N=0,R=0,A=0;c.sort(lm);for(let y=0,x=c.length;y<x;y++){const C=c[y],H=C.color,F=C.intensity,V=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=H.r*F,f+=H.g*F,u+=H.b*F;else if(C.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(C.sh.coefficients[k],F);A++}else if(C.isDirectionalLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const $=C.shadow,O=e.get(C);O.shadowIntensity=$.intensity,O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,n.directionalShadow[p]=O,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=C.shadow.matrix,b++}n.directional[p]=k,p++}else if(C.isSpotLight){const k=t.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(H).multiplyScalar(F),k.distance=V,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,n.spot[_]=k;const $=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,$.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=$.matrix,C.castShadow){const O=e.get(C);O.shadowIntensity=$.intensity,O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=X,M++}_++}else if(C.isRectAreaLight){const k=t.get(C);k.color.copy(H).multiplyScalar(F),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=k,m++}else if(C.isPointLight){const k=t.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const $=C.shadow,O=e.get(C);O.shadowIntensity=$.intensity,O.shadowBias=$.bias,O.shadowNormalBias=$.normalBias,O.shadowRadius=$.radius,O.shadowMapSize=$.mapSize,O.shadowCameraNear=$.camera.near,O.shadowCameraFar=$.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=k,g++}else if(C.isHemisphereLight){const k=t.get(C);k.skyColor.copy(C.color).multiplyScalar(F),k.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[d]=k,d++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=lt.LTC_FLOAT_1,n.rectAreaLTC2=lt.LTC_FLOAT_2):(n.rectAreaLTC1=lt.LTC_HALF_1,n.rectAreaLTC2=lt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==b||P.numPointShadows!==E||P.numSpotShadows!==M||P.numSpotMaps!==N||P.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+N-R,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=b,P.numPointShadows=E,P.numSpotShadows=M,P.numSpotMaps=N,P.numLightProbes=A,n.version=om++)}function l(c,h){let f=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){const E=c[d];if(E.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),f++}else if(E.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function cl(s){const t=new cm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function hm(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new cl(s),t.set(i,[o])):r>=a.length?(o=new cl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class um extends Ni{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fm extends Ni{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const dm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mm(s,t,e){let n=new Ja;const i=new ot,r=new ot,a=new he,o=new um({depthPacking:oh}),l=new fm,c={},h=e.maxTextureSize,f={[Rn]:Re,[Re]:Rn,[pe]:pe},u=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:dm,fragmentShader:pm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new we;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ht(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ol;let d=this.type;this.render=function(R,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=s.getRenderTarget(),x=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),H=s.state;H.setBlending(wn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const F=d!==cn&&this.type===cn,V=d===cn&&this.type!==cn;for(let X=0,k=R.length;X<k;X++){const $=R[X],O=$.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const at=O.getFrameExtents();if(i.multiply(at),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/at.x),i.x=r.x*at.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/at.y),i.y=r.y*at.y,O.mapSize.y=r.y)),O.map===null||F===!0||V===!0){const vt=this.type!==cn?{minFilter:Ne,magFilter:Ne}:{};O.map!==null&&O.map.dispose(),O.map=new $n(i.x,i.y,vt),O.map.texture.name=$.name+".shadowMap",O.camera.updateProjectionMatrix()}s.setRenderTarget(O.map),s.clear();const ut=O.getViewportCount();for(let vt=0;vt<ut;vt++){const It=O.getViewport(vt);a.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),H.viewport(a),O.updateMatrices($,vt),n=O.getFrustum(),M(A,P,O.camera,$,this.type)}O.isPointLightShadow!==!0&&this.type===cn&&b(O,P),O.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(y,x,C)};function b(R,A){const P=t.update(_);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new $n(i.x,i.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,P,u,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,P,p,_,null)}function E(R,A,P,y){let x=null;const C=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)x=C;else if(x=P.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=x.uuid,F=A.uuid;let V=c[H];V===void 0&&(V={},c[H]=V);let X=V[F];X===void 0&&(X=x.clone(),V[F]=X,A.addEventListener("dispose",N)),x=X}if(x.visible=A.visible,x.wireframe=A.wireframe,y===cn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:f[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const H=s.properties.get(x);H.light=P}return x}function M(R,A,P,y,x){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===cn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const F=t.update(R),V=R.material;if(Array.isArray(V)){const X=F.groups;for(let k=0,$=X.length;k<$;k++){const O=X[k],at=V[O.materialIndex];if(at&&at.visible){const ut=E(R,at,y,x);R.onBeforeShadow(s,R,A,P,F,ut,O),s.renderBufferDirect(P,null,F,ut,R,O),R.onAfterShadow(s,R,A,P,F,ut,O)}}}else if(V.visible){const X=E(R,V,y,x);R.onBeforeShadow(s,R,A,P,F,X,null),s.renderBufferDirect(P,null,F,X,R,null),R.onAfterShadow(s,R,A,P,F,X,null)}}const H=R.children;for(let F=0,V=H.length;F<V;F++)M(H[F],A,P,y,x)}function N(R){R.target.removeEventListener("dispose",N);for(const P in c){const y=c[P],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const gm={[ta]:ea,[na]:ra,[ia]:aa,[bi]:sa,[ea]:ta,[ra]:na,[aa]:ia,[sa]:bi};function _m(s,t){function e(){let L=!1;const ht=new he;let W=null;const J=new he(0,0,0,0);return{setMask:function(pt){W!==pt&&!L&&(s.colorMask(pt,pt,pt,pt),W=pt)},setLocked:function(pt){L=pt},setClear:function(pt,ft,Ft,ce,xe){xe===!0&&(pt*=ce,ft*=ce,Ft*=ce),ht.set(pt,ft,Ft,ce),J.equals(ht)===!1&&(s.clearColor(pt,ft,Ft,ce),J.copy(ht))},reset:function(){L=!1,W=null,J.set(-1,0,0,0)}}}function n(){let L=!1,ht=!1,W=null,J=null,pt=null;return{setReversed:function(ft){if(ht!==ft){const Ft=t.get("EXT_clip_control");ht?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const ce=pt;pt=null,this.setClear(ce)}ht=ft},getReversed:function(){return ht},setTest:function(ft){ft?st(s.DEPTH_TEST):Ct(s.DEPTH_TEST)},setMask:function(ft){W!==ft&&!L&&(s.depthMask(ft),W=ft)},setFunc:function(ft){if(ht&&(ft=gm[ft]),J!==ft){switch(ft){case ta:s.depthFunc(s.NEVER);break;case ea:s.depthFunc(s.ALWAYS);break;case na:s.depthFunc(s.LESS);break;case bi:s.depthFunc(s.LEQUAL);break;case ia:s.depthFunc(s.EQUAL);break;case sa:s.depthFunc(s.GEQUAL);break;case ra:s.depthFunc(s.GREATER);break;case aa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=ft}},setLocked:function(ft){L=ft},setClear:function(ft){pt!==ft&&(ht&&(ft=1-ft),s.clearDepth(ft),pt=ft)},reset:function(){L=!1,W=null,J=null,pt=null,ht=!1}}}function i(){let L=!1,ht=null,W=null,J=null,pt=null,ft=null,Ft=null,ce=null,xe=null;return{setTest:function(te){L||(te?st(s.STENCIL_TEST):Ct(s.STENCIL_TEST))},setMask:function(te){ht!==te&&!L&&(s.stencilMask(te),ht=te)},setFunc:function(te,Ge,en){(W!==te||J!==Ge||pt!==en)&&(s.stencilFunc(te,Ge,en),W=te,J=Ge,pt=en)},setOp:function(te,Ge,en){(ft!==te||Ft!==Ge||ce!==en)&&(s.stencilOp(te,Ge,en),ft=te,Ft=Ge,ce=en)},setLocked:function(te){L=te},setClear:function(te){xe!==te&&(s.clearStencil(te),xe=te)},reset:function(){L=!1,ht=null,W=null,J=null,pt=null,ft=null,Ft=null,ce=null,xe=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},f={},u=new WeakMap,p=[],g=null,_=!1,m=null,d=null,b=null,E=null,M=null,N=null,R=null,A=new $t(0,0,0),P=0,y=!1,x=null,C=null,H=null,F=null,V=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,$=0;const O=s.getParameter(s.VERSION);O.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(O)[1]),k=$>=1):O.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),k=$>=2);let at=null,ut={};const vt=s.getParameter(s.SCISSOR_BOX),It=s.getParameter(s.VIEWPORT),Kt=new he().fromArray(vt),Z=new he().fromArray(It);function nt(L,ht,W,J){const pt=new Uint8Array(4),ft=s.createTexture();s.bindTexture(L,ft),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ft=0;Ft<W;Ft++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(ht,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ht+Ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return ft}const St={};St[s.TEXTURE_2D]=nt(s.TEXTURE_2D,s.TEXTURE_2D,1),St[s.TEXTURE_CUBE_MAP]=nt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[s.TEXTURE_2D_ARRAY]=nt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),St[s.TEXTURE_3D]=nt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(s.DEPTH_TEST),a.setFunc(bi),Q(!1),_t(fo),st(s.CULL_FACE),w(wn);function st(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Ct(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Ut(L,ht){return f[L]!==ht?(s.bindFramebuffer(L,ht),f[L]=ht,L===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=ht),L===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=ht),!0):!1}function Lt(L,ht){let W=p,J=!1;if(L){W=u.get(ht),W===void 0&&(W=[],u.set(ht,W));const pt=L.textures;if(W.length!==pt.length||W[0]!==s.COLOR_ATTACHMENT0){for(let ft=0,Ft=pt.length;ft<Ft;ft++)W[ft]=s.COLOR_ATTACHMENT0+ft;W.length=pt.length,J=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,J=!0);J&&s.drawBuffers(W)}function Xt(L){return g!==L?(s.useProgram(L),g=L,!0):!1}const K={[kn]:s.FUNC_ADD,[Dc]:s.FUNC_SUBTRACT,[Uc]:s.FUNC_REVERSE_SUBTRACT};K[Nc]=s.MIN,K[Fc]=s.MAX;const et={[Bc]:s.ZERO,[Oc]:s.ONE,[zc]:s.SRC_COLOR,[jr]:s.SRC_ALPHA,[Xc]:s.SRC_ALPHA_SATURATE,[Vc]:s.DST_COLOR,[Hc]:s.DST_ALPHA,[Gc]:s.ONE_MINUS_SRC_COLOR,[Qr]:s.ONE_MINUS_SRC_ALPHA,[Wc]:s.ONE_MINUS_DST_COLOR,[kc]:s.ONE_MINUS_DST_ALPHA,[qc]:s.CONSTANT_COLOR,[Yc]:s.ONE_MINUS_CONSTANT_COLOR,[Zc]:s.CONSTANT_ALPHA,[$c]:s.ONE_MINUS_CONSTANT_ALPHA};function w(L,ht,W,J,pt,ft,Ft,ce,xe,te){if(L===wn){_===!0&&(Ct(s.BLEND),_=!1);return}if(_===!1&&(st(s.BLEND),_=!0),L!==Ic){if(L!==m||te!==y){if((d!==kn||M!==kn)&&(s.blendEquation(s.FUNC_ADD),d=kn,M=kn),te)switch(L){case yi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case po:s.blendFunc(s.ONE,s.ONE);break;case mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case go:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case yi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case po:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case go:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,E=null,N=null,R=null,A.set(0,0,0),P=0,m=L,y=te}return}pt=pt||ht,ft=ft||W,Ft=Ft||J,(ht!==d||pt!==M)&&(s.blendEquationSeparate(K[ht],K[pt]),d=ht,M=pt),(W!==b||J!==E||ft!==N||Ft!==R)&&(s.blendFuncSeparate(et[W],et[J],et[ft],et[Ft]),b=W,E=J,N=ft,R=Ft),(ce.equals(A)===!1||xe!==P)&&(s.blendColor(ce.r,ce.g,ce.b,xe),A.copy(ce),P=xe),m=L,y=!1}function wt(L,ht){L.side===pe?Ct(s.CULL_FACE):st(s.CULL_FACE);let W=L.side===Re;ht&&(W=!W),Q(W),L.blending===yi&&L.transparent===!1?w(wn):w(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const J=L.stencilWrite;o.setTest(J),J&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Rt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?st(s.SAMPLE_ALPHA_TO_COVERAGE):Ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function Q(L){x!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),x=L)}function _t(L){L!==Rc?(st(s.CULL_FACE),L!==C&&(L===fo?s.cullFace(s.BACK):L===Pc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ct(s.CULL_FACE),C=L}function rt(L){L!==H&&(k&&s.lineWidth(L),H=L)}function Rt(L,ht,W){L?(st(s.POLYGON_OFFSET_FILL),(F!==ht||V!==W)&&(s.polygonOffset(ht,W),F=ht,V=W)):Ct(s.POLYGON_OFFSET_FILL)}function mt(L){L?st(s.SCISSOR_TEST):Ct(s.SCISSOR_TEST)}function T(L){L===void 0&&(L=s.TEXTURE0+X-1),at!==L&&(s.activeTexture(L),at=L)}function v(L,ht,W){W===void 0&&(at===null?W=s.TEXTURE0+X-1:W=at);let J=ut[W];J===void 0&&(J={type:void 0,texture:void 0},ut[W]=J),(J.type!==L||J.texture!==ht)&&(at!==W&&(s.activeTexture(W),at=W),s.bindTexture(L,ht||St[L]),J.type=L,J.texture=ht)}function B(){const L=ut[at];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function yt(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ct(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function kt(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pt(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Dt(L){Kt.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),Kt.copy(L))}function Mt(L){Z.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),Z.copy(L))}function Wt(L,ht){let W=c.get(ht);W===void 0&&(W=new WeakMap,c.set(ht,W));let J=W.get(L);J===void 0&&(J=s.getUniformBlockIndex(ht,L.name),W.set(L,J))}function zt(L,ht){const J=c.get(ht).get(L);l.get(ht)!==J&&(s.uniformBlockBinding(ht,J,L.__bindingPointIndex),l.set(ht,J))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},at=null,ut={},f={},u=new WeakMap,p=[],g=null,_=!1,m=null,d=null,b=null,E=null,M=null,N=null,R=null,A=new $t(0,0,0),P=0,y=!1,x=null,C=null,H=null,F=null,V=null,Kt.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:Ct,bindFramebuffer:Ut,drawBuffers:Lt,useProgram:Xt,setBlending:w,setMaterial:wt,setFlipSided:Q,setCullFace:_t,setLineWidth:rt,setPolygonOffset:Rt,setScissorTest:mt,activeTexture:T,bindTexture:v,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:j,texImage2D:xt,texImage3D:Pt,updateUBOMapping:Wt,uniformBlockBinding:zt,texStorage2D:kt,texStorage3D:tt,texSubImage2D:Y,texSubImage3D:yt,compressedTexSubImage2D:ct,compressedTexSubImage3D:gt,scissor:Dt,viewport:Mt,reset:ie}}function hl(s,t,e,n){const i=vm(n);switch(e){case Wl:return s*t;case ql:return s*t;case Yl:return s*t*2;case qa:return s*t/i.components*i.byteLength;case Ya:return s*t/i.components*i.byteLength;case Zl:return s*t*2/i.components*i.byteLength;case Za:return s*t*2/i.components*i.byteLength;case Xl:return s*t*3/i.components*i.byteLength;case qe:return s*t*4/i.components*i.byteLength;case $a:return s*t*4/i.components*i.byteLength;case $s:case Js:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ks:case js:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fa:case pa:return Math.max(s,16)*Math.max(t,8)/4;case ua:case da:return Math.max(s,8)*Math.max(t,8)/2;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _a:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case va:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ya:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ba:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case wa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case La:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Qs:case Ia:case Da:return Math.ceil(s/4)*Math.ceil(t/4)*16;case $l:case Ua:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Na:case Fa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vm(s){switch(s){case fn:case Hl:return{byteLength:1,components:1};case os:case kl:case us:return{byteLength:2,components:1};case Wa:case Xa:return{byteLength:2,components:4};case Zn:case Va:case Ke:return{byteLength:4,components:1};case Vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function xm(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let f;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return p?new OffscreenCanvas(T,v):ir("canvas")}function _(T,v,B){let q=1;const j=mt(T);if((j.width>B||j.height>B)&&(q=B/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Y=Math.floor(q*j.width),yt=Math.floor(q*j.height);f===void 0&&(f=g(Y,yt));const ct=v?g(Y,yt):f;return ct.width=Y,ct.height=yt,ct.getContext("2d").drawImage(T,0,0,Y,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Y+"x"+yt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function m(T){return T.generateMipmaps}function d(T){s.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(T,v,B,q,j=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y=v;if(v===s.RED&&(B===s.FLOAT&&(Y=s.R32F),B===s.HALF_FLOAT&&(Y=s.R16F),B===s.UNSIGNED_BYTE&&(Y=s.R8)),v===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.R8UI),B===s.UNSIGNED_SHORT&&(Y=s.R16UI),B===s.UNSIGNED_INT&&(Y=s.R32UI),B===s.BYTE&&(Y=s.R8I),B===s.SHORT&&(Y=s.R16I),B===s.INT&&(Y=s.R32I)),v===s.RG&&(B===s.FLOAT&&(Y=s.RG32F),B===s.HALF_FLOAT&&(Y=s.RG16F),B===s.UNSIGNED_BYTE&&(Y=s.RG8)),v===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RG8UI),B===s.UNSIGNED_SHORT&&(Y=s.RG16UI),B===s.UNSIGNED_INT&&(Y=s.RG32UI),B===s.BYTE&&(Y=s.RG8I),B===s.SHORT&&(Y=s.RG16I),B===s.INT&&(Y=s.RG32I)),v===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),B===s.UNSIGNED_INT&&(Y=s.RGB32UI),B===s.BYTE&&(Y=s.RGB8I),B===s.SHORT&&(Y=s.RGB16I),B===s.INT&&(Y=s.RGB32I)),v===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),B===s.UNSIGNED_INT&&(Y=s.RGBA32UI),B===s.BYTE&&(Y=s.RGBA8I),B===s.SHORT&&(Y=s.RGBA16I),B===s.INT&&(Y=s.RGBA32I)),v===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),v===s.RGBA){const yt=j?cr:Yt.getTransfer(q);B===s.FLOAT&&(Y=s.RGBA32F),B===s.HALF_FLOAT&&(Y=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Y=yt===ee?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function M(T,v){let B;return T?v===null||v===Zn||v===Ci?B=s.DEPTH24_STENCIL8:v===Ke?B=s.DEPTH32F_STENCIL8:v===os&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zn||v===Ci?B=s.DEPTH_COMPONENT24:v===Ke?B=s.DEPTH_COMPONENT32F:v===os&&(B=s.DEPTH_COMPONENT16),B}function N(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ne&&T.minFilter!==Je?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function R(T){const v=T.target;v.removeEventListener("dispose",R),P(v),v.isVideoTexture&&h.delete(v)}function A(T){const v=T.target;v.removeEventListener("dispose",A),x(v)}function P(T){const v=n.get(T);if(v.__webglInit===void 0)return;const B=T.source,q=u.get(B);if(q){const j=q[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(T),Object.keys(q).length===0&&u.delete(B)}n.remove(T)}function y(T){const v=n.get(T);s.deleteTexture(v.__webglTexture);const B=T.source,q=u.get(B);delete q[v.__cacheKey],a.memory.textures--}function x(T){const v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let j=0;j<v.__webglFramebuffer[q].length;j++)s.deleteFramebuffer(v.__webglFramebuffer[q][j]);else s.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)s.deleteFramebuffer(v.__webglFramebuffer[q]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=T.textures;for(let q=0,j=B.length;q<j;q++){const Y=n.get(B[q]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(B[q])}n.remove(T)}let C=0;function H(){C=0}function F(){const T=C;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),C+=1,T}function V(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function X(T,v){const B=n.get(T);if(T.isVideoTexture&&rt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,T,v);return}}e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+v)}function k(T,v){const B=n.get(T);if(T.version>0&&B.__version!==T.version){Z(B,T,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+v)}function $(T,v){const B=n.get(T);if(T.version>0&&B.__version!==T.version){Z(B,T,v);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+v)}function O(T,v){const B=n.get(T);if(T.version>0&&B.__version!==T.version){nt(B,T,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+v)}const at={[ca]:s.REPEAT,[Xn]:s.CLAMP_TO_EDGE,[ha]:s.MIRRORED_REPEAT},ut={[Ne]:s.NEAREST,[rh]:s.NEAREST_MIPMAP_NEAREST,[gs]:s.NEAREST_MIPMAP_LINEAR,[Je]:s.LINEAR,[pr]:s.LINEAR_MIPMAP_NEAREST,[qn]:s.LINEAR_MIPMAP_LINEAR},vt={[ch]:s.NEVER,[mh]:s.ALWAYS,[hh]:s.LESS,[Kl]:s.LEQUAL,[uh]:s.EQUAL,[ph]:s.GEQUAL,[fh]:s.GREATER,[dh]:s.NOTEQUAL};function It(T,v){if(v.type===Ke&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Je||v.magFilter===pr||v.magFilter===gs||v.magFilter===qn||v.minFilter===Je||v.minFilter===pr||v.minFilter===gs||v.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,at[v.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,at[v.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,at[v.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,ut[v.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,ut[v.minFilter]),v.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,vt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ne||v.minFilter!==gs&&v.minFilter!==qn||v.type===Ke&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Kt(T,v){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));const q=v.source;let j=u.get(q);j===void 0&&(j={},u.set(q,j));const Y=V(v);if(Y!==T.__cacheKey){j[Y]===void 0&&(j[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[Y].usedTimes++;const yt=j[T.__cacheKey];yt!==void 0&&(j[T.__cacheKey].usedTimes--,yt.usedTimes===0&&y(v)),T.__cacheKey=Y,T.__webglTexture=j[Y].texture}return B}function Z(T,v,B){let q=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=s.TEXTURE_3D);const j=Kt(T,v),Y=v.source;e.bindTexture(q,T.__webglTexture,s.TEXTURE0+B);const yt=n.get(Y);if(Y.version!==yt.__version||j===!0){e.activeTexture(s.TEXTURE0+B);const ct=Yt.getPrimaries(Yt.workingColorSpace),gt=v.colorSpace===bn?null:Yt.getPrimaries(v.colorSpace),kt=v.colorSpace===bn||ct===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt);let tt=_(v.image,!1,i.maxTextureSize);tt=Rt(v,tt);const xt=r.convert(v.format,v.colorSpace),Pt=r.convert(v.type);let Dt=E(v.internalFormat,xt,Pt,v.colorSpace,v.isVideoTexture);It(q,v);let Mt;const Wt=v.mipmaps,zt=v.isVideoTexture!==!0,ie=yt.__version===void 0||j===!0,L=Y.dataReady,ht=N(v,tt);if(v.isDepthTexture)Dt=M(v.format===Ri,v.type),ie&&(zt?e.texStorage2D(s.TEXTURE_2D,1,Dt,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,Dt,tt.width,tt.height,0,xt,Pt,null));else if(v.isDataTexture)if(Wt.length>0){zt&&ie&&e.texStorage2D(s.TEXTURE_2D,ht,Dt,Wt[0].width,Wt[0].height);for(let W=0,J=Wt.length;W<J;W++)Mt=Wt[W],zt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,xt,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,W,Dt,Mt.width,Mt.height,0,xt,Pt,Mt.data);v.generateMipmaps=!1}else zt?(ie&&e.texStorage2D(s.TEXTURE_2D,ht,Dt,tt.width,tt.height),L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,tt.width,tt.height,xt,Pt,tt.data)):e.texImage2D(s.TEXTURE_2D,0,Dt,tt.width,tt.height,0,xt,Pt,tt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){zt&&ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Dt,Wt[0].width,Wt[0].height,tt.depth);for(let W=0,J=Wt.length;W<J;W++)if(Mt=Wt[W],v.format!==qe)if(xt!==null)if(zt){if(L)if(v.layerUpdates.size>0){const pt=hl(Mt.width,Mt.height,v.format,v.type);for(const ft of v.layerUpdates){const Ft=Mt.data.subarray(ft*pt/Mt.data.BYTES_PER_ELEMENT,(ft+1)*pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,ft,Mt.width,Mt.height,1,xt,Ft)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,tt.depth,xt,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,W,Dt,Mt.width,Mt.height,tt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,tt.depth,xt,Pt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,W,Dt,Mt.width,Mt.height,tt.depth,0,xt,Pt,Mt.data)}else{zt&&ie&&e.texStorage2D(s.TEXTURE_2D,ht,Dt,Wt[0].width,Wt[0].height);for(let W=0,J=Wt.length;W<J;W++)Mt=Wt[W],v.format!==qe?xt!==null?zt?L&&e.compressedTexSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,xt,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,W,Dt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,xt,Pt,Mt.data):e.texImage2D(s.TEXTURE_2D,W,Dt,Mt.width,Mt.height,0,xt,Pt,Mt.data)}else if(v.isDataArrayTexture)if(zt){if(ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Dt,tt.width,tt.height,tt.depth),L)if(v.layerUpdates.size>0){const W=hl(tt.width,tt.height,v.format,v.type);for(const J of v.layerUpdates){const pt=tt.data.subarray(J*W/tt.data.BYTES_PER_ELEMENT,(J+1)*W/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,tt.width,tt.height,1,xt,Pt,pt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,xt,Pt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Dt,tt.width,tt.height,tt.depth,0,xt,Pt,tt.data);else if(v.isData3DTexture)zt?(ie&&e.texStorage3D(s.TEXTURE_3D,ht,Dt,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,xt,Pt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,Dt,tt.width,tt.height,tt.depth,0,xt,Pt,tt.data);else if(v.isFramebufferTexture){if(ie)if(zt)e.texStorage2D(s.TEXTURE_2D,ht,Dt,tt.width,tt.height);else{let W=tt.width,J=tt.height;for(let pt=0;pt<ht;pt++)e.texImage2D(s.TEXTURE_2D,pt,Dt,W,J,0,xt,Pt,null),W>>=1,J>>=1}}else if(Wt.length>0){if(zt&&ie){const W=mt(Wt[0]);e.texStorage2D(s.TEXTURE_2D,ht,Dt,W.width,W.height)}for(let W=0,J=Wt.length;W<J;W++)Mt=Wt[W],zt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,xt,Pt,Mt):e.texImage2D(s.TEXTURE_2D,W,Dt,xt,Pt,Mt);v.generateMipmaps=!1}else if(zt){if(ie){const W=mt(tt);e.texStorage2D(s.TEXTURE_2D,ht,Dt,W.width,W.height)}L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,Pt,tt)}else e.texImage2D(s.TEXTURE_2D,0,Dt,xt,Pt,tt);m(v)&&d(q),yt.__version=Y.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function nt(T,v,B){if(v.image.length!==6)return;const q=Kt(T,v),j=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+B);const Y=n.get(j);if(j.version!==Y.__version||q===!0){e.activeTexture(s.TEXTURE0+B);const yt=Yt.getPrimaries(Yt.workingColorSpace),ct=v.colorSpace===bn?null:Yt.getPrimaries(v.colorSpace),gt=v.colorSpace===bn||yt===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const kt=v.isCompressedTexture||v.image[0].isCompressedTexture,tt=v.image[0]&&v.image[0].isDataTexture,xt=[];for(let J=0;J<6;J++)!kt&&!tt?xt[J]=_(v.image[J],!0,i.maxCubemapSize):xt[J]=tt?v.image[J].image:v.image[J],xt[J]=Rt(v,xt[J]);const Pt=xt[0],Dt=r.convert(v.format,v.colorSpace),Mt=r.convert(v.type),Wt=E(v.internalFormat,Dt,Mt,v.colorSpace),zt=v.isVideoTexture!==!0,ie=Y.__version===void 0||q===!0,L=j.dataReady;let ht=N(v,Pt);It(s.TEXTURE_CUBE_MAP,v);let W;if(kt){zt&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Wt,Pt.width,Pt.height);for(let J=0;J<6;J++){W=xt[J].mipmaps;for(let pt=0;pt<W.length;pt++){const ft=W[pt];v.format!==qe?Dt!==null?zt?L&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt,0,0,ft.width,ft.height,Dt,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt,Wt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt,0,0,ft.width,ft.height,Dt,Mt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt,Wt,ft.width,ft.height,0,Dt,Mt,ft.data)}}}else{if(W=v.mipmaps,zt&&ie){W.length>0&&ht++;const J=mt(xt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Wt,J.width,J.height)}for(let J=0;J<6;J++)if(tt){zt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,xt[J].width,xt[J].height,Dt,Mt,xt[J].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,xt[J].width,xt[J].height,0,Dt,Mt,xt[J].data);for(let pt=0;pt<W.length;pt++){const Ft=W[pt].image[J].image;zt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt+1,0,0,Ft.width,Ft.height,Dt,Mt,Ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt+1,Wt,Ft.width,Ft.height,0,Dt,Mt,Ft.data)}}else{zt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,Mt,xt[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,Dt,Mt,xt[J]);for(let pt=0;pt<W.length;pt++){const ft=W[pt];zt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt+1,0,0,Dt,Mt,ft.image[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,pt+1,Wt,Dt,Mt,ft.image[J])}}}m(v)&&d(s.TEXTURE_CUBE_MAP),Y.__version=j.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function St(T,v,B,q,j,Y){const yt=r.convert(B.format,B.colorSpace),ct=r.convert(B.type),gt=E(B.internalFormat,yt,ct,B.colorSpace),kt=n.get(v),tt=n.get(B);if(tt.__renderTarget=v,!kt.__hasExternalTextures){const xt=Math.max(1,v.width>>Y),Pt=Math.max(1,v.height>>Y);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,Y,gt,xt,Pt,v.depth,0,yt,ct,null):e.texImage2D(j,Y,gt,xt,Pt,0,yt,ct,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),_t(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,j,tt.__webglTexture,0,Q(v)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,j,tt.__webglTexture,Y),e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(T,v,B){if(s.bindRenderbuffer(s.RENDERBUFFER,T),v.depthBuffer){const q=v.depthTexture,j=q&&q.isDepthTexture?q.type:null,Y=M(v.stencilBuffer,j),yt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ct=Q(v);_t(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ct,Y,v.width,v.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ct,Y,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Y,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,yt,s.RENDERBUFFER,T)}else{const q=v.textures;for(let j=0;j<q.length;j++){const Y=q[j],yt=r.convert(Y.format,Y.colorSpace),ct=r.convert(Y.type),gt=E(Y.internalFormat,yt,ct,Y.colorSpace),kt=Q(v);B&&_t(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,gt,v.width,v.height):_t(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,kt,gt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,gt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ct(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X(v.depthTexture,0);const j=q.__webglTexture,Y=Q(v);if(v.depthTexture.format===Ei)_t(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(v.depthTexture.format===Ri)_t(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ut(T){const v=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=q}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ct(v.__webglFramebuffer,T)}else if(B){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=s.createRenderbuffer(),st(v.__webglDepthbuffer[q],T,!1);else{const j=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),st(v.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,j)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Lt(T,v,B){const q=n.get(T);v!==void 0&&St(q.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Ut(T)}function Xt(T){const v=T.texture,B=n.get(T),q=n.get(v);T.addEventListener("dispose",A);const j=T.textures,Y=T.isWebGLCubeRenderTarget===!0,yt=j.length>1;if(yt||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=v.version,a.memory.textures++),Y){B.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ct]=[];for(let gt=0;gt<v.mipmaps.length;gt++)B.__webglFramebuffer[ct][gt]=s.createFramebuffer()}else B.__webglFramebuffer[ct]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)B.__webglFramebuffer[ct]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(yt)for(let ct=0,gt=j.length;ct<gt;ct++){const kt=n.get(j[ct]);kt.__webglTexture===void 0&&(kt.__webglTexture=s.createTexture(),a.memory.textures++)}if(T.samples>0&&_t(T)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ct=0;ct<j.length;ct++){const gt=j[ct];B.__webglColorRenderbuffer[ct]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[ct]);const kt=r.convert(gt.format,gt.colorSpace),tt=r.convert(gt.type),xt=E(gt.internalFormat,kt,tt,gt.colorSpace,T.isXRRenderTarget===!0),Pt=Q(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,xt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,B.__webglColorRenderbuffer[ct])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),st(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),It(s.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let gt=0;gt<v.mipmaps.length;gt++)St(B.__webglFramebuffer[ct][gt],T,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,gt);else St(B.__webglFramebuffer[ct],T,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(v)&&d(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ct=0,gt=j.length;ct<gt;ct++){const kt=j[ct],tt=n.get(kt);e.bindTexture(s.TEXTURE_2D,tt.__webglTexture),It(s.TEXTURE_2D,kt),St(B.__webglFramebuffer,T,kt,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,0),m(kt)&&d(s.TEXTURE_2D)}e.unbindTexture()}else{let ct=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ct,q.__webglTexture),It(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let gt=0;gt<v.mipmaps.length;gt++)St(B.__webglFramebuffer[gt],T,v,s.COLOR_ATTACHMENT0,ct,gt);else St(B.__webglFramebuffer,T,v,s.COLOR_ATTACHMENT0,ct,0);m(v)&&d(ct),e.unbindTexture()}T.depthBuffer&&Ut(T)}function K(T){const v=T.textures;for(let B=0,q=v.length;B<q;B++){const j=v[B];if(m(j)){const Y=b(T),yt=n.get(j).__webglTexture;e.bindTexture(Y,yt),d(Y),e.unbindTexture()}}}const et=[],w=[];function wt(T){if(T.samples>0){if(_t(T)===!1){const v=T.textures,B=T.width,q=T.height;let j=s.COLOR_BUFFER_BIT;const Y=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=n.get(T),ct=v.length>1;if(ct)for(let gt=0;gt<v.length;gt++)e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let gt=0;gt<v.length;gt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),ct){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const kt=n.get(v[gt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,kt,0)}s.blitFramebuffer(0,0,B,q,0,0,B,q,j,s.NEAREST),l===!0&&(et.length=0,w.length=0,et.push(s.COLOR_ATTACHMENT0+gt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(et.push(Y),w.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,w)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ct)for(let gt=0;gt<v.length;gt++){e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const kt=n.get(v[gt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,kt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Q(T){return Math.min(i.maxSamples,T.samples)}function _t(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function rt(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Rt(T,v){const B=T.colorSpace,q=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Li&&B!==bn&&(Yt.getTransfer(B)===ee?(q!==qe||j!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.setTexture2D=X,this.setTexture2DArray=k,this.setTexture3D=$,this.setTextureCube=O,this.rebindTextures=Lt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=St,this.useMultisampledRTT=_t}function Mm(s,t){function e(n,i=bn){let r;const a=Yt.getTransfer(i);if(n===fn)return s.UNSIGNED_BYTE;if(n===Wa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Xa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Vl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Hl)return s.BYTE;if(n===kl)return s.SHORT;if(n===os)return s.UNSIGNED_SHORT;if(n===Va)return s.INT;if(n===Zn)return s.UNSIGNED_INT;if(n===Ke)return s.FLOAT;if(n===us)return s.HALF_FLOAT;if(n===Wl)return s.ALPHA;if(n===Xl)return s.RGB;if(n===qe)return s.RGBA;if(n===ql)return s.LUMINANCE;if(n===Yl)return s.LUMINANCE_ALPHA;if(n===Ei)return s.DEPTH_COMPONENT;if(n===Ri)return s.DEPTH_STENCIL;if(n===qa)return s.RED;if(n===Ya)return s.RED_INTEGER;if(n===Zl)return s.RG;if(n===Za)return s.RG_INTEGER;if(n===$a)return s.RGBA_INTEGER;if(n===$s||n===Js||n===Ks||n===js)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$s)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$s)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===fa||n===da||n===pa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===_a)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_a)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===va||n===xa||n===Ma||n===Sa||n===ya||n===Ea||n===Ta||n===ba||n===wa||n===Aa||n===Ca||n===Ra||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===va)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ma)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ya)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ea)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ra)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===La)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qs||n===Ia||n===Da)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qs)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$l||n===Ua||n===Na||n===Fa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Na)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ci?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Sm extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ze extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ym={type:"move"};class Vr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ym)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ee,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pn({vertexShader:Em,fragmentShader:Tm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ht(new je(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wm extends Ii{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,p=null,g=null;const _=new bm,m=e.getContextAttributes();let d=null,b=null;const E=[],M=[],N=new ot;let R=null;const A=new Oe;A.viewport=new he;const P=new Oe;P.viewport=new he;const y=[A,P],x=new Sm;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let nt=E[Z];return nt===void 0&&(nt=new Vr,E[Z]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Z){let nt=E[Z];return nt===void 0&&(nt=new Vr,E[Z]=nt),nt.getGripSpace()},this.getHand=function(Z){let nt=E[Z];return nt===void 0&&(nt=new Vr,E[Z]=nt),nt.getHandSpace()};function F(Z){const nt=M.indexOf(Z.inputSource);if(nt===-1)return;const St=E[nt];St!==void 0&&(St.update(Z.inputSource,Z.frame,c||a),St.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",X);for(let Z=0;Z<E.length;Z++){const nt=M[Z];nt!==null&&(M[Z]=null,E[Z].disconnect(nt))}C=null,H=null,_.reset(),t.setRenderTarget(d),p=null,u=null,f=null,i=null,b=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",V),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(N),i.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new $n(p.framebufferWidth,p.framebufferHeight,{format:qe,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,St=null,st=null;m.depth&&(st=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Ri:Ei,St=m.stencil?Ci:Zn);const Ct={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};f=new XRWebGLBinding(i,e),u=f.createProjectionLayer(Ct),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new $n(u.textureWidth,u.textureHeight,{format:qe,type:fn,depthTexture:new uc(u.textureWidth,u.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Kt.setContext(i),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(Z){for(let nt=0;nt<Z.removed.length;nt++){const St=Z.removed[nt],st=M.indexOf(St);st>=0&&(M[st]=null,E[st].disconnect(St))}for(let nt=0;nt<Z.added.length;nt++){const St=Z.added[nt];let st=M.indexOf(St);if(st===-1){for(let Ut=0;Ut<E.length;Ut++)if(Ut>=M.length){M.push(St),st=Ut;break}else if(M[Ut]===null){M[Ut]=St,st=Ut;break}if(st===-1)break}const Ct=E[st];Ct&&Ct.connect(St)}}const k=new I,$=new I;function O(Z,nt,St){k.setFromMatrixPosition(nt.matrixWorld),$.setFromMatrixPosition(St.matrixWorld);const st=k.distanceTo($),Ct=nt.projectionMatrix.elements,Ut=St.projectionMatrix.elements,Lt=Ct[14]/(Ct[10]-1),Xt=Ct[14]/(Ct[10]+1),K=(Ct[9]+1)/Ct[5],et=(Ct[9]-1)/Ct[5],w=(Ct[8]-1)/Ct[0],wt=(Ut[8]+1)/Ut[0],Q=Lt*w,_t=Lt*wt,rt=st/(-w+wt),Rt=rt*-w;if(nt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Rt),Z.translateZ(rt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ct[10]===-1)Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const mt=Lt+rt,T=Xt+rt,v=Q-Rt,B=_t+(st-Rt),q=K*Xt/T*mt,j=et*Xt/T*mt;Z.projectionMatrix.makePerspective(v,B,q,j,mt,T),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function at(Z,nt){nt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(nt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let nt=Z.near,St=Z.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(St=_.depthFar)),x.near=P.near=A.near=nt,x.far=P.far=A.far=St,(C!==x.near||H!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,H=x.far),A.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,x.layers.mask=A.layers.mask|P.layers.mask;const st=Z.parent,Ct=x.cameras;at(x,st);for(let Ut=0;Ut<Ct.length;Ut++)at(Ct[Ut],st);Ct.length===2?O(x,A,P):x.projectionMatrix.copy(A.projectionMatrix),ut(Z,x,st)};function ut(Z,nt,St){St===null?Z.matrix.copy(nt.matrixWorld):(Z.matrix.copy(St.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(nt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ba*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let vt=null;function It(Z,nt){if(h=nt.getViewerPose(c||a),g=nt,h!==null){const St=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let st=!1;St.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let Ut=0;Ut<St.length;Ut++){const Lt=St[Ut];let Xt=null;if(p!==null)Xt=p.getViewport(Lt);else{const et=f.getViewSubImage(u,Lt);Xt=et.viewport,Ut===0&&(t.setRenderTargetTextures(b,et.colorTexture,u.ignoreDepthValues?void 0:et.depthStencilTexture),t.setRenderTarget(b))}let K=y[Ut];K===void 0&&(K=new Oe,K.layers.enable(Ut),K.viewport=new he,y[Ut]=K),K.matrix.fromArray(Lt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(Lt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Ut===0&&(x.matrix.copy(K.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(K)}const Ct=i.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Ut=f.getDepthInformation(St[0]);Ut&&Ut.isValid&&Ut.texture&&_.init(t,Ut,i.renderState)}}for(let St=0;St<E.length;St++){const st=M[St],Ct=E[St];st!==null&&Ct!==void 0&&Ct.update(st,nt,c||a)}vt&&vt(Z,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const Kt=new cc;Kt.setAnimationLoop(It),this.setAnimationLoop=function(Z){vt=Z},this.dispose=function(){}}}const zn=new Qe,Am=new ne;function Cm(s,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,ac(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,b,E,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),u(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,b,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Re&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Re&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=t.get(d),E=b.envMap,M=b.envMapRotation;E&&(m.envMap.value=E,zn.copy(M),zn.x*=-1,zn.y*=-1,zn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),m.envMapRotation.value.setFromMatrix4(Am.makeRotationFromEuler(zn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=E*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Re&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rm(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const M=E.program;n.uniformBlockBinding(b,M)}function c(b,E){let M=i[b.id];M===void 0&&(g(b),M=h(b),i[b.id]=M,b.addEventListener("dispose",m));const N=E.program;n.updateUBOMapping(b,N);const R=t.render.frame;r[b.id]!==R&&(u(b),r[b.id]=R)}function h(b){const E=f();b.__bindingPointIndex=E;const M=s.createBuffer(),N=b.__size,R=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,N,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,M),M}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const E=i[b.id],M=b.uniforms,N=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let R=0,A=M.length;R<A;R++){const P=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,x=P.length;y<x;y++){const C=P[y];if(p(C,R,y,N)===!0){const H=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let X=0;X<F.length;X++){const k=F[X],$=_(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,s.bufferSubData(s.UNIFORM_BUFFER,H+V,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):(k.toArray(C.__data,V),V+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(b,E,M,N){const R=b.value,A=E+"_"+M;if(N[A]===void 0)return typeof R=="number"||typeof R=="boolean"?N[A]=R:N[A]=R.clone(),!0;{const P=N[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return N[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(b){const E=b.uniforms;let M=0;const N=16;for(let A=0,P=E.length;A<P;A++){const y=Array.isArray(E[A])?E[A]:[E[A]];for(let x=0,C=y.length;x<C;x++){const H=y[x],F=Array.isArray(H.value)?H.value:[H.value];for(let V=0,X=F.length;V<X;V++){const k=F[V],$=_(k),O=M%N,at=O%$.boundary,ut=O+at;M+=at,ut!==0&&N-ut<$.storage&&(M+=N-ut),H.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=M,M+=$.storage}}}const R=M%N;return R>0&&(M+=N-R),b.__size=M,b.__cache={},this}function _(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function d(){for(const b in i)s.deleteBuffer(i[b]);a=[],i={},r={}}return{bind:l,update:c,dispose:d}}class Pm{constructor(t={}){const{canvas:e=_h(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fe,this.toneMapping=An,this.toneMappingExposure=1;const M=this;let N=!1,R=0,A=0,P=null,y=-1,x=null;const C=new he,H=new he;let F=null;const V=new $t(0);let X=0,k=e.width,$=e.height,O=1,at=null,ut=null;const vt=new he(0,0,k,$),It=new he(0,0,k,$);let Kt=!1;const Z=new Ja;let nt=!1,St=!1;const st=new ne,Ct=new ne,Ut=new I,Lt=new he,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let K=!1;function et(){return P===null?O:1}let w=n;function wt(S,D){return e.getContext(S,D)}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ka}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),w===null){const D="webgl2";if(w=wt(D,S),w===null)throw wt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Q,_t,rt,Rt,mt,T,v,B,q,j,Y,yt,ct,gt,kt,tt,xt,Pt,Dt,Mt,Wt,zt,ie,L;function ht(){Q=new Nd(w),Q.init(),zt=new Mm(w,Q),_t=new Rd(w,Q,t,zt),rt=new _m(w,Q),_t.reverseDepthBuffer&&u&&rt.buffers.depth.setReversed(!0),Rt=new Od(w),mt=new nm,T=new xm(w,Q,rt,mt,_t,zt,Rt),v=new Ld(M),B=new Ud(M),q=new Wh(w),ie=new Ad(w,q),j=new Fd(w,q,Rt,ie),Y=new Gd(w,j,q,Rt),Dt=new zd(w,_t,T),tt=new Pd(mt),yt=new em(M,v,B,Q,_t,ie,tt),ct=new Cm(M,mt),gt=new sm,kt=new hm(Q),Pt=new wd(M,v,B,rt,Y,p,l),xt=new mm(M,Y,_t),L=new Rm(w,Rt,_t,rt),Mt=new Cd(w,Q,Rt),Wt=new Bd(w,Q,Rt),Rt.programs=yt.programs,M.capabilities=_t,M.extensions=Q,M.properties=mt,M.renderLists=gt,M.shadowMap=xt,M.state=rt,M.info=Rt}ht();const W=new wm(M,w);this.xr=W,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const S=Q.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Q.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(S){S!==void 0&&(O=S,this.setSize(k,$,!1))},this.getSize=function(S){return S.set(k,$)},this.setSize=function(S,D,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=S,$=D,e.width=Math.floor(S*O),e.height=Math.floor(D*O),z===!0&&(e.style.width=S+"px",e.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(k*O,$*O).floor()},this.setDrawingBufferSize=function(S,D,z){k=S,$=D,O=z,e.width=Math.floor(S*z),e.height=Math.floor(D*z),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(vt)},this.setViewport=function(S,D,z,G){S.isVector4?vt.set(S.x,S.y,S.z,S.w):vt.set(S,D,z,G),rt.viewport(C.copy(vt).multiplyScalar(O).round())},this.getScissor=function(S){return S.copy(It)},this.setScissor=function(S,D,z,G){S.isVector4?It.set(S.x,S.y,S.z,S.w):It.set(S,D,z,G),rt.scissor(H.copy(It).multiplyScalar(O).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(S){rt.setScissorTest(Kt=S)},this.setOpaqueSort=function(S){at=S},this.setTransparentSort=function(S){ut=S},this.getClearColor=function(S){return S.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(S=!0,D=!0,z=!0){let G=0;if(S){let U=!1;if(P!==null){const it=P.texture.format;U=it===$a||it===Za||it===Ya}if(U){const it=P.texture.type,dt=it===fn||it===Zn||it===os||it===Ci||it===Wa||it===Xa,Et=Pt.getClearColor(),Tt=Pt.getClearAlpha(),Nt=Et.r,Bt=Et.g,bt=Et.b;dt?(g[0]=Nt,g[1]=Bt,g[2]=bt,g[3]=Tt,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=Nt,_[1]=Bt,_[2]=bt,_[3]=Tt,w.clearBufferiv(w.COLOR,0,_))}else G|=w.COLOR_BUFFER_BIT}D&&(G|=w.DEPTH_BUFFER_BIT),z&&(G|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),gt.dispose(),kt.dispose(),mt.dispose(),v.dispose(),B.dispose(),Y.dispose(),ie.dispose(),L.dispose(),yt.dispose(),W.dispose(),W.removeEventListener("sessionstart",so),W.removeEventListener("sessionend",ro),Dn.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const S=Rt.autoReset,D=xt.enabled,z=xt.autoUpdate,G=xt.needsUpdate,U=xt.type;ht(),Rt.autoReset=S,xt.enabled=D,xt.autoUpdate=z,xt.needsUpdate=G,xt.type=U}function ft(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ft(S){const D=S.target;D.removeEventListener("dispose",Ft),ce(D)}function ce(S){xe(S),mt.remove(S)}function xe(S){const D=mt.get(S).programs;D!==void 0&&(D.forEach(function(z){yt.releaseProgram(z)}),S.isShaderMaterial&&yt.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,z,G,U,it){D===null&&(D=Xt);const dt=U.isMesh&&U.matrixWorld.determinant()<0,Et=wc(S,D,z,G,U);rt.setMaterial(G,dt);let Tt=z.index,Nt=1;if(G.wireframe===!0){if(Tt=j.getWireframeAttribute(z),Tt===void 0)return;Nt=2}const Bt=z.drawRange,bt=z.attributes.position;let Zt=Bt.start*Nt,se=(Bt.start+Bt.count)*Nt;it!==null&&(Zt=Math.max(Zt,it.start*Nt),se=Math.min(se,(it.start+it.count)*Nt)),Tt!==null?(Zt=Math.max(Zt,0),se=Math.min(se,Tt.count)):bt!=null&&(Zt=Math.max(Zt,0),se=Math.min(se,bt.count));const re=se-Zt;if(re<0||re===1/0)return;ie.setup(U,G,Et,z,Tt);let Ae,jt=Mt;if(Tt!==null&&(Ae=q.get(Tt),jt=Wt,jt.setIndex(Ae)),U.isMesh)G.wireframe===!0?(rt.setLineWidth(G.wireframeLinewidth*et()),jt.setMode(w.LINES)):jt.setMode(w.TRIANGLES);else if(U.isLine){let At=G.linewidth;At===void 0&&(At=1),rt.setLineWidth(At*et()),U.isLineSegments?jt.setMode(w.LINES):U.isLineLoop?jt.setMode(w.LINE_LOOP):jt.setMode(w.LINE_STRIP)}else U.isPoints?jt.setMode(w.POINTS):U.isSprite&&jt.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)jt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))jt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const At=U._multiDrawStarts,nn=U._multiDrawCounts,Qt=U._multiDrawCount,He=Tt?q.get(Tt).bytesPerElement:1,Qn=mt.get(G).currentProgram.getUniforms();for(let Pe=0;Pe<Qt;Pe++)Qn.setValue(w,"_gl_DrawID",Pe),jt.render(At[Pe]/He,nn[Pe])}else if(U.isInstancedMesh)jt.renderInstances(Zt,re,U.count);else if(z.isInstancedBufferGeometry){const At=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,nn=Math.min(z.instanceCount,At);jt.renderInstances(Zt,re,nn)}else jt.render(Zt,re)};function te(S,D,z){S.transparent===!0&&S.side===pe&&S.forceSinglePass===!1?(S.side=Re,S.needsUpdate=!0,ms(S,D,z),S.side=Rn,S.needsUpdate=!0,ms(S,D,z),S.side=pe):ms(S,D,z)}this.compile=function(S,D,z=null){z===null&&(z=S),d=kt.get(z),d.init(D),E.push(d),z.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),S!==z&&S.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const G=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const it=U.material;if(it)if(Array.isArray(it))for(let dt=0;dt<it.length;dt++){const Et=it[dt];te(Et,z,U),G.add(Et)}else te(it,z,U),G.add(it)}),E.pop(),d=null,G},this.compileAsync=function(S,D,z=null){const G=this.compile(S,D,z);return new Promise(U=>{function it(){if(G.forEach(function(dt){mt.get(dt).currentProgram.isReady()&&G.delete(dt)}),G.size===0){U(S);return}setTimeout(it,10)}Q.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ge=null;function en(S){Ge&&Ge(S)}function so(){Dn.stop()}function ro(){Dn.start()}const Dn=new cc;Dn.setAnimationLoop(en),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(S){Ge=S,W.setAnimationLoop(S),S===null?Dn.stop():Dn.start()},W.addEventListener("sessionstart",so),W.addEventListener("sessionend",ro),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,D,P),d=kt.get(S,E.length),d.init(D),E.push(d),Ct.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Z.setFromProjectionMatrix(Ct),St=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,St),m=gt.get(S,b.length),m.init(),b.push(m),W.enabled===!0&&W.isPresenting===!0){const it=M.xr.getDepthSensingMesh();it!==null&&dr(it,D,-1/0,M.sortObjects)}dr(S,D,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(at,ut),K=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,K&&Pt.addToRenderList(m,S),this.info.render.frame++,nt===!0&&tt.beginShadows();const z=d.state.shadowsArray;xt.render(z,S,D),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,U=m.transmissive;if(d.setupLights(),D.isArrayCamera){const it=D.cameras;if(U.length>0)for(let dt=0,Et=it.length;dt<Et;dt++){const Tt=it[dt];oo(G,U,S,Tt)}K&&Pt.render(S);for(let dt=0,Et=it.length;dt<Et;dt++){const Tt=it[dt];ao(m,S,Tt,Tt.viewport)}}else U.length>0&&oo(G,U,S,D),K&&Pt.render(S),ao(m,S,D);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(M,S,D),ie.resetDefaultState(),y=-1,x=null,E.pop(),E.length>0?(d=E[E.length-1],nt===!0&&tt.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function dr(S,D,z,G){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Z.intersectsSprite(S)){G&&Lt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ct);const dt=Y.update(S),Et=S.material;Et.visible&&m.push(S,dt,Et,z,Lt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Z.intersectsObject(S))){const dt=Y.update(S),Et=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Lt.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Lt.copy(dt.boundingSphere.center)),Lt.applyMatrix4(S.matrixWorld).applyMatrix4(Ct)),Array.isArray(Et)){const Tt=dt.groups;for(let Nt=0,Bt=Tt.length;Nt<Bt;Nt++){const bt=Tt[Nt],Zt=Et[bt.materialIndex];Zt&&Zt.visible&&m.push(S,dt,Zt,z,Lt.z,bt)}}else Et.visible&&m.push(S,dt,Et,z,Lt.z,null)}}const it=S.children;for(let dt=0,Et=it.length;dt<Et;dt++)dr(it[dt],D,z,G)}function ao(S,D,z,G){const U=S.opaque,it=S.transmissive,dt=S.transparent;d.setupLightsView(z),nt===!0&&tt.setGlobalState(M.clippingPlanes,z),G&&rt.viewport(C.copy(G)),U.length>0&&ps(U,D,z),it.length>0&&ps(it,D,z),dt.length>0&&ps(dt,D,z),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function oo(S,D,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new $n(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?us:fn,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const it=d.state.transmissionRenderTarget[G.id],dt=G.viewport||C;it.setSize(dt.z,dt.w);const Et=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(V),X=M.getClearAlpha(),X<1&&M.setClearColor(16777215,.5),M.clear(),K&&Pt.render(z);const Tt=M.toneMapping;M.toneMapping=An;const Nt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),nt===!0&&tt.setGlobalState(M.clippingPlanes,G),ps(S,z,G),T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let bt=0,Zt=D.length;bt<Zt;bt++){const se=D[bt],re=se.object,Ae=se.geometry,jt=se.material,At=se.group;if(jt.side===pe&&re.layers.test(G.layers)){const nn=jt.side;jt.side=Re,jt.needsUpdate=!0,lo(re,z,G,Ae,jt,At),jt.side=nn,jt.needsUpdate=!0,Bt=!0}}Bt===!0&&(T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it))}M.setRenderTarget(Et),M.setClearColor(V,X),Nt!==void 0&&(G.viewport=Nt),M.toneMapping=Tt}function ps(S,D,z){const G=D.isScene===!0?D.overrideMaterial:null;for(let U=0,it=S.length;U<it;U++){const dt=S[U],Et=dt.object,Tt=dt.geometry,Nt=G===null?dt.material:G,Bt=dt.group;Et.layers.test(z.layers)&&lo(Et,D,z,Tt,Nt,Bt)}}function lo(S,D,z,G,U,it){S.onBeforeRender(M,D,z,G,U,it),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(M,D,z,G,S,it),U.transparent===!0&&U.side===pe&&U.forceSinglePass===!1?(U.side=Re,U.needsUpdate=!0,M.renderBufferDirect(z,D,G,U,S,it),U.side=Rn,U.needsUpdate=!0,M.renderBufferDirect(z,D,G,U,S,it),U.side=pe):M.renderBufferDirect(z,D,G,U,S,it),S.onAfterRender(M,D,z,G,U,it)}function ms(S,D,z){D.isScene!==!0&&(D=Xt);const G=mt.get(S),U=d.state.lights,it=d.state.shadowsArray,dt=U.state.version,Et=yt.getParameters(S,U.state,it,D,z),Tt=yt.getProgramCacheKey(Et);let Nt=G.programs;G.environment=S.isMeshStandardMaterial?D.environment:null,G.fog=D.fog,G.envMap=(S.isMeshStandardMaterial?B:v).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Nt===void 0&&(S.addEventListener("dispose",Ft),Nt=new Map,G.programs=Nt);let Bt=Nt.get(Tt);if(Bt!==void 0){if(G.currentProgram===Bt&&G.lightsStateVersion===dt)return ho(S,Et),Bt}else Et.uniforms=yt.getUniforms(S),S.onBeforeCompile(Et,M),Bt=yt.acquireProgram(Et,Tt),Nt.set(Tt,Bt),G.uniforms=Et.uniforms;const bt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(bt.clippingPlanes=tt.uniform),ho(S,Et),G.needsLights=Cc(S),G.lightsStateVersion=dt,G.needsLights&&(bt.ambientLightColor.value=U.state.ambient,bt.lightProbe.value=U.state.probe,bt.directionalLights.value=U.state.directional,bt.directionalLightShadows.value=U.state.directionalShadow,bt.spotLights.value=U.state.spot,bt.spotLightShadows.value=U.state.spotShadow,bt.rectAreaLights.value=U.state.rectArea,bt.ltc_1.value=U.state.rectAreaLTC1,bt.ltc_2.value=U.state.rectAreaLTC2,bt.pointLights.value=U.state.point,bt.pointLightShadows.value=U.state.pointShadow,bt.hemisphereLights.value=U.state.hemi,bt.directionalShadowMap.value=U.state.directionalShadowMap,bt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,bt.spotShadowMap.value=U.state.spotShadowMap,bt.spotLightMatrix.value=U.state.spotLightMatrix,bt.spotLightMap.value=U.state.spotLightMap,bt.pointShadowMap.value=U.state.pointShadowMap,bt.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=Bt,G.uniformsList=null,Bt}function co(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=tr.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function ho(S,D){const z=mt.get(S);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.batchingColor=D.batchingColor,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function wc(S,D,z,G,U){D.isScene!==!0&&(D=Xt),T.resetTextureUnits();const it=D.fog,dt=G.isMeshStandardMaterial?D.environment:null,Et=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Li,Tt=(G.isMeshStandardMaterial?B:v).get(G.envMap||dt),Nt=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Bt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),bt=!!z.morphAttributes.position,Zt=!!z.morphAttributes.normal,se=!!z.morphAttributes.color;let re=An;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(re=M.toneMapping);const Ae=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,jt=Ae!==void 0?Ae.length:0,At=mt.get(G),nn=d.state.lights;if(nt===!0&&(St===!0||S!==x)){const Fe=S===x&&G.id===y;tt.setState(G,S,Fe)}let Qt=!1;G.version===At.__version?(At.needsLights&&At.lightsStateVersion!==nn.state.version||At.outputColorSpace!==Et||U.isBatchedMesh&&At.batching===!1||!U.isBatchedMesh&&At.batching===!0||U.isBatchedMesh&&At.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&At.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&At.instancing===!1||!U.isInstancedMesh&&At.instancing===!0||U.isSkinnedMesh&&At.skinning===!1||!U.isSkinnedMesh&&At.skinning===!0||U.isInstancedMesh&&At.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&At.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&At.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&At.instancingMorph===!1&&U.morphTexture!==null||At.envMap!==Tt||G.fog===!0&&At.fog!==it||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==tt.numPlanes||At.numIntersection!==tt.numIntersection)||At.vertexAlphas!==Nt||At.vertexTangents!==Bt||At.morphTargets!==bt||At.morphNormals!==Zt||At.morphColors!==se||At.toneMapping!==re||At.morphTargetsCount!==jt)&&(Qt=!0):(Qt=!0,At.__version=G.version);let He=At.currentProgram;Qt===!0&&(He=ms(G,D,U));let Qn=!1,Pe=!1,Oi=!1;const ae=He.getUniforms(),Ze=At.uniforms;if(rt.useProgram(He.program)&&(Qn=!0,Pe=!0,Oi=!0),G.id!==y&&(y=G.id,Pe=!0),Qn||x!==S){rt.buffers.depth.getReversed()?(st.copy(S.projectionMatrix),xh(st),Mh(st),ae.setValue(w,"projectionMatrix",st)):ae.setValue(w,"projectionMatrix",S.projectionMatrix),ae.setValue(w,"viewMatrix",S.matrixWorldInverse);const gn=ae.map.cameraPosition;gn!==void 0&&gn.setValue(w,Ut.setFromMatrixPosition(S.matrixWorld)),_t.logarithmicDepthBuffer&&ae.setValue(w,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ae.setValue(w,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Pe=!0,Oi=!0)}if(U.isSkinnedMesh){ae.setOptional(w,U,"bindMatrix"),ae.setOptional(w,U,"bindMatrixInverse");const Fe=U.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),ae.setValue(w,"boneTexture",Fe.boneTexture,T))}U.isBatchedMesh&&(ae.setOptional(w,U,"batchingTexture"),ae.setValue(w,"batchingTexture",U._matricesTexture,T),ae.setOptional(w,U,"batchingIdTexture"),ae.setValue(w,"batchingIdTexture",U._indirectTexture,T),ae.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&ae.setValue(w,"batchingColorTexture",U._colorsTexture,T));const zi=z.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&Dt.update(U,z,He),(Pe||At.receiveShadow!==U.receiveShadow)&&(At.receiveShadow=U.receiveShadow,ae.setValue(w,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ze.envMap.value=Tt,Ze.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&D.environment!==null&&(Ze.envMapIntensity.value=D.environmentIntensity),Pe&&(ae.setValue(w,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&Ac(Ze,Oi),it&&G.fog===!0&&ct.refreshFogUniforms(Ze,it),ct.refreshMaterialUniforms(Ze,G,O,$,d.state.transmissionRenderTarget[S.id]),tr.upload(w,co(At),Ze,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(tr.upload(w,co(At),Ze,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ae.setValue(w,"center",U.center),ae.setValue(w,"modelViewMatrix",U.modelViewMatrix),ae.setValue(w,"normalMatrix",U.normalMatrix),ae.setValue(w,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Fe=G.uniformsGroups;for(let gn=0,_n=Fe.length;gn<_n;gn++){const uo=Fe[gn];L.update(uo,He),L.bind(uo,He)}}return He}function Ac(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Cc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,D,z){mt.get(S.texture).__webglTexture=D,mt.get(S.depthTexture).__webglTexture=z;const G=mt.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,D){const z=mt.get(S);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,z=0){P=S,R=D,A=z;let G=!0,U=null,it=!1,dt=!1;if(S){const Tt=mt.get(S);if(Tt.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(w.FRAMEBUFFER,null),G=!1;else if(Tt.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(Tt.__hasExternalTextures)T.rebindTextures(S,mt.get(S.texture).__webglTexture,mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const bt=S.depthTexture;if(Tt.__boundDepthTexture!==bt){if(bt!==null&&mt.has(bt)&&(S.width!==bt.image.width||S.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Nt=S.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(dt=!0);const Bt=mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Bt[D])?U=Bt[D][z]:U=Bt[D],it=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?U=mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Bt)?U=Bt[z]:U=Bt,C.copy(S.viewport),H.copy(S.scissor),F=S.scissorTest}else C.copy(vt).multiplyScalar(O).floor(),H.copy(It).multiplyScalar(O).floor(),F=Kt;if(rt.bindFramebuffer(w.FRAMEBUFFER,U)&&G&&rt.drawBuffers(S,U),rt.viewport(C),rt.scissor(H),rt.setScissorTest(F),it){const Tt=mt.get(S.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+D,Tt.__webglTexture,z)}else if(dt){const Tt=mt.get(S.texture),Nt=D||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,Tt.__webglTexture,z||0,Nt)}y=-1},this.readRenderTargetPixels=function(S,D,z,G,U,it,dt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(Et=Et[dt]),Et){rt.bindFramebuffer(w.FRAMEBUFFER,Et);try{const Tt=S.texture,Nt=Tt.format,Bt=Tt.type;if(!_t.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-G&&z>=0&&z<=S.height-U&&w.readPixels(D,z,G,U,zt.convert(Nt),zt.convert(Bt),it)}finally{const Tt=P!==null?mt.get(P).__webglFramebuffer:null;rt.bindFramebuffer(w.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(S,D,z,G,U,it,dt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(Et=Et[dt]),Et){const Tt=S.texture,Nt=Tt.format,Bt=Tt.type;if(!_t.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=S.width-G&&z>=0&&z<=S.height-U){rt.bindFramebuffer(w.FRAMEBUFFER,Et);const bt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,bt),w.bufferData(w.PIXEL_PACK_BUFFER,it.byteLength,w.STREAM_READ),w.readPixels(D,z,G,U,zt.convert(Nt),zt.convert(Bt),0);const Zt=P!==null?mt.get(P).__webglFramebuffer:null;rt.bindFramebuffer(w.FRAMEBUFFER,Zt);const se=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await vh(w,se,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,bt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,it),w.deleteBuffer(bt),w.deleteSync(se),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,D=null,z=0){S.isTexture!==!0&&(es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-z),U=Math.floor(S.image.width*G),it=Math.floor(S.image.height*G),dt=D!==null?D.x:0,Et=D!==null?D.y:0;T.setTexture2D(S,0),w.copyTexSubImage2D(w.TEXTURE_2D,z,0,0,dt,Et,U,it),rt.unbindTexture()},this.copyTextureToTexture=function(S,D,z=null,G=null,U=0){S.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],D=arguments[2],U=arguments[3]||0,z=null);let it,dt,Et,Tt,Nt,Bt,bt,Zt,se;const re=S.isCompressedTexture?S.mipmaps[U]:S.image;z!==null?(it=z.max.x-z.min.x,dt=z.max.y-z.min.y,Et=z.isBox3?z.max.z-z.min.z:1,Tt=z.min.x,Nt=z.min.y,Bt=z.isBox3?z.min.z:0):(it=re.width,dt=re.height,Et=re.depth||1,Tt=0,Nt=0,Bt=0),G!==null?(bt=G.x,Zt=G.y,se=G.z):(bt=0,Zt=0,se=0);const Ae=zt.convert(D.format),jt=zt.convert(D.type);let At;D.isData3DTexture?(T.setTexture3D(D,0),At=w.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(T.setTexture2DArray(D,0),At=w.TEXTURE_2D_ARRAY):(T.setTexture2D(D,0),At=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,D.unpackAlignment);const nn=w.getParameter(w.UNPACK_ROW_LENGTH),Qt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),He=w.getParameter(w.UNPACK_SKIP_PIXELS),Qn=w.getParameter(w.UNPACK_SKIP_ROWS),Pe=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,re.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,re.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Tt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Nt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Bt);const Oi=S.isDataArrayTexture||S.isData3DTexture,ae=D.isDataArrayTexture||D.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Ze=mt.get(S),zi=mt.get(D),Fe=mt.get(Ze.__renderTarget),gn=mt.get(zi.__renderTarget);rt.bindFramebuffer(w.READ_FRAMEBUFFER,Fe.__webglFramebuffer),rt.bindFramebuffer(w.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let _n=0;_n<Et;_n++)Oi&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,mt.get(S).__webglTexture,U,Bt+_n),S.isDepthTexture?(ae&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,mt.get(D).__webglTexture,U,se+_n),w.blitFramebuffer(Tt,Nt,it,dt,bt,Zt,it,dt,w.DEPTH_BUFFER_BIT,w.NEAREST)):ae?w.copyTexSubImage3D(At,U,bt,Zt,se+_n,Tt,Nt,it,dt):w.copyTexSubImage2D(At,U,bt,Zt,se+_n,Tt,Nt,it,dt);rt.bindFramebuffer(w.READ_FRAMEBUFFER,null),rt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else ae?S.isDataTexture||S.isData3DTexture?w.texSubImage3D(At,U,bt,Zt,se,it,dt,Et,Ae,jt,re.data):D.isCompressedArrayTexture?w.compressedTexSubImage3D(At,U,bt,Zt,se,it,dt,Et,Ae,re.data):w.texSubImage3D(At,U,bt,Zt,se,it,dt,Et,Ae,jt,re):S.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,U,bt,Zt,it,dt,Ae,jt,re.data):S.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,U,bt,Zt,re.width,re.height,Ae,re.data):w.texSubImage2D(w.TEXTURE_2D,U,bt,Zt,it,dt,Ae,jt,re);w.pixelStorei(w.UNPACK_ROW_LENGTH,nn),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Qt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,He),w.pixelStorei(w.UNPACK_SKIP_ROWS,Qn),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Pe),U===0&&D.generateMipmaps&&w.generateMipmap(At),rt.unbindTexture()},this.copyTextureToTexture3D=function(S,D,z=null,G=null,U=0){return S.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,S=arguments[2],D=arguments[3],U=arguments[4]||0),es('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,D,z,G,U)},this.initRenderTarget=function(S){mt.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),rt.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,rt.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class Lm extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Im extends Ee{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ne,h=Ne,f,u){super(null,a,o,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul extends Ye{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const pi=new ne,fl=new ne,Bs=[],dl=new jn,Dm=new ne,Xi=new Ht,qi=new Ui;class Um extends Ht{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ul(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Dm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new jn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),dl.copy(t.boundingBox).applyMatrix4(pi),this.boundingBox.union(dl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),qi.copy(t.boundingSphere).applyMatrix4(pi),this.boundingSphere.union(qi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Xi.geometry=this.geometry,Xi.material=this.material,Xi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qi.copy(this.boundingSphere),qi.applyMatrix4(n),t.ray.intersectsSphere(qi)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,pi),fl.multiplyMatrices(n,pi),Xi.matrixWorld=fl,Xi.raycast(t,Bs);for(let a=0,o=Bs.length;a<o;a++){const l=Bs[a];l.instanceId=r,l.object=this,e.push(l)}Bs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ul(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Im(new Float32Array(i*this.count),i,this.count,qa,Ke));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class gc extends Ni{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const sr=new I,rr=new I,pl=new ne,Yi=new ec,Os=new Ui,Wr=new I,ml=new I;class Nm extends ve{constructor(t=new we,e=new gc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)sr.fromBufferAttribute(e,i-1),rr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=sr.distanceTo(rr);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(i),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;pl.copy(i).invert(),Yi.copy(t.ray).applyMatrix4(pl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const d=h.getX(_),b=h.getX(_+1),E=zs(this,t,Yi,l,d,b);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),d=zs(this,t,Yi,l,_,m);d&&e.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const d=zs(this,t,Yi,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=zs(this,t,Yi,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zs(s,t,e,n,i,r){const a=s.geometry.attributes.position;if(sr.fromBufferAttribute(a,i),rr.fromBufferAttribute(a,r),e.distanceSqToSegment(sr,rr,Wr,ml)>n)return;Wr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Wr);if(!(l<t.near||l>t.far))return{distance:l,point:ml.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class Ln extends Ee{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,p=(a-h)/u;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ot:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,i=[],r=[],a=[],o=new I,l=new ne;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ye(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(ye(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ja extends tn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*f+this.aX,c=u*f+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fm extends ja{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Qa(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,p*=h,i(a,o,u,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Gs=new I,Xr=new Qa,qr=new Qa,Yr=new Qa;class Bm extends tn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Gs.subVectors(i[0],i[1]).add(i[0]),c=Gs);const f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Gs.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Gs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Xr.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,_,m),qr.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,_,m),Yr.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Xr.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),qr.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Yr.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(Xr.calc(l),qr.calc(l),Yr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function gl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Om(s,t){const e=1-s;return e*e*t}function zm(s,t){return 2*(1-s)*s*t}function Gm(s,t){return s*s*t}function rs(s,t,e,n){return Om(s,t)+zm(s,e)+Gm(s,n)}function Hm(s,t){const e=1-s;return e*e*e*t}function km(s,t){const e=1-s;return 3*e*e*s*t}function Vm(s,t){return 3*(1-s)*s*s*t}function Wm(s,t){return s*s*s*t}function as(s,t,e,n,i){return Hm(s,t)+km(s,e)+Vm(s,n)+Wm(s,i)}class _c extends tn{constructor(t=new ot,e=new ot,n=new ot,i=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ot){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(as(t,i.x,r.x,a.x,o.x),as(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xm extends tn{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(as(t,i.x,r.x,a.x,o.x),as(t,i.y,r.y,a.y,o.y),as(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vc extends tn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qm extends tn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xc extends tn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(rs(t,i.x,r.x,a.x),rs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ym extends tn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(rs(t,i.x,r.x,a.x),rs(t,i.y,r.y,a.y),rs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mc extends tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(gl(o,l.x,c.x,h.x,f.x),gl(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ot().fromArray(i))}return this}}var za=Object.freeze({__proto__:null,ArcCurve:Fm,CatmullRomCurve3:Bm,CubicBezierCurve:_c,CubicBezierCurve3:Xm,EllipseCurve:ja,LineCurve:vc,LineCurve3:qm,QuadraticBezierCurve:xc,QuadraticBezierCurve3:Ym,SplineCurve:Mc});class Zm extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new za[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new za[i.type]().fromJSON(i))}return this}}class _l extends Zm{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new vc(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new xc(this.currentPoint.clone(),new ot(t,e),new ot(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new _c(this.currentPoint.clone(),new ot(t,e),new ot(n,i),new ot(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Mc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new ja(t,e,n,i,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class pn extends we{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new I,h=new ot;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){const p=n+f/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(o,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ds extends we{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],f=[],u=[],p=[];let g=0;const _=[],m=n/2;let d=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new oe(f,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(p,2));function b(){const M=new I,N=new I;let R=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const y=[],x=P/r,C=x*(e-t)+t;for(let H=0;H<=i;H++){const F=H/i,V=F*l+o,X=Math.sin(V),k=Math.cos(V);N.x=C*X,N.y=-x*n+m,N.z=C*k,f.push(N.x,N.y,N.z),M.set(X,A,k).normalize(),u.push(M.x,M.y,M.z),p.push(F,1-x),y.push(g++)}_.push(y)}for(let P=0;P<i;P++)for(let y=0;y<r;y++){const x=_[y][P],C=_[y+1][P],H=_[y+1][P+1],F=_[y][P+1];(t>0||y!==0)&&(h.push(x,C,F),R+=3),(e>0||y!==r-1)&&(h.push(C,H,F),R+=3)}c.addGroup(d,R,0),d+=R}function E(M){const N=g,R=new ot,A=new I;let P=0;const y=M===!0?t:e,x=M===!0?1:-1;for(let H=1;H<=i;H++)f.push(0,m*x,0),u.push(0,x,0),p.push(.5,.5),g++;const C=g;for(let H=0;H<=i;H++){const V=H/i*l+o,X=Math.cos(V),k=Math.sin(V);A.x=y*k,A.y=m*x,A.z=y*X,f.push(A.x,A.y,A.z),u.push(0,x,0),R.x=X*.5+.5,R.y=k*.5*x+.5,p.push(R.x,R.y),g++}for(let H=0;H<i;H++){const F=N+H,V=C+H;M===!0?h.push(V,V+1,F):h.push(V+1,V,F),P+=3}c.addGroup(d,P,M===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class to extends ds{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new to(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ar extends _l{constructor(t){super(t),this.uuid=Di(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new _l().fromJSON(i))}return this}}const $m={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Sc(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,f,u,p;if(n&&(r=tg(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)f=s[g],u=s[g+1],f<o&&(o=f),u<l&&(l=u),f>c&&(c=f),u>h&&(h=u);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return ls(r,a,e,o,l,p,0),a}};function Sc(s,t,e,n,i){let r,a;if(i===ug(s,t,e,n)>0)for(r=t;r<e;r+=n)a=vl(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=vl(r,s[r],s[r+1],a);return a&&ur(a,a.next)&&(hs(a),a=a.next),a}function Jn(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ur(e,e.next)||le(e.prev,e,e.next)===0)){if(hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ls(s,t,e,n,i,r,a){if(!s)return;!a&&r&&rg(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Km(s,n,i,r):Jm(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),hs(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=jm(Jn(s),t,e),ls(s,t,e,n,i,r,2)):a===2&&Qm(s,t,e,n,i,r):ls(Jn(s),t,e,n,i,r,1);break}}}function Jm(s){const t=s.prev,e=s,n=s.next;if(le(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,f=o<l?o<c?o:c:l<c?l:c,u=i>r?i>a?i:a:r>a?r:a,p=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=p&&Si(i,o,r,l,a,c,g.x,g.y)&&le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Km(s,t,e,n){const i=s.prev,r=s,a=s.next;if(le(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,f=r.y,u=a.y,p=o<l?o<c?o:c:l<c?l:c,g=h<f?h<u?h:u:f<u?f:u,_=o>l?o>c?o:c:l>c?l:c,m=h>f?h>u?h:u:f>u?f:u,d=Ga(p,g,t,e,n),b=Ga(_,m,t,e,n);let E=s.prevZ,M=s.nextZ;for(;E&&E.z>=d&&M&&M.z<=b;){if(E.x>=p&&E.x<=_&&E.y>=g&&E.y<=m&&E!==i&&E!==a&&Si(o,h,l,f,c,u,E.x,E.y)&&le(E.prev,E,E.next)>=0||(E=E.prevZ,M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Si(o,h,l,f,c,u,M.x,M.y)&&le(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;E&&E.z>=d;){if(E.x>=p&&E.x<=_&&E.y>=g&&E.y<=m&&E!==i&&E!==a&&Si(o,h,l,f,c,u,E.x,E.y)&&le(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;M&&M.z<=b;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Si(o,h,l,f,c,u,M.x,M.y)&&le(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function jm(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!ur(i,r)&&yc(i,n,n.next,r)&&cs(i,r)&&cs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),hs(n),hs(n.next),n=s=r),n=n.next}while(n!==s);return Jn(n)}function Qm(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&lg(a,o)){let l=Ec(a,o);a=Jn(a,a.next),l=Jn(l,l.next),ls(a,t,e,n,i,r,0),ls(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function tg(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Sc(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(og(c));for(i.sort(eg),r=0;r<i.length;r++)e=ng(i[r],e);return e}function eg(s,t){return s.x-t.x}function ng(s,t){const e=ig(s,t);if(!e)return t;const n=Ec(e,s);return Jn(n,n.next),Jn(e,e.next)}function ig(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const u=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,f;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Si(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(f=Math.abs(a-e.y)/(r-e.x),cs(e,s)&&(f<h||f===h&&(e.x>i.x||e.x===i.x&&sg(i,e)))&&(i=e,h=f)),e=e.next;while(e!==o);return i}function sg(s,t){return le(s.prev,s,t.prev)<0&&le(t.next,s,s.next)<0}function rg(s,t,e,n){let i=s;do i.z===0&&(i.z=Ga(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ag(i)}function ag(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function Ga(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function og(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Si(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function lg(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!cg(s,t)&&(cs(s,t)&&cs(t,s)&&hg(s,t)&&(le(s.prev,s,t.prev)||le(s,t.prev,t))||ur(s,t)&&le(s.prev,s,s.next)>0&&le(t.prev,t,t.next)>0)}function le(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ur(s,t){return s.x===t.x&&s.y===t.y}function yc(s,t,e,n){const i=ks(le(s,t,e)),r=ks(le(s,t,n)),a=ks(le(e,n,s)),o=ks(le(e,n,t));return!!(i!==r&&a!==o||i===0&&Hs(s,e,t)||r===0&&Hs(s,n,t)||a===0&&Hs(e,s,n)||o===0&&Hs(e,t,n))}function Hs(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ks(s){return s>0?1:s<0?-1:0}function cg(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&yc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function cs(s,t){return le(s.prev,s,s.next)<0?le(s,t,s.next)>=0&&le(s,s.prev,t)>=0:le(s,t,s.prev)<0||le(s,s.next,t)<0}function hg(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Ec(s,t){const e=new Ha(s.i,s.x,s.y),n=new Ha(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function vl(s,t,e,n){const i=new Ha(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function hs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ha(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ug(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Cn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Cn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];xl(t),Ml(n,t);let a=t.length;e.forEach(xl);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Ml(n,e[l]);const o=$m.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function xl(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Ml(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class eo extends we{constructor(t=new ar([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new oe(i,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:fg;let E,M=!1,N,R,A,P;d&&(E=d.getSpacedPoints(h),M=!0,u=!1,N=d.computeFrenetFrames(h,!1),R=new I,A=new I,P=new I),u||(m=0,p=0,g=0,_=0);const y=o.extractPoints(c);let x=y.shape;const C=y.holes;if(!Cn.isClockWise(x)){x=x.reverse();for(let K=0,et=C.length;K<et;K++){const w=C[K];Cn.isClockWise(w)&&(C[K]=w.reverse())}}const F=Cn.triangulateShape(x,C),V=x;for(let K=0,et=C.length;K<et;K++){const w=C[K];x=x.concat(w)}function X(K,et,w){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(et,w)}const k=x.length,$=F.length;function O(K,et,w){let wt,Q,_t;const rt=K.x-et.x,Rt=K.y-et.y,mt=w.x-K.x,T=w.y-K.y,v=rt*rt+Rt*Rt,B=rt*T-Rt*mt;if(Math.abs(B)>Number.EPSILON){const q=Math.sqrt(v),j=Math.sqrt(mt*mt+T*T),Y=et.x-Rt/q,yt=et.y+rt/q,ct=w.x-T/j,gt=w.y+mt/j,kt=((ct-Y)*T-(gt-yt)*mt)/(rt*T-Rt*mt);wt=Y+rt*kt-K.x,Q=yt+Rt*kt-K.y;const tt=wt*wt+Q*Q;if(tt<=2)return new ot(wt,Q);_t=Math.sqrt(tt/2)}else{let q=!1;rt>Number.EPSILON?mt>Number.EPSILON&&(q=!0):rt<-Number.EPSILON?mt<-Number.EPSILON&&(q=!0):Math.sign(Rt)===Math.sign(T)&&(q=!0),q?(wt=-Rt,Q=rt,_t=Math.sqrt(v)):(wt=rt,Q=Rt,_t=Math.sqrt(v/2))}return new ot(wt/_t,Q/_t)}const at=[];for(let K=0,et=V.length,w=et-1,wt=K+1;K<et;K++,w++,wt++)w===et&&(w=0),wt===et&&(wt=0),at[K]=O(V[K],V[w],V[wt]);const ut=[];let vt,It=at.concat();for(let K=0,et=C.length;K<et;K++){const w=C[K];vt=[];for(let wt=0,Q=w.length,_t=Q-1,rt=wt+1;wt<Q;wt++,_t++,rt++)_t===Q&&(_t=0),rt===Q&&(rt=0),vt[wt]=O(w[wt],w[_t],w[rt]);ut.push(vt),It=It.concat(vt)}for(let K=0;K<m;K++){const et=K/m,w=p*Math.cos(et*Math.PI/2),wt=g*Math.sin(et*Math.PI/2)+_;for(let Q=0,_t=V.length;Q<_t;Q++){const rt=X(V[Q],at[Q],wt);st(rt.x,rt.y,-w)}for(let Q=0,_t=C.length;Q<_t;Q++){const rt=C[Q];vt=ut[Q];for(let Rt=0,mt=rt.length;Rt<mt;Rt++){const T=X(rt[Rt],vt[Rt],wt);st(T.x,T.y,-w)}}}const Kt=g+_;for(let K=0;K<k;K++){const et=u?X(x[K],It[K],Kt):x[K];M?(A.copy(N.normals[0]).multiplyScalar(et.x),R.copy(N.binormals[0]).multiplyScalar(et.y),P.copy(E[0]).add(A).add(R),st(P.x,P.y,P.z)):st(et.x,et.y,0)}for(let K=1;K<=h;K++)for(let et=0;et<k;et++){const w=u?X(x[et],It[et],Kt):x[et];M?(A.copy(N.normals[K]).multiplyScalar(w.x),R.copy(N.binormals[K]).multiplyScalar(w.y),P.copy(E[K]).add(A).add(R),st(P.x,P.y,P.z)):st(w.x,w.y,f/h*K)}for(let K=m-1;K>=0;K--){const et=K/m,w=p*Math.cos(et*Math.PI/2),wt=g*Math.sin(et*Math.PI/2)+_;for(let Q=0,_t=V.length;Q<_t;Q++){const rt=X(V[Q],at[Q],wt);st(rt.x,rt.y,f+w)}for(let Q=0,_t=C.length;Q<_t;Q++){const rt=C[Q];vt=ut[Q];for(let Rt=0,mt=rt.length;Rt<mt;Rt++){const T=X(rt[Rt],vt[Rt],wt);M?st(T.x,T.y+E[h-1].y,E[h-1].x+w):st(T.x,T.y,f+w)}}}Z(),nt();function Z(){const K=i.length/3;if(u){let et=0,w=k*et;for(let wt=0;wt<$;wt++){const Q=F[wt];Ct(Q[2]+w,Q[1]+w,Q[0]+w)}et=h+m*2,w=k*et;for(let wt=0;wt<$;wt++){const Q=F[wt];Ct(Q[0]+w,Q[1]+w,Q[2]+w)}}else{for(let et=0;et<$;et++){const w=F[et];Ct(w[2],w[1],w[0])}for(let et=0;et<$;et++){const w=F[et];Ct(w[0]+k*h,w[1]+k*h,w[2]+k*h)}}n.addGroup(K,i.length/3-K,0)}function nt(){const K=i.length/3;let et=0;St(V,et),et+=V.length;for(let w=0,wt=C.length;w<wt;w++){const Q=C[w];St(Q,et),et+=Q.length}n.addGroup(K,i.length/3-K,1)}function St(K,et){let w=K.length;for(;--w>=0;){const wt=w;let Q=w-1;Q<0&&(Q=K.length-1);for(let _t=0,rt=h+m*2;_t<rt;_t++){const Rt=k*_t,mt=k*(_t+1),T=et+wt+Rt,v=et+Q+Rt,B=et+Q+mt,q=et+wt+mt;Ut(T,v,B,q)}}}function st(K,et,w){l.push(K),l.push(et),l.push(w)}function Ct(K,et,w){Lt(K),Lt(et),Lt(w);const wt=i.length/3,Q=b.generateTopUV(n,i,wt-3,wt-2,wt-1);Xt(Q[0]),Xt(Q[1]),Xt(Q[2])}function Ut(K,et,w,wt){Lt(K),Lt(et),Lt(wt),Lt(et),Lt(w),Lt(wt);const Q=i.length/3,_t=b.generateSideWallUV(n,i,Q-6,Q-3,Q-2,Q-1);Xt(_t[0]),Xt(_t[1]),Xt(_t[3]),Xt(_t[1]),Xt(_t[2]),Xt(_t[3])}function Lt(K){i.push(l[K*3+0]),i.push(l[K*3+1]),i.push(l[K*3+2])}function Xt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return dg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new za[i.type]().fromJSON(i)),new eo(n,t.options)}}const fg={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ot(r,a),new ot(o,l),new ot(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[i*3],p=t[i*3+1],g=t[i*3+2],_=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ot(a,1-l),new ot(c,1-f),new ot(u,1-g),new ot(_,1-d)]:[new ot(o,1-l),new ot(h,1-f),new ot(p,1-g),new ot(m,1-d)]}};function dg(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class In extends we{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let f=t;const u=(e-t)/i,p=new I,g=new ot;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let d=0;d<n;d++){const b=d+m,E=b,M=b+n+1,N=b+n+2,R=b+1;o.push(E,M,R),o.push(M,N,R)}}this.setIndex(o),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class no extends we{constructor(t=new ar([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new oe(i,3)),this.setAttribute("normal",new oe(r,3)),this.setAttribute("uv",new oe(a,2));function c(h){const f=i.length/3,u=h.extractPoints(e);let p=u.shape;const g=u.holes;Cn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,d=g.length;m<d;m++){const b=g[m];Cn.isClockWise(b)===!0&&(g[m]=b.reverse())}const _=Cn.triangulateShape(p,g);for(let m=0,d=g.length;m<d;m++){const b=g[m];p=p.concat(b)}for(let m=0,d=p.length;m<d;m++){const b=p[m];i.push(b.x,b.y,0),r.push(0,0,1),a.push(b.x,b.y)}for(let m=0,d=_.length;m<d;m++){const b=_[m],E=b[0]+f,M=b[1]+f,N=b[2]+f;n.push(E,M,N),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return pg(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new no(n,t.curveSegments)}}function pg(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Kn extends we{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new I,u=new I,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const b=[],E=d/n;let M=0;d===0&&a===0?M=.5/e:d===n&&l===Math.PI&&(M=-.5/e);for(let N=0;N<=e;N++){const R=N/e;f.x=-t*Math.cos(i+R*r)*Math.sin(a+E*o),f.y=t*Math.cos(a+E*o),f.z=t*Math.sin(i+R*r)*Math.sin(a+E*o),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(R+M,1-E),b.push(c++)}h.push(b)}for(let d=0;d<n;d++)for(let b=0;b<e;b++){const E=h[d][b+1],M=h[d][b],N=h[d+1][b],R=h[d+1][b+1];(d!==0||a>0)&&p.push(E,M,R),(d!==n-1||l<Math.PI)&&p.push(M,N,R)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mn extends Ni{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Tc extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Zr=new ne,Sl=new I,yl=new I;class mg{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ja,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Sl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Sl),yl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yl),e.updateMatrixWorld(),Zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class gg extends mg{constructor(){super(new hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class El extends Tc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new gg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _g extends Tc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ka);const Yn=0,is=1,Wn=2,vg=new Kn(.26,20,16),Tl=new mn({color:16317439,roughness:.25,metalness:.05,emissive:14412031,emissiveIntensity:.18}),xg=new mn({color:16736768,roughness:.18,metalness:.1,emissive:16722432,emissiveIntensity:.85}),Mg=new mn({color:8059135,roughness:.15,metalness:.05,emissive:55807,emissiveIntensity:.7,transparent:!0,opacity:.78}),Sg=new In(.27,.39,20),bl=new Jt({color:16746496,transparent:!0,opacity:.75,side:pe,depthWrite:!1}),yg=new Jt({color:5437439,transparent:!0,opacity:.68,side:pe,depthWrite:!1}),Eg=new pn(.27,16),Tg=new Jt({color:983590,transparent:!0,opacity:.48,depthWrite:!1}),io=new to(.18,.95,8,1,!0);io.rotateX(Math.PI*.5);io.translate(0,0,.48);const wl=new Jt({color:16777215,transparent:!0,opacity:.16,depthWrite:!1,side:pe}),bg=new Jt({color:16735744,transparent:!0,opacity:.48,depthWrite:!1,side:pe}),wg=new Jt({color:5040383,transparent:!0,opacity:.38,depthWrite:!1,side:pe});class Al{constructor(){this.root=new ze,this.root.visible=!1,this.mesh=new Ht(vg,Tl),this.mesh.position.y=.26,this.root.add(this.mesh),this.haloMesh=new Ht(Sg,bl),this.haloMesh.rotation.x=-Math.PI*.5,this.haloMesh.position.y=.04,this.haloMesh.visible=!1,this.root.add(this.haloMesh),this.shadow=new Ht(Eg,Tg),this.shadow.rotation.x=-Math.PI*.5,this.shadow.position.set(-.14,.015,.16),this.root.add(this.shadow),this.trail=new Ht(io,wl),this.trail.position.y=.22,this.root.add(this.trail),this.x=0,this.z=0,this.vx=0,this.vz=0,this.radius=.26,this.ballType=Yn,this.active=!1,this.returningToLauncher=!1,this.targetReturnX=0,this.ghostCooldowns=new Float32Array(64)}setAppearance(t){this.ballType=t,t===is?(this.mesh.material=xg,this.trail.material=bg,this.haloMesh.material=bl,this.haloMesh.visible=!0):t===Wn?(this.mesh.material=Mg,this.trail.material=wg,this.haloMesh.material=yg,this.haloMesh.visible=!0):(this.mesh.material=Tl,this.trail.material=wl,this.haloMesh.visible=!1)}spawn(t,e,n,i,r=Yn){this.x=t,this.z=e,this.vx=n,this.vz=i,this.active=!0,this.returningToLauncher=!1,this.root.visible=!0,this.trail.visible=!0,this.setAppearance(r),r===Wn&&this.ghostCooldowns.fill(0),this.syncTransform()}syncTransform(){if(this.root.position.set(this.x,0,this.z),this.trail.visible&&(this.vx!==0||this.vz!==0)){const t=Math.atan2(-this.vx,-this.vz);this.trail.rotation.y=t}}reset(){this.active=!1,this.returningToLauncher=!1,this.root.visible=!1,this.vx=0,this.vz=0,this.setAppearance(Yn)}}function or(s,t,e){return s<t?t:s>e?e:s}function fr(s,t,e){return s+(t-s)*e}function ue(s,t){return s+Math.random()*(t-s)}function Cl(s,t){return Math.floor(s+Math.random()*(t-s+1))}const mi=[{count:1,top:16726820,side:13180426,cssTop:"#ff4730",cssRim:"#ff7866"},{count:8,top:16732442,side:13185798,cssTop:"#ff5924",cssRim:"#ff885e"},{count:16,top:16744448,side:13064192,cssTop:"#ff8800",cssRim:"#ffad42"},{count:27,top:16758528,side:13207552,cssTop:"#ffc400",cssRim:"#ffe066"},{count:35,top:13158144,side:9736448,cssTop:"#d1d108",cssRim:"#e8e854"},{count:48,top:5036308,side:3055876,cssTop:"#52e019",cssRim:"#88f25e"}];function Ag(s){return s<=4?mi[0]:s<=11?mi[1]:s<=22?mi[2]:s<=33?mi[3]:s<=42?mi[4]:mi[5]}const dn=.62,er=.68,Cg=new ds(dn,dn,er,28,1,!0);new pn(dn,28);const Rg=new pn(dn,28),Pg=new pn(dn*1.06,24),Lg=new In(dn*.92,dn*1.38,28),Ig=new je(.75,.75),Dg=new Jt({color:983590,transparent:!0,opacity:.45,depthWrite:!1});let Zi=null;function Ug(){if(Zi)return Zi;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d");return t.clearRect(0,0,128,128),t.save(),t.shadowColor="#ff2a85",t.shadowBlur=14,t.strokeStyle="#ff4da6",t.lineWidth=8,t.lineJoin="round",t.beginPath(),t.moveTo(64,18),t.lineTo(112,104),t.lineTo(16,104),t.closePath(),t.stroke(),t.fillStyle="#ff66b5",t.beginPath(),t.roundRect(59,44,10,32,5),t.fill(),t.beginPath(),t.arc(64,90,6,0,Math.PI*2),t.fill(),t.restore(),Zi=new Ln(s),Zi.colorSpace=fe,Zi}let Ng=0;class Fg{constructor(){this.uid=Ng++&63,this.radius=dn,this.height=er,this.root=new ze,this.root.visible=!1,this.visualGroup=new ze,this.root.add(this.visualGroup),this.canvas=document.createElement("canvas"),this.canvas.width=256,this.canvas.height=256,this.ctx=this.canvas.getContext("2d"),this.topTexture=new Ln(this.canvas),this.topTexture.colorSpace=fe,this.topTexture.anisotropy=4,this.sideMat=new mn({color:13207552,roughness:.42,metalness:.05}),this.topMat=new Jt({map:this.topTexture}),this.bodyMesh=new Ht(Cg,this.sideMat),this.bodyMesh.position.y=er*.5,this.visualGroup.add(this.bodyMesh),this.topCapMesh=new Ht(Rg,this.topMat),this.topCapMesh.rotation.x=-Math.PI*.5,this.topCapMesh.position.y=er+.005,this.visualGroup.add(this.topCapMesh),this.shadowMesh=new Ht(Pg,Dg),this.shadowMesh.rotation.x=-Math.PI*.5,this.shadowMesh.position.set(-.14,.012,.22),this.root.add(this.shadowMesh),this.glowMat=new Jt({color:16729904,transparent:!0,opacity:0,depthWrite:!1,side:pe}),this.glowMesh=new Ht(Lg,this.glowMat),this.glowMesh.rotation.x=-Math.PI*.5,this.glowMesh.position.set(0,.025,0),this.root.add(this.glowMesh),this.warningMat=new Jt({map:Ug(),transparent:!0,opacity:.95,depthWrite:!1}),this.warningMesh=new Ht(Ig,this.warningMat),this.warningMesh.rotation.x=-Math.PI*.5,this.warningMesh.position.set(0,.03,dn+.62),this.warningMesh.visible=!1,this.root.add(this.warningMesh),this.active=!1,this.col=0,this.row=0,this.count=1,this.currentColorHex=16729904,this.x=0,this.z=0,this.startZ=0,this.targetZ=0,this.hitTimer=0,this.spawnTimer=0,this.isDangerRow=!1,this.warningPulseTime=0}init(t,e,n,i,r){this.active=!0,this.col=t,this.row=e,this.x=n,this.z=i,this.startZ=i,this.targetZ=i,this.count=Math.max(1,Math.floor(r)),this.hitTimer=0,this.spawnTimer=1,this.isDangerRow=!1,this.warningMesh.visible=!1,this.glowMat.opacity=0,this.root.position.set(n,0,i),this.visualGroup.scale.set(.01,.01,.01),this.root.visible=!0,this._redrawTextureAndColors()}onHit(t=1){return this.count-=t,this.hitTimer=1,this.count<=0?(this.count=0,!0):(this._redrawTextureAndColors(),!1)}setDangerWarning(t){this.isDangerRow=t,this.warningMesh.visible=t}update(t){if(this.active){if(this.spawnTimer>0){this.spawnTimer=Math.max(0,this.spawnTimer-t*5);const e=1-this.spawnTimer,n=e<.7?e/.7*1.12:1.12-(e-.7)/.3*.12;this.visualGroup.scale.set(n,n,n)}else if(this.hitTimer>0){this.hitTimer=Math.max(0,this.hitTimer-t*7.5);const e=Math.sin(this.hitTimer*Math.PI),n=1+e*.14,i=1-e*.12;this.visualGroup.scale.set(n,i,n),this.glowMat.opacity=this.hitTimer*.75;const r=1+(1-this.hitTimer)*.25;this.glowMesh.scale.set(r,r,1)}else this.visualGroup.scale.set(1,1,1),this.glowMat.opacity=0;if(this.isDangerRow){this.warningPulseTime+=t*6,this.warningMat.opacity=.55+Math.sin(this.warningPulseTime)*.4;const e=.92+Math.sin(this.warningPulseTime)*.1;this.warningMesh.scale.set(e,e,1)}}}applySlideProgress(t){this.z=fr(this.startZ,this.targetZ,t),this.root.position.z=this.z}_redrawTextureAndColors(){const t=Ag(this.count);this.currentColorHex=t.top,this.sideMat.color.setHex(t.side),this.glowMat.color.setHex(t.top);const e=this.ctx,n=256,i=256,r=n*.5,a=i*.5;e.clearRect(0,0,n,i),e.fillStyle=t.cssTop,e.beginPath(),e.arc(r,a,126,0,Math.PI*2),e.fill(),e.strokeStyle=t.cssRim,e.lineWidth=12,e.beginPath(),e.arc(r,a,118,0,Math.PI*2),e.stroke();const o=String(this.count),l=o.length>=3?88:o.length===2?108:118;e.font=`900 ${l}px "Arial Black", "Segoe UI", Impact, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0, 0, 0, 0.22)",e.fillText(o,r,a+8),e.fillStyle="#ffffff",e.fillText(o,r,a+2),this.topTexture.needsUpdate=!0}reset(){this.active=!1,this.root.visible=!1,this.warningMesh.visible=!1,this.isDangerRow=!1,this.hitTimer=0,this.spawnTimer=0}}const Bg=.52,Og=new Kn(.28,20,16),zg=new In(.38,.5,24),Gg=new pn(.32,16),Hg=new mn({color:16777215,roughness:.18,metalness:.05,emissive:8454122,emissiveIntensity:.35}),kg=new Jt({color:983590,transparent:!0,opacity:.4,depthWrite:!1});let $i=null;function Vg(){if($i)return $i;const s=document.createElement("canvas");s.width=128,s.height=64;const t=s.getContext("2d");return t.clearRect(0,0,128,64),t.font='900 44px "Arial Black", "Segoe UI", sans-serif',t.textAlign="center",t.textBaseline="middle",t.lineWidth=6,t.strokeStyle="#1b0340",t.strokeText("+1",64,34),t.fillStyle="#52ff9a",t.fillText("+1",64,34),$i=new Ln(s),$i.colorSpace=fe,$i}const Wg=new je(.72,.36);class Xg{constructor(){this.radius=Bg,this.root=new ze,this.root.visible=!1,this.sphereMesh=new Ht(Og,Hg),this.sphereMesh.position.y=.34,this.root.add(this.sphereMesh),this.ringMat=new Jt({color:5439386,transparent:!0,opacity:.85,side:pe,depthWrite:!1}),this.ringMesh=new Ht(zg,this.ringMat),this.ringMesh.rotation.x=-Math.PI*.5,this.ringMesh.position.y=.04,this.root.add(this.ringMesh),this.shadowMesh=new Ht(Gg,kg),this.shadowMesh.rotation.x=-Math.PI*.5,this.shadowMesh.position.set(-.1,.015,.14),this.root.add(this.shadowMesh),this.badgeMat=new Jt({map:Vg(),transparent:!0,depthWrite:!1}),this.badgeMesh=new Ht(Wg,this.badgeMat),this.badgeMesh.rotation.x=-Math.PI*.38,this.badgeMesh.position.set(0,.82,-.05),this.root.add(this.badgeMesh),this.active=!1,this.col=0,this.row=0,this.x=0,this.z=0,this.startZ=0,this.targetZ=0,this.animTime=0}init(t,e,n,i){this.active=!0,this.col=t,this.row=e,this.x=n,this.z=i,this.startZ=i,this.targetZ=i,this.animTime=Math.random()*Math.PI*2,this.root.position.set(n,0,i),this.root.visible=!0}update(t){if(!this.active)return;this.animTime+=t*4.5,this.sphereMesh.position.y=.34+Math.sin(this.animTime)*.08;const e=1+Math.sin(this.animTime*1.3)*.14;this.ringMesh.scale.set(e,e,1),this.ringMat.opacity=.65+Math.sin(this.animTime*1.3)*.25}applySlideProgress(t){this.z=fr(this.startZ,this.targetZ,t),this.root.position.z=this.z}reset(){this.active=!1,this.root.visible=!1}}const qg=.52,Rl=.36,Yg=.11,bc=new ds(Rl,Rl,Yg,28);bc.rotateX(Math.PI*.5);const Zg=new In(.36,.48,24),$g=new pn(.32,16),Jg=new Jt({color:983558,transparent:!0,opacity:.42,depthWrite:!1});let Ji=null;function Kg(){if(Ji)return Ji;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=64,n=64,i=t.createLinearGradient(0,0,128,128);return i.addColorStop(0,"#fff099"),i.addColorStop(.45,"#ffcc00"),i.addColorStop(1,"#d48800"),t.fillStyle=i,t.beginPath(),t.arc(e,n,62,0,Math.PI*2),t.fill(),t.fillStyle="#e69d00",t.beginPath(),t.arc(e,n,46,0,Math.PI*2),t.fill(),t.strokeStyle="#fff5b8",t.lineWidth=4,t.beginPath(),t.arc(e,n,46,0,Math.PI*2),t.stroke(),t.fillStyle="#fff6bf",t.beginPath(),t.roundRect(56,36,16,56,8),t.fill(),Ji=new Ln(s),Ji.colorSpace=fe,Ji}const jg=new mn({color:16758528,roughness:.25,metalness:.35,emissive:10050560,emissiveIntensity:.25});let Vs=null;function Qg(){return Vs||(Vs=new Jt({map:Kg()})),[jg,Vs,Vs]}class t_{constructor(){this.radius=qg,this.root=new ze,this.root.visible=!1,this.coinMesh=new Ht(bc,Qg()),this.coinMesh.position.y=.44,this.root.add(this.coinMesh),this.ringMat=new Jt({color:16766720,transparent:!0,opacity:.75,side:pe,depthWrite:!1}),this.ringMesh=new Ht(Zg,this.ringMat),this.ringMesh.rotation.x=-Math.PI*.5,this.ringMesh.position.y=.035,this.root.add(this.ringMesh),this.shadowMesh=new Ht($g,Jg),this.shadowMesh.rotation.x=-Math.PI*.5,this.shadowMesh.position.set(-.1,.015,.14),this.root.add(this.shadowMesh),this.active=!1,this.col=0,this.row=0,this.x=0,this.z=0,this.startZ=0,this.targetZ=0,this.animTime=0}init(t,e,n,i){this.active=!0,this.col=t,this.row=e,this.x=n,this.z=i,this.startZ=i,this.targetZ=i,this.animTime=Math.random()*Math.PI*2,this.root.position.set(n,0,i),this.root.visible=!0}update(t){if(!this.active)return;this.animTime+=t*3.8,this.coinMesh.rotation.y=this.animTime,this.coinMesh.position.y=.44+Math.sin(this.animTime*1.2)*.07;const e=.95+Math.sin(this.animTime*1.5)*.12;this.ringMesh.scale.set(e,e,1),this.ringMat.opacity=.55+Math.sin(this.animTime*1.5)*.25}applySlideProgress(t){this.z=fr(this.startZ,this.targetZ,t),this.root.position.z=this.z}reset(){this.active=!1,this.root.visible=!1}}const e_=.54,n_=new Kn(.3,20,16),i_=new In(.4,.54,24),s_=new pn(.34,16),r_=new je(.95,.42),Pl=new mn({color:16736768,roughness:.16,metalness:.12,emissive:16721408,emissiveIntensity:.85}),a_=new mn({color:7403775,roughness:.14,metalness:.08,emissive:55807,emissiveIntensity:.72,transparent:!0,opacity:.86}),o_=new Jt({color:983590,transparent:!0,opacity:.42,depthWrite:!1});let Ki=null;function l_(){if(Ki)return Ki;const s=document.createElement("canvas");s.width=160,s.height=72;const t=s.getContext("2d");return t.clearRect(0,0,160,72),t.font='900 34px "Arial Black", "Segoe UI", sans-serif',t.textAlign="center",t.textBaseline="middle",t.lineWidth=7,t.strokeStyle="#3d0800",t.strokeText("FIRE",80,38),t.fillStyle="#ffae2b",t.fillText("FIRE",80,38),Ki=new Ln(s),Ki.colorSpace=fe,Ki}let ji=null;function c_(){if(ji)return ji;const s=document.createElement("canvas");s.width=160,s.height=72;const t=s.getContext("2d");return t.clearRect(0,0,160,72),t.font='900 32px "Arial Black", "Segoe UI", sans-serif',t.textAlign="center",t.textBaseline="middle",t.lineWidth=7,t.strokeStyle="#032b3d",t.strokeText("GHOST",80,38),t.fillStyle="#75faff",t.fillText("GHOST",80,38),ji=new Ln(s),ji.colorSpace=fe,ji}const Ll=new Jt({map:l_(),transparent:!0,depthWrite:!1}),h_=new Jt({map:c_(),transparent:!0,depthWrite:!1});class u_{constructor(){this.radius=e_,this.root=new ze,this.root.visible=!1,this.sphereMesh=new Ht(n_,Pl),this.sphereMesh.position.y=.36,this.root.add(this.sphereMesh),this.ringMat=new Jt({color:16738816,transparent:!0,opacity:.88,side:pe,depthWrite:!1}),this.ringMesh=new Ht(i_,this.ringMat),this.ringMesh.rotation.x=-Math.PI*.5,this.ringMesh.position.y=.04,this.root.add(this.ringMesh),this.shadowMesh=new Ht(s_,o_),this.shadowMesh.rotation.x=-Math.PI*.5,this.shadowMesh.position.set(-.1,.015,.14),this.root.add(this.shadowMesh),this.badgeMesh=new Ht(r_,Ll),this.badgeMesh.rotation.x=-Math.PI*.38,this.badgeMesh.position.set(0,.86,-.05),this.root.add(this.badgeMesh),this.active=!1,this.type="fire",this.col=0,this.row=0,this.x=0,this.z=0,this.startZ=0,this.targetZ=0,this.animTime=0}init(t,e,n,i,r="fire"){this.active=!0,this.type=r,this.col=t,this.row=e,this.x=n,this.z=i,this.startZ=i,this.targetZ=i,this.animTime=Math.random()*Math.PI*2,r==="fire"?(this.sphereMesh.material=Pl,this.ringMat.color.setHex(16738816),this.badgeMesh.material=Ll):(this.sphereMesh.material=a_,this.ringMat.color.setHex(4714751),this.badgeMesh.material=h_),this.root.position.set(n,0,i),this.root.visible=!0}update(t){if(!this.active)return;this.animTime+=t*5.2,this.sphereMesh.position.y=.36+Math.sin(this.animTime)*.09;const e=1+Math.sin(this.animTime*1.6)*.08;this.sphereMesh.scale.setScalar(e);const n=1+Math.sin(this.animTime*1.4)*.16;this.ringMesh.scale.set(n,n,1),this.ringMat.opacity=.55+Math.sin(this.animTime*1.4)*.35}applySlideProgress(t){this.z=fr(this.startZ,this.targetZ,t),this.root.position.z=this.z}reset(){this.active=!1,this.root.visible=!1}}class _i{constructor(t,e,n=16){this.factoryFn=t,this.resetFn=e,this.freeList=[];for(let i=0;i<n;i++)this.freeList.push(this.factoryFn())}acquire(){return this.freeList.length>0?this.freeList.pop():this.factoryFn()}release(t){this.resetFn&&this.resetFn(t),this.freeList.push(t)}clear(){this.freeList.length=0}}const f_=new Fi(.28,.28,.28);class d_{constructor(t){this.parentGroup=t,this.activeParticles=[],this.pool=new _i(()=>{const e=new mn({color:16726820,roughness:.35,metalness:.05}),n=new Ht(f_,e);return n.visible=!1,this.parentGroup.add(n),{mesh:n,mat:e,x:0,y:0,z:0,vx:0,vy:0,vz:0,rx:0,ry:0,rz:0,life:0,maxLife:.7,baseScale:1}},e=>{e.mesh.visible=!1},90)}spawnCylinderShatter(t,e,n,i=16){for(let r=0;r<i;r++){const a=this.pool.acquire();a.mat.color.setHex(n);const o=r/i*Math.PI*2+ue(-.25,.25),l=ue(2.2,6.2);a.x=t+Math.cos(o)*ue(.05,.35),a.y=ue(.2,.65),a.z=e+Math.sin(o)*ue(.05,.35),a.vx=Math.cos(o)*l,a.vy=ue(3.2,7.2),a.vz=Math.sin(o)*l,a.rx=ue(-12,12),a.ry=ue(-12,12),a.rz=ue(-12,12),a.maxLife=ue(.48,.82),a.life=a.maxLife,a.baseScale=ue(.75,1.35),a.mesh.position.set(a.x,a.y,a.z),a.mesh.scale.setScalar(a.baseScale),a.mesh.visible=!0,this.activeParticles.push(a)}}spawnPickupBurst(t,e,n=5439386){this.spawnCylinderShatter(t,e,n,10)}update(t){for(let n=this.activeParticles.length-1;n>=0;n--){const i=this.activeParticles[n];if(i.life-=t,i.life<=0){this.pool.release(i);const o=this.activeParticles.pop();n<this.activeParticles.length&&(this.activeParticles[n]=o);continue}i.vy-=20*t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<.14&&(i.y=.14,i.vy=Math.abs(i.vy)*.45,i.vx*=.82,i.vz*=.82),i.mesh.position.set(i.x,i.y,i.z),i.mesh.rotation.x+=i.rx*t,i.mesh.rotation.y+=i.ry*t,i.mesh.rotation.z+=i.rz*t;const r=i.life/i.maxLife,a=i.baseScale*(r<.35?r/.35:1);i.mesh.scale.setScalar(a)}}clearAll(){for(;this.activeParticles.length>0;){const t=this.activeParticles.pop();this.pool.release(t)}}}class p_{constructor(){this.isYTEnvironment=typeof window<"u"&&typeof window.ytgame<"u",this.audioEnabled=!0,this.isPaused=!1,this.pauseCallbacks=[],this.resumeCallbacks=[],this.audioChangeCallbacks=[],this._init()}_init(){if(this.isYTEnvironment&&window.ytgame)try{window.ytgame.system&&(this.audioEnabled=window.ytgame.system.isAudioEnabled(),window.ytgame.system.onAudioEnabledChange(t=>{this.audioEnabled=!!t,this._notifyAudioChange()}),window.ytgame.system.onPause(()=>{this._triggerPause()}),window.ytgame.system.onResume(()=>{this._triggerResume()}))}catch(t){console.warn("[YouTubeSDK] Failed to bind ytgame listeners, using fallback:",t)}document.addEventListener("visibilitychange",()=>{document.hidden?this._triggerPause():this._triggerResume()}),window.addEventListener("focus",()=>{document.hidden||this._triggerResume()})}firstFrameReady(){if(this.isYTEnvironment&&window.ytgame?.engagement?.firstFrameReady)try{window.ytgame.engagement.firstFrameReady()}catch(t){console.warn("[YouTubeSDK] firstFrameReady error:",t)}}gameReady(){if(this.isYTEnvironment&&window.ytgame?.gameReady)try{window.ytgame.gameReady()}catch(t){console.warn("[YouTubeSDK] gameReady error:",t)}}sendScore(t){if(this.isYTEnvironment&&window.ytgame?.engagement?.sendScore)try{window.ytgame.engagement.sendScore({value:Math.floor(t)})}catch(e){console.warn("[YouTubeSDK] sendScore error:",e)}}onPause(t){this.pauseCallbacks.push(t)}onResume(t){this.resumeCallbacks.push(t)}onAudioChange(t){this.audioChangeCallbacks.push(t)}setLocalAudioEnabled(t){this.audioEnabled=!!t,this._notifyAudioChange()}_triggerPause(){if(!this.isPaused){this.isPaused=!0;for(let t=0;t<this.pauseCallbacks.length;t++)this.pauseCallbacks[t]()}}_triggerResume(){if(this.isPaused){this.isPaused=!1;for(let t=0;t<this.resumeCallbacks.length;t++)this.resumeCallbacks[t]()}}_notifyAudioChange(){for(let t=0;t<this.audioChangeCallbacks.length;t++)this.audioChangeCallbacks[t](this.audioEnabled)}}const Ue=new p_;class m_{constructor(){this.ctx=null,this.isMuted=!Ue.audioEnabled,this.isSuspendedByPlatform=!1,this.lastHitTime=0,this.hitCombo=0,Ue.onAudioChange(t=>{this.isMuted=!t,this._updateContextState()}),Ue.onPause(()=>{this.isSuspendedByPlatform=!0,this._updateContextState()}),Ue.onResume(()=>{this.isSuspendedByPlatform=!1,this._updateContextState()})}unlock(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&!this.isMuted&&!this.isSuspendedByPlatform&&this.ctx.resume().catch(()=>{})}_updateContextState(){this.ctx&&(this.isMuted||this.isSuspendedByPlatform?this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{}):this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}))}_canPlay(){return this.ctx&&!this.isMuted&&!this.isSuspendedByPlatform&&this.ctx.state==="running"}resetCombo(){this.hitCombo=0}playLaunchPop(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(280,t),e.frequency.exponentialRampToValueAtTime(520,t+.045),n.gain.setValueAtTime(.08,t),n.gain.exponentialRampToValueAtTime(.001,t+.05),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.055)}playCylinderHit(t){if(!this._canPlay())return;const e=this.ctx.currentTime;if(e-this.lastHitTime<.022)return;this.lastHitTime=e,this.hitCombo=Math.min(this.hitCombo+1,24);const n=this.ctx.createOscillator(),i=this.ctx.createGain(),r=260+Math.max(0,35-Math.min(t,35))*8+this.hitCombo*6;n.type="triangle",n.frequency.setValueAtTime(r,e),n.frequency.exponentialRampToValueAtTime(r*1.35,e+.04),i.gain.setValueAtTime(.11,e),i.gain.exponentialRampToValueAtTime(.001,e+.055),n.connect(i),i.connect(this.ctx.destination),n.start(e),n.stop(e+.06)}playCylinderDestroy(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[330,495,660];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type=n===0?"square":"triangle",i.frequency.setValueAtTime(e[n],t),i.frequency.exponentialRampToValueAtTime(e[n]*.55,t+.14),r.gain.setValueAtTime(.08/(n+1),t),r.gain.exponentialRampToValueAtTime(.001,t+.15),i.connect(r),r.connect(this.ctx.destination),i.start(t),i.stop(t+.16)}}playExtraBallPickup(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[587.33,880,1174.66];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain(),a=t+n*.04;i.type="sine",i.frequency.setValueAtTime(e[n],a),r.gain.setValueAtTime(.12,a),r.gain.exponentialRampToValueAtTime(.001,a+.14),i.connect(r),r.connect(this.ctx.destination),i.start(a),i.stop(a+.15)}}playCoinPickup(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[987.77,1318.51];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain(),a=t+n*.055;i.type="sine",i.frequency.setValueAtTime(e[n],a),r.gain.setValueAtTime(.13,a),r.gain.exponentialRampToValueAtTime(.001,a+.18),i.connect(r),r.connect(this.ctx.destination),i.start(a),i.stop(a+.19)}}playWallBounce(){if(!this._canPlay())return;const t=this.ctx.currentTime;if(t-this.lastHitTime<.035)return;this.lastHitTime=t;const e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(190,t),e.frequency.exponentialRampToValueAtTime(120,t+.035),n.gain.setValueAtTime(.05,t),n.gain.exponentialRampToValueAtTime(.001,t+.04),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.045)}playGameOver(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[392,349.23,311.13,261.63];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain(),a=t+n*.11;i.type="sawtooth",i.frequency.setValueAtTime(e[n],a),r.gain.setValueAtTime(.09,a),r.gain.exponentialRampToValueAtTime(.001,a+.22),i.connect(r),r.connect(this.ctx.destination),i.start(a),i.stop(a+.23)}}playUpgradePurchase(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[523.25,659.25,783.99,1046.5];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain(),a=t+n*.045;i.type="triangle",i.frequency.setValueAtTime(e[n],a),r.gain.setValueAtTime(.14,a),r.gain.exponentialRampToValueAtTime(.001,a+.18),i.connect(r),r.connect(this.ctx.destination),i.start(a),i.stop(a+.19)}}playSpecialPowerPickup(t="fire"){if(!this._canPlay())return;const e=this.ctx.currentTime,n=t==="fire"?[440,659.25,880,1174.66]:[523.25,783.99,1046.5,1318.51];for(let i=0;i<n.length;i++){const r=this.ctx.createOscillator(),a=this.ctx.createGain(),o=e+i*.038;r.type=t==="fire"?"sawtooth":"sine",r.frequency.setValueAtTime(n[i],o),a.gain.setValueAtTime(t==="fire"?.09:.12,o),a.gain.exponentialRampToValueAtTime(.001,o+.17),r.connect(a),a.connect(this.ctx.destination),r.start(o),r.stop(o+.18)}}playFireBlast(){if(!this._canPlay())return;const t=this.ctx.currentTime,e=[180,320,540];for(let n=0;n<e.length;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type=n===0?"sawtooth":"square",i.frequency.setValueAtTime(e[n],t),i.frequency.exponentialRampToValueAtTime(e[n]*.35,t+.19),r.gain.setValueAtTime(.11/(n+1),t),r.gain.exponentialRampToValueAtTime(.001,t+.2),i.connect(r),r.connect(this.ctx.destination),i.start(t),i.stop(t+.21)}}playGhostPierce(){if(!this._canPlay())return;const t=this.ctx.currentTime;if(t-this.lastHitTime<.02)return;this.lastHitTime=t;const e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(740,t),e.frequency.exponentialRampToValueAtTime(1180,t+.065),n.gain.setValueAtTime(.09,t),n.gain.exponentialRampToValueAtTime(.001,t+.075),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.08)}}const qt=new m_,Qi="heroballs_coins",Il="heroballs_starting_balls",Dl="heroballs_best_wave",Ul="heroballs_best_hits",$r="heroballs_ghost_charges",Jr="heroballs_fire_charges",Ws=10,Xs=15;class g_{constructor(){this.coins=this._loadInt(Qi,0),this.startingBalls=Math.max(1,this._loadInt(Il,1)),this.bestWave=Math.max(1,this._loadInt(Dl,1)),this.bestHits=Math.max(0,this._loadInt(Ul,0)),this.ghostCharges=Math.max(0,this._loadInt($r,0)),this.fireCharges=Math.max(0,this._loadInt(Jr,0))}_loadInt(t,e){try{const n=window.localStorage.getItem(t);if(n!==null){const i=parseInt(n,10);if(!Number.isNaN(i)&&i>=0)return i}}catch{}return e}_saveInt(t,e){try{window.localStorage.setItem(t,String(Math.floor(e)))}catch{}}getCoins(){return this.coins}addCoins(t=1){return this.coins=Math.max(0,this.coins+t),this._saveInt(Qi,this.coins),this.coins}getStartingBalls(){return this.startingBalls}getBestWave(){return this.bestWave}getBestHits(){return this.bestHits}getGhostCharges(){return this.ghostCharges}getFireCharges(){return this.fireCharges}getGhostBallCost(){return Ws}getFireBallCost(){return Xs}canAffordGhostBall(){return this.coins>=Ws}canAffordFireBall(){return this.coins>=Xs}buyGhostBall(){return this.coins<Ws?!1:(this.coins-=Ws,this.ghostCharges+=1,this._saveInt(Qi,this.coins),this._saveInt($r,this.ghostCharges),!0)}buyFireBall(){return this.coins<Xs?!1:(this.coins-=Xs,this.fireCharges+=1,this._saveInt(Qi,this.coins),this._saveInt(Jr,this.fireCharges),!0)}consumeGhostCharge(){return this.ghostCharges<=0?!1:(this.ghostCharges-=1,this._saveInt($r,this.ghostCharges),!0)}consumeFireCharge(){return this.fireCharges<=0?!1:(this.fireCharges-=1,this._saveInt(Jr,this.fireCharges),!0)}updateHighScores(t,e){t>this.bestWave&&(this.bestWave=t,this._saveInt(Dl,this.bestWave)),e>this.bestHits&&(this.bestHits=e,this._saveInt(Ul,this.bestHits))}getStartingBallUpgradeCost(){const t=this.startingBalls;return Math.round(10+(t-1)*3.5+.5*(t-1)*(t-1))}canAffordStartingBallUpgrade(){return this.coins>=this.getStartingBallUpgradeCost()}buyStartingBallUpgrade(){const t=this.getStartingBallUpgradeCost();return this.coins<t?!1:(this.coins-=t,this.startingBalls+=1,this._saveInt(Qi,this.coins),this._saveInt(Il,this.startingBalls),!0)}}const Vt=new g_,qs=7,Ys=1.32,vi=1.32,De=4.72,gi=-6.35,Zs=1.25,xi=-5.16,__=7,ss=8,Te=xi+ss*vi,ts=17.5,v_=.052,Nl=8,Tn="AIMING",Kr="FIRING",Fl="ADVANCING",x_="GAMEOVER";class M_{constructor(t,e,n){this.scene=t,this.camera=e,this.ui=n,this.boardGroup=new ze,this.scene.add(this.boardGroup),this.ballPool=new _i(()=>{const i=new Al;return this.boardGroup.add(i.root),i},i=>i.reset(),40),this.cylinderPool=new _i(()=>{const i=new Fg;return this.boardGroup.add(i.root),i},i=>i.reset(),42),this.pickupPool=new _i(()=>{const i=new Xg;return this.boardGroup.add(i.root),i},i=>i.reset(),10),this.coinPool=new _i(()=>{const i=new t_;return this.boardGroup.add(i.root),i},i=>i.reset(),12),this.specialPickupPool=new _i(()=>{const i=new u_;return this.boardGroup.add(i.root),i},i=>i.reset(),8),this.particles=new d_(this.boardGroup),this.activeBalls=[],this.activeCylinders=[],this.activePickups=[],this.activeCoins=[],this.activeSpecialPickups=[],this.state=Tn,this.wave=1,this.totalBalls=Vt.getStartingBalls(),this.pendingExtraBalls=0,this.rowsSinceExtraBall=0,this.rowsSinceSpecialBall=0,this.hasFiredFirstShot=!1,this.activeFirePower=!1,this.activeGhostPower=!1,this.pendingFirePower=!1,this.pendingGhostPower=!1,this.fireBallsRemainingToEmit=0,this.ghostBallsRemainingToEmit=0,this.launchX=0,this.nextLaunchX=0,this.hasFirstReturnedBall=!1,this.ballsRemainingToFire=0,this.fireTimer=0,this.fireDirX=0,this.fireDirZ=-1,this.flightElapsed=0,this.speedMultiplier=1,this.advanceTimer=0,this.advanceDuration=.28,this._setupLights(),this._buildBackgroundStarfield(),this._build3DBoard(),this._buildLauncherVisuals(),this._buildAimVisuals(),this.startNewGame()}_setupLights(){const t=new _g(16774635,1.38);this.scene.add(t);const e=new El(16773851,1.48);e.position.set(6,18,-8),this.scene.add(e);const n=new El(16749645,.58);n.position.set(-8,10,10),this.scene.add(n)}_buildBackgroundStarfield(){const e=new je(.22,.22),n=new Jt({color:16773316,transparent:!0,opacity:.8,depthWrite:!1});this.bgStars=new Um(e,n,48),this.bgStarData=[],this._starDummy=new ve;const i=this._starDummy;for(let r=0;r<48;r++){let a,o,l,c,h;r<24?(a="top",o=-7.5,l=7.5,c=-15.5,h=-6.7):r%2===0?(a="left",o=-18.5,l=-5.6,c=-15,h=12):(a="right",o=5.6,l=18.5,c=-15,h=12);const f=ue(o,l),u=ue(c,h),p=ue(-2.2,-.2),g=ue(.55,1.45);i.position.set(f,p,u),i.rotation.x=-Math.PI*.35,i.scale.setScalar(g),i.updateMatrix(),this.bgStars.setMatrixAt(r,i.matrix),this.bgStarData.push({zone:a,x:f,y:p,z:u,minX:o,maxX:l,minZ:c,maxZ:h,maxScale:g,vx:ue(-.85,.85),vz:ue(-1.6,-.45),twinkleSpeed:ue(1.8,4.8),twinklePhase:ue(0,Math.PI*2),rotZ:ue(0,Math.PI*2),rotSpeed:ue(-2.2,2.2)})}this.scene.add(this.bgStars)}_build3DBoard(){const t=document.createElement("canvas");t.width=64,t.height=512;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,512);n.addColorStop(0,"#541822"),n.addColorStop(.28,"#380d15"),n.addColorStop(.48,"#21060b"),n.addColorStop(1,"#110205"),e.fillStyle=n,e.fillRect(0,0,64,512);const i=new Ln(t);i.colorSpace=fe;const r=De,a=gi,o=Zs,l=new ar;l.moveTo(-r,-26),l.lineTo(-r,-a-o),l.absarc(-r+o,-a-o,o,Math.PI,Math.PI*.5,!0),l.lineTo(r-o,-a),l.absarc(r-o,-a-o,o,Math.PI*.5,0,!0),l.lineTo(r,-26),l.closePath();const c=new no(l,64),h=c.attributes.position,f=c.attributes.uv;for(let R=0;R<h.count;R++){const A=h.getY(R),P=(h.getX(R)+r)/(r*2),y=(A- -26)/(-a- -26);f.setXY(R,P,y)}const u=new Jt({map:i}),p=new Ht(c,u);p.rotation.x=-Math.PI*.5,p.position.y=0,this.boardGroup.add(p);const g=.4,_=.64,m=(R,A,P,y,x,C)=>{const H=r+R,F=r+A,V=a-R,X=a-A,k=o+R,$=o+A,O=new ar;O.moveTo(-F,-26),O.lineTo(-F,-X-$),O.absarc(-F+$,-X-$,$,Math.PI,Math.PI*.5,!0),O.lineTo(F-$,-X),O.absarc(F-$,-X-$,$,Math.PI*.5,0,!0),O.lineTo(F,-26),O.lineTo(H,-26),O.lineTo(H,-V-k),O.absarc(H-k,-V-k,k,0,Math.PI*.5,!1),O.lineTo(-H+k,-V),O.absarc(-H+k,-V-k,k,Math.PI*.5,Math.PI,!1),O.lineTo(-H,-26),O.closePath();const at=new eo(O,{depth:P,curveSegments:64,bevelEnabled:!1,steps:1}),ut=new Jt({color:x}),vt=new Jt({color:C}),It=new Ht(at,[ut,vt]);return It.rotation.x=-Math.PI*.5,It.position.y=y,It},d=m(0,g,.84,0,16777215,15917784);this.boardGroup.add(d);const b=m(g,_,.76,-.04,16752187,13915924);this.boardGroup.add(b);const E=new je((De-.85)*2,.075),M=new Jt({color:16777215,transparent:!0,opacity:.92}),N=new Ht(E,M);N.rotation.x=-Math.PI*.5,N.position.set(0,.02,Te),this.boardGroup.add(N)}_buildLauncherVisuals(){this.leadBall=new Al,this.leadBall.root.visible=!0,this.leadBall.trail.visible=!1,this.leadBall.x=0,this.leadBall.z=Te,this.leadBall.syncTransform(),this.boardGroup.add(this.leadBall.root);const t=new Kn(.24,16,12),e=new Jt({color:16777215,transparent:!0,opacity:.65});this.landingMarker=new Ht(t,e),this.landingMarker.position.set(0,.24,Te),this.landingMarker.visible=!1,this.boardGroup.add(this.landingMarker),this.ballCountCanvas=document.createElement("canvas"),this.ballCountCanvas.width=256,this.ballCountCanvas.height=96,this.ballCountCtx=this.ballCountCanvas.getContext("2d"),this.ballCountTexture=new Ln(this.ballCountCanvas),this.ballCountTexture.colorSpace=fe;const n=new je(2.6,.98),i=new Jt({map:this.ballCountTexture,transparent:!0,depthWrite:!1});this.ballCountMesh=new Ht(n,i),this.ballCountMesh.rotation.x=-Math.PI*.5,this.ballCountMesh.position.set(0,.03,Te+.72),this.boardGroup.add(this.ballCountMesh)}_updateBallCountDisplay(t){const e=this.ballCountCtx;e.clearRect(0,0,256,96),e.fillStyle="#ffffff",e.beginPath(),e.arc(82,48,19,0,Math.PI*2),e.fill(),e.font='900 54px "Arial Black", "Segoe UI", Impact, sans-serif',e.textAlign="left",e.textBaseline="middle",e.fillStyle="#ffffff",e.fillText(String(Math.max(0,t)),118,50),this.ballCountTexture.needsUpdate=!0}_buildAimVisuals(){this.aimGroup=new ze,this.aimGroup.visible=!1,this.boardGroup.add(this.aimGroup),this.aimDotCount=22,this.aimDots=[];const t=new Kn(.11,10,8),e=new Jt({color:16777215,transparent:!0,opacity:.9});for(let o=0;o<this.aimDotCount;o++){const l=new Ht(t,e);l.position.y=.24,this.aimGroup.add(l),this.aimDots.push(l)}const n=new we().setFromPoints([new I(0,.24,0),new I(0,.24,1)]),i=new gc({color:16737996,transparent:!0,opacity:.85});this.slingshotBand=new Nm(n,i),this.aimGroup.add(this.slingshotBand);const r=new In(.16,.28,20),a=new Jt({color:16737996,side:pe,transparent:!0,opacity:.9});this.slingshotHandle=new Ht(r,a),this.slingshotHandle.rotation.x=-Math.PI*.5,this.slingshotHandle.position.y=.05,this.aimGroup.add(this.slingshotHandle)}startNewGame(){for(;this.activeBalls.length>0;)this.ballPool.release(this.activeBalls.pop());for(;this.activeCylinders.length>0;)this.cylinderPool.release(this.activeCylinders.pop());for(;this.activePickups.length>0;)this.pickupPool.release(this.activePickups.pop());for(;this.activeCoins.length>0;)this.coinPool.release(this.activeCoins.pop());for(;this.activeSpecialPickups.length>0;)this.specialPickupPool.release(this.activeSpecialPickups.pop());this.particles.clearAll(),(this.wave>1||this.runHits>0)&&Vt.updateHighScores(this.wave,this.runHits||0),this.wave=1,this.runHits=0,this.totalBalls=Vt.getStartingBalls(),this.pendingExtraBalls=0,this.rowsSinceExtraBall=0,this.rowsSinceSpecialBall=0,this.hasFiredFirstShot=!1,this.starterShopDismissed=!1,this.activeFirePower=!1,this.activeGhostPower=!1,this.pendingFirePower=!1,this.pendingGhostPower=!1,this.fireBallsRemainingToEmit=0,this.ghostBallsRemainingToEmit=0,this.launchX=0,this.nextLaunchX=0,this.speedMultiplier=1,this.leadBall.x=0,this.leadBall.z=Te,this.leadBall.root.visible=!0,this.leadBall.setAppearance(Yn),this.leadBall.syncTransform(),this.landingMarker.visible=!1,this.aimGroup.visible=!1,this._spawnRowAt(0,1),this._updateBallCountDisplay(this.totalBalls),this.ui.onWaveUpdate(this.wave),this.ui.onStarsUpdate(Vt.getCoins(),!1),this.ui.onFastForwardVisibility(!1,!1),this.ui.onAimHintVisibility(!0),this.ui.onStarterShopVisibility(!0),this._syncLeadBallAndBanner(),this.state=Tn}applyStartingBallUpgrade(){this.totalBalls=Vt.getStartingBalls(),this._updateBallCountDisplay(this.totalBalls),this.particles.spawnPickupBurst(this.launchX,Te,5439386)}activateFirePower(){return this.state!==Tn||this.activeFirePower?!1:(this.activeFirePower=!0,this.particles.spawnPickupBurst(this.launchX,Te,16735744),this._syncLeadBallAndBanner(),!0)}activateGhostPower(){return this.state!==Tn||this.activeGhostPower?!1:(this.activeGhostPower=!0,this.particles.spawnPickupBurst(this.launchX,Te,5437439),this._syncLeadBallAndBanner(),!0)}_syncLeadBallAndBanner(){this.activeFirePower?this.leadBall.setAppearance(is):this.activeGhostPower?this.leadBall.setAppearance(Wn):this.leadBall.setAppearance(Yn),this.ui.onSpecialPowerChange&&this.ui.onSpecialPowerChange(this.activeFirePower,this.activeGhostPower)}updateAimPreview(t,e,n,i){if(this.state!==Tn||!t){this.aimGroup.visible=!1;return}this.aimGroup.visible=!0,this.starterShopDismissed||(this.starterShopDismissed=!0,this.ui.onStarterShopVisibility(!1),this.ui.onAimHintVisibility(!1));const r=i*1.45,a=this.launchX-e*r,o=Te-n*r,l=this.slingshotBand.geometry.attributes.position.array;l[0]=this.launchX,l[1]=.24,l[2]=Te,l[3]=a,l[4]=.24,l[5]=o,this.slingshotBand.geometry.attributes.position.needsUpdate=!0,this.slingshotHandle.position.set(a,.05,o);let c=this.launchX,h=Te,f=e,u=n;const p=.48,g=.26;let _=!1;for(let m=0;m<this.aimDotCount;m++){const b=p/6;for(let N=0;N<6;N++)if(c+=f*b,h+=u*b,c-g<-De?(c=-De+g,f=Math.abs(f),_=!0):c+g>De&&(c=De-g,f=-Math.abs(f),_=!0),h-g<gi&&(h=gi+g,u=Math.abs(u),_=!0),!_&&(!this.activeGhostPower||this.activeFirePower))for(let R=0;R<this.activeCylinders.length;R++){const A=this.activeCylinders[R],P=c-A.x,y=h-A.z,x=g+A.radius,C=P*P+y*y;if(C<x*x&&C>1e-5){const H=Math.sqrt(C),F=P/H,V=y/H;c=A.x+F*x,h=A.z+V*x;const X=f*F+u*V;X<0&&(f-=2*X*F,u-=2*X*V),_=!0;break}}const E=this.aimDots[m];E.position.set(c,.24,h);const M=(1-m/this.aimDotCount*.55)*(_?.78:1);E.scale.setScalar(M)}}launchBalls(t,e){if(this.state!==Tn)return;this.hasFiredFirstShot=!0,this.aimGroup.visible=!1,this.ui.onAimHintVisibility(!1),this.ui.onStarterShopVisibility(!1),qt.resetCombo(),this.fireBallsRemainingToEmit=this.activeFirePower?Math.min(3,this.totalBalls):0;const n=Math.max(0,this.totalBalls-this.fireBallsRemainingToEmit);this.ghostBallsRemainingToEmit=this.activeGhostPower?Math.min(5,n):0,this.state=Kr,this.fireDirX=t,this.fireDirZ=e,this.ballsRemainingToFire=this.totalBalls,this.pendingExtraBalls=0,this.fireTimer=0,this.flightElapsed=0,this.speedMultiplier=1,this.hasFirstReturnedBall=!1,this.nextLaunchX=this.launchX}toggleFastForward(){this.state===Kr&&(this.speedMultiplier=this.speedMultiplier===1?3:1,this.ui.onFastForwardVisibility(!0,this.speedMultiplier>1))}update(t){this._updateBackgroundStars(t),this.particles.update(t);for(let e=0;e<this.activeCylinders.length;e++)this.activeCylinders[e].update(t);for(let e=0;e<this.activePickups.length;e++)this.activePickups[e].update(t);for(let e=0;e<this.activeCoins.length;e++)this.activeCoins[e].update(t);for(let e=0;e<this.activeSpecialPickups.length;e++)this.activeSpecialPickups[e].update(t);this.state===Kr?this._updateFiringState(t):this.state===Fl&&this._updateAdvancingState(t)}_updateFiringState(t){this.flightElapsed+=t,this.flightElapsed>2.2&&this.ui.onFastForwardVisibility(!0,this.speedMultiplier>1);const e=t*this.speedMultiplier;if(this.ballsRemainingToFire>0)for(this.fireTimer-=e;this.fireTimer<=0&&this.ballsRemainingToFire>0;)this._spawnSingleBall(),this.ballsRemainingToFire--,this.fireTimer+=v_,this._updateBallCountDisplay(this.ballsRemainingToFire),this.ballsRemainingToFire===0&&(this.leadBall.root.visible=!1);const n=Nl*this.speedMultiplier,i=t/Nl;for(let r=0;r<n;r++)this._stepPhysics(i);for(let r=0;r<this.activeBalls.length;r++)this.activeBalls[r].syncTransform();this.ballsRemainingToFire===0&&this.activeBalls.length===0&&this._onAllBallsReturned()}_spawnSingleBall(){let t=Yn;this.fireBallsRemainingToEmit>0?(t=is,this.fireBallsRemainingToEmit--):this.ghostBallsRemainingToEmit>0&&(t=Wn,this.ghostBallsRemainingToEmit--),this.fireBallsRemainingToEmit>0?this.leadBall.setAppearance(is):this.ghostBallsRemainingToEmit>0?this.leadBall.setAppearance(Wn):this.leadBall.setAppearance(Yn);const e=this.ballPool.acquire();e.spawn(this.launchX,Te,this.fireDirX*ts,this.fireDirZ*ts,t),this.activeBalls.push(e),qt.playLaunchPop()}_stepPhysics(t){for(let e=this.activeBalls.length-1;e>=0;e--){const n=this.activeBalls[e];if(n.returningToLauncher){const i=this.nextLaunchX-n.x,r=28*t;Math.abs(i)<=r?this._recycleActiveBallAt(e):n.x+=Math.sign(i)*r;continue}if(n.ballType===Wn){const i=n.ghostCooldowns;for(let r=0;r<64;r++)i[r]>0&&(i[r]-=t)}if(n.x+=n.vx*t,n.z+=n.vz*t,n.vz>0&&n.z>=Te){n.z=Te,n.vx=0,n.vz=0,n.trail.visible=!1,this.hasFirstReturnedBall?n.returningToLauncher=!0:(this.hasFirstReturnedBall=!0,this.nextLaunchX=or(n.x,-De+.85,De-.85),this.landingMarker.position.x=this.nextLaunchX,this.landingMarker.visible=!0,this._recycleActiveBallAt(e));continue}this._resolveWallCollisions(n);for(let i=this.activePickups.length-1;i>=0;i--){const r=this.activePickups[i],a=n.x-r.x,o=n.z-r.z,l=n.radius+r.radius;if(a*a+o*o<=l*l){this.pendingExtraBalls++,qt.playExtraBallPickup(),this.particles.spawnPickupBurst(r.x,r.z,5439386),this.pickupPool.release(r);const c=this.activePickups.pop();i<this.activePickups.length&&(this.activePickups[i]=c)}}for(let i=this.activeCoins.length-1;i>=0;i--){const r=this.activeCoins[i],a=n.x-r.x,o=n.z-r.z,l=n.radius+r.radius;if(a*a+o*o<=l*l){const c=Vt.addCoins(1);this.ui.onStarsUpdate(c,!0),qt.playCoinPickup(),this.particles.spawnPickupBurst(r.x,r.z,16766720),this.coinPool.release(r);const h=this.activeCoins.pop();i<this.activeCoins.length&&(this.activeCoins[i]=h)}}for(let i=this.activeSpecialPickups.length-1;i>=0;i--){const r=this.activeSpecialPickups[i],a=n.x-r.x,o=n.z-r.z,l=n.radius+r.radius;if(a*a+o*o<=l*l){r.type==="fire"?(this.pendingFirePower=!0,qt.playSpecialPowerPickup("fire"),this.particles.spawnPickupBurst(r.x,r.z,16735744)):(this.pendingGhostPower=!0,qt.playSpecialPowerPickup("ghost"),this.particles.spawnPickupBurst(r.x,r.z,5437439)),this.specialPickupPool.release(r);const c=this.activeSpecialPickups.pop();i<this.activeSpecialPickups.length&&(this.activeSpecialPickups[i]=c)}}for(let i=this.activeCylinders.length-1;i>=0;i--){const r=this.activeCylinders[i],a=n.x-r.x,o=n.z-r.z,l=n.radius+r.radius,c=a*a+o*o;if(c<l*l){if(n.ballType===Wn){if(n.ghostCooldowns[r.uid]<=0)if(n.ghostCooldowns[r.uid]=.14,this.runHits+=1,r.onHit(1)){qt.playCylinderDestroy(),this.particles.spawnCylinderShatter(r.x,r.z,5437439,16),this.cylinderPool.release(r);const _=this.activeCylinders.pop();i<this.activeCylinders.length&&(this.activeCylinders[i]=_)}else qt.playGhostPierce(),this.particles.spawnPickupBurst(r.x,r.z,5437439);continue}const h=Math.sqrt(c)||1e-4,f=a/h,u=o/h;n.x=r.x+f*(l+.002),n.z=r.z+u*(l+.002);const p=n.vx*f+n.vz*u;if(p<0&&(n.vx-=2*p*f,n.vz-=2*p*u,this._normalizeAndPreventStall(n)),n.ballType===is){const g=r.count;this.runHits+=g,r.onHit(g),qt.playFireBlast(),this.particles.spawnCylinderShatter(r.x,r.z,16733440,22),this.cylinderPool.release(r);const _=this.activeCylinders.pop();i<this.activeCylinders.length&&(this.activeCylinders[i]=_)}else if(this.runHits+=1,r.onHit(1)){qt.playCylinderDestroy(),this.particles.spawnCylinderShatter(r.x,r.z,r.currentColorHex,16),this.cylinderPool.release(r);const _=this.activeCylinders.pop();i<this.activeCylinders.length&&(this.activeCylinders[i]=_)}else qt.playCylinderHit(r.count);break}}}}_resolveWallCollisions(t){const e=t.radius,n=gi+Zs,i=De-Zs;if(t.z<n&&Math.abs(t.x)>i){const r=Math.sign(t.x)*i,a=n,o=t.x-r,l=t.z-a,c=Math.hypot(o,l)||1e-4,h=Zs-e;if(c>h){const f=-o/c,u=-l/c;t.x=r-f*h,t.z=a-u*h;const p=t.vx*f+t.vz*u;p<0&&(t.vx-=2*p*f,t.vz-=2*p*u,this._normalizeAndPreventStall(t),qt.playWallBounce());return}}t.x-e<-De?(t.x=-De+e,t.vx<0&&(t.vx=-t.vx,this._normalizeAndPreventStall(t),qt.playWallBounce())):t.x+e>De&&(t.x=De-e,t.vx>0&&(t.vx=-t.vx,this._normalizeAndPreventStall(t),qt.playWallBounce())),t.z-e<gi&&(t.z=gi+e,t.vz<0&&(t.vz=-t.vz,this._normalizeAndPreventStall(t),qt.playWallBounce()))}_normalizeAndPreventStall(t){const n=ts*.14;Math.abs(t.vz)<n&&(t.vz=(t.vz>=0?1:-1)*n);const i=Math.hypot(t.vx,t.vz)||1;t.vx=t.vx/i*ts,t.vz=t.vz/i*ts}_recycleActiveBallAt(t){const e=this.activeBalls[t];this.ballPool.release(e);const n=this.activeBalls.pop();t<this.activeBalls.length&&(this.activeBalls[t]=n)}_onAllBallsReturned(){this.speedMultiplier=1,this.ui.onFastForwardVisibility(!1,!1),this.totalBalls+=this.pendingExtraBalls,this.pendingExtraBalls=0,this.activeFirePower=this.pendingFirePower,this.activeGhostPower=this.pendingGhostPower,this.pendingFirePower=!1,this.pendingGhostPower=!1,this.launchX=this.nextLaunchX,this.leadBall.x=this.launchX,this.leadBall.z=Te,this.leadBall.root.visible=!0,this.leadBall.syncTransform(),this.landingMarker.visible=!1,this._syncLeadBallAndBanner(),this._updateBallCountDisplay(this.totalBalls),this._beginRowAdvance()}_beginRowAdvance(){this.wave++,Vt.updateHighScores(this.wave,this.runHits),this.ui.onWaveUpdate(this.wave),Ue.sendScore(this.wave);for(let t=0;t<this.activeCylinders.length;t++){const e=this.activeCylinders[t];e.row+=1,e.startZ=e.z,e.targetZ=xi+e.row*vi}for(let t=this.activePickups.length-1;t>=0;t--){const e=this.activePickups[t];if(e.row+=1,e.row>=ss){this.pickupPool.release(e);const n=this.activePickups.pop();t<this.activePickups.length&&(this.activePickups[t]=n)}else e.startZ=e.z,e.targetZ=xi+e.row*vi}for(let t=this.activeCoins.length-1;t>=0;t--){const e=this.activeCoins[t];if(e.row+=1,e.row>=ss){this.coinPool.release(e);const n=this.activeCoins.pop();t<this.activeCoins.length&&(this.activeCoins[t]=n)}else e.startZ=e.z,e.targetZ=xi+e.row*vi}for(let t=this.activeSpecialPickups.length-1;t>=0;t--){const e=this.activeSpecialPickups[t];if(e.row+=1,e.row>=ss){this.specialPickupPool.release(e);const n=this.activeSpecialPickups.pop();t<this.activeSpecialPickups.length&&(this.activeSpecialPickups[t]=n)}else e.startZ=e.z,e.targetZ=xi+e.row*vi}this._spawnRowAt(0,this.wave),this.advanceTimer=0,this.state=Fl}_updateAdvancingState(t){this.advanceTimer+=t;const e=or(this.advanceTimer/this.advanceDuration,0,1),n=1-Math.pow(1-e,3);for(let i=0;i<this.activeCylinders.length;i++)this.activeCylinders[i].applySlideProgress(n);for(let i=0;i<this.activePickups.length;i++)this.activePickups[i].applySlideProgress(n);for(let i=0;i<this.activeCoins.length;i++)this.activeCoins[i].applySlideProgress(n);for(let i=0;i<this.activeSpecialPickups.length;i++)this.activeSpecialPickups[i].applySlideProgress(n);if(e>=1){let i=!1;for(let r=0;r<this.activeCylinders.length;r++){const a=this.activeCylinders[r];a.setDangerWarning(a.row===__),a.row>=ss&&(i=!0)}i?(this.state=x_,Vt.updateHighScores(this.wave,this.runHits),qt.playGameOver(),this.ui.onGameOver(this.wave,this.runHits)):this.state=Tn}}_spawnRowAt(t,e){const n=xi+t*vi,i=[0,1,2,3,4,5,6];for(let u=i.length-1;u>0;u--){const p=Math.floor(Math.random()*(u+1)),g=i[u];i[u]=i[p],i[p]=g}let r=0;if(this.rowsSinceExtraBall++,this.rowsSinceExtraBall>=3||Math.random()<.25){this.rowsSinceExtraBall=0;const u=i[r++],p=(u-(qs-1)*.5)*Ys,g=this.pickupPool.acquire();g.init(u,t,p,n),this.activePickups.push(g)}const o=e<=2?3:e<=5?4:5,c=Cl(e===1?2:1,o);let h,f;if(e===1)h=1,f=2;else if(e<=3)h=1,f=e+1;else{const u=Math.max(2,Math.round(e*.9));h=Math.max(2,Math.floor(u*.65)),f=Math.max(h+1,Math.ceil(u*1.35))}for(let u=0;u<c&&r<i.length;u++){const p=i[r++],g=(p-(qs-1)*.5)*Ys,_=Cl(h,f),m=this.cylinderPool.acquire();m.init(p,t,g,n,_),this.activeCylinders.push(m)}if(r<i.length&&(e===1||Math.random()<.65)){const u=i[r++],p=(u-(qs-1)*.5)*Ys,g=this.coinPool.acquire();g.init(u,t,p,n),this.activeCoins.push(g)}if(e>=2&&r<i.length&&(this.rowsSinceSpecialBall++,this.rowsSinceSpecialBall>=4||Math.random()<.22)){this.rowsSinceSpecialBall=0;const u=i[r++],p=(u-(qs-1)*.5)*Ys,g=Math.random()<.5?"fire":"ghost",_=this.specialPickupPool.acquire();_.init(u,t,p,n,g),this.activeSpecialPickups.push(_)}}_updateBackgroundStars(t){if(!this.bgStars)return;const e=this._starDummy;for(let n=0;n<this.bgStarData.length;n++){const i=this.bgStarData[n];i.twinklePhase+=t*i.twinkleSpeed,i.rotZ+=t*i.rotSpeed,i.x+=i.vx*t,i.z+=i.vz*t,i.x<i.minX?i.x=i.maxX:i.x>i.maxX&&(i.x=i.minX),i.z<i.minZ?i.z=i.maxZ:i.z>i.maxZ&&(i.z=i.minZ);const r=.5+.5*Math.sin(i.twinklePhase),a=i.maxScale*(.06+Math.pow(r,2)*1.15);e.position.set(i.x,i.y,i.z),e.rotation.set(-Math.PI*.35,0,i.rotZ),e.scale.setScalar(a),e.updateMatrix(),this.bgStars.setMatrixAt(n,e.matrix)}this.bgStars.instanceMatrix.needsUpdate=!0}canAcceptInput(){return this.state===Tn}}class S_{constructor(t){this.el=t,this.enabled=!0,this.isDragging=!1,this.activePointerId=null,this.startX=0,this.startY=0,this.currentX=0,this.currentY=0,this.aimDirX=0,this.aimDirY=-1,this.pullStrength=0,this.isValidAim=!1,this.onAimUpdateCallback=null,this.onAimReleaseCallback=null,this.onAimCancelCallback=null,this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerCancel=this._onPointerCancel.bind(this),this._bindEvents()}_bindEvents(){this.el.addEventListener("pointerdown",this._onPointerDown,{passive:!1}),window.addEventListener("pointermove",this._onPointerMove,{passive:!1}),window.addEventListener("pointerup",this._onPointerUp,{passive:!1}),window.addEventListener("pointercancel",this._onPointerCancel,{passive:!1})}setCallbacks({onAimUpdate:t,onAimRelease:e,onAimCancel:n}){this.onAimUpdateCallback=t,this.onAimReleaseCallback=e,this.onAimCancelCallback=n}cancelDrag(){!this.isPointerDown&&!this.isDragging||(this.isPointerDown=!1,this.isDragging=!1,this.activePointerId=null,this.isValidAim=!1,this.pullStrength=0,this.onAimCancelCallback&&this.onAimCancelCallback())}_onPointerDown(t){qt.unlock(),!(!this.enabled||this.isPointerDown)&&(t.target&&t.target.closest&&(t.target.closest(".overlay-modal.visible")||t.target.closest("#btn-pause")||t.target.closest("#btn-fast-forward")||t.target.closest(".ability-hud-btn"))||(this.isPointerDown=!0,this.isDragging=!1,this.justDragged=!1,this.activePointerId=t.pointerId,this.startX=t.clientX,this.startY=t.clientY,this.currentX=t.clientX,this.currentY=t.clientY,this.isValidAim=!1,this.pullStrength=0))}_onPointerMove(t){if(!this.isPointerDown||t.pointerId!==this.activePointerId)return;if(!this.enabled){this.cancelDrag();return}this.currentX=t.clientX,this.currentY=t.clientY;const e=this.currentX-this.startX,n=this.currentY-this.startY,i=Math.hypot(e,n);if(i<6){this.isDragging&&(this.isValidAim=!1,this.pullStrength=0,this.onAimUpdateCallback&&this.onAimUpdateCallback(!1,0,-1,0));return}this.isDragging=!0,this.justDragged=!0;let r=0,a=-1;n>3?(r=-e,a=-n):n<-3?(r=e,a=n):(r=e,a=-Math.max(20,Math.abs(e)));const o=77*Math.PI/180;let l=Math.atan2(r,-a);l=or(l,-o,o),this.aimDirX=Math.sin(l),this.aimDirY=-Math.cos(l),this.pullStrength=or((i-6)/130,.18,1),this.isValidAim=!0,this.onAimUpdateCallback&&this.onAimUpdateCallback(!0,this.aimDirX,this.aimDirY,this.pullStrength)}_onPointerUp(t){if(!this.isPointerDown||t.pointerId!==this.activePointerId)return;const e=this.isDragging&&this.isValidAim&&this.enabled,n=this.aimDirX,i=this.aimDirY;this.isPointerDown=!1,this.isDragging=!1,this.activePointerId=null,this.isValidAim=!1,this.pullStrength=0,e&&this.onAimReleaseCallback?this.onAimReleaseCallback(n,i):this.onAimCancelCallback&&this.onAimCancelCallback(),this.justDragged&&setTimeout(()=>{this.justDragged=!1},40)}_onPointerCancel(t){!this.isPointerDown||t.pointerId!==this.activePointerId||this.cancelDrag()}dispose(){this.el.removeEventListener("pointerdown",this._onPointerDown),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("pointercancel",this._onPointerCancel)}}class y_{constructor(){this.canvas=document.getElementById("webgl-canvas"),this.container=document.getElementById("game-container"),this.waveCountEl=document.getElementById("wave-count"),this.starCountEl=document.getElementById("star-count"),this.coinBadgeEl=document.getElementById("coin-badge"),this.aimHintEl=document.getElementById("aim-hint"),this.starterShopEl=document.getElementById("starter-shop"),this.bestWaveValEl=document.getElementById("best-wave-val"),this.bestHitsValEl=document.getElementById("best-hits-val"),this.cardStartBallsEl=document.getElementById("card-start-balls"),this.lblBallLvlEl=document.getElementById("lbl-ball-lvl"),this.lblBallStatEl=document.getElementById("lbl-ball-stat"),this.lblBallCostEl=document.getElementById("lbl-ball-cost"),this.btnBuyStartBall=document.getElementById("btn-buy-start-ball"),this.cardGhostBallEl=document.getElementById("card-ghost-ball"),this.lblGhostOwnedEl=document.getElementById("lbl-ghost-owned"),this.btnBuyGhostBall=document.getElementById("btn-buy-ghost-ball"),this.cardFireBallEl=document.getElementById("card-fire-ball"),this.lblFireOwnedEl=document.getElementById("lbl-fire-owned"),this.btnBuyFireBall=document.getElementById("btn-buy-fire-ball"),this.btnHudGhost=document.getElementById("btn-hud-ghost"),this.hudGhostCountEl=document.getElementById("hud-ghost-count"),this.btnHudFire=document.getElementById("btn-hud-fire"),this.hudFireCountEl=document.getElementById("hud-fire-count"),this.bannerFireEl=document.getElementById("banner-fire"),this.bannerGhostEl=document.getElementById("banner-ghost"),this.btnPause=document.getElementById("btn-pause"),this.btnFastForward=document.getElementById("btn-fast-forward"),this.pauseModal=document.getElementById("pause-modal"),this.gameoverModal=document.getElementById("gameover-modal"),this.finalWaveScoreEl=document.getElementById("final-wave-score"),this.finalHitsScoreEl=document.getElementById("final-hits-score"),this.btnResume=document.getElementById("btn-resume"),this.btnToggleAudio=document.getElementById("btn-toggle-audio"),this.iconSoundOn=document.getElementById("icon-sound-on"),this.iconSoundOff=document.getElementById("icon-sound-off"),this.labelSound=document.getElementById("label-sound"),this.btnRestartPause=document.getElementById("btn-restart-pause"),this.btnRetry=document.getElementById("btn-retry"),this.isPaused=!1,this.isGameOver=!1,this.rafId=null,this.lastFrameTime=0,this._initThree(),this._bindUIEvents(),this._initSceneAndInput(),this._bindSDKLifecycle(),this._refreshStarterShopUI(),this._onResize(),window.addEventListener("resize",()=>this._onResize()),window.addEventListener("contextmenu",t=>t.preventDefault()),window.addEventListener("wheel",t=>t.preventDefault(),{passive:!1}),window.addEventListener("keydown",t=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)&&t.preventDefault()},{passive:!1})}_initThree(){this.renderer=new Pm({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=fe,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this._stopLoop()},!1),this.canvas.addEventListener("webglcontextrestored",()=>{this._onResize(),this.isPaused||this._startLoop()},!1),this.scene=new Lm,this.camera=new Oe(42,1,.5,80)}_initSceneAndInput(){this.playScene=new M_(this.scene,this.camera,{onWaveUpdate:t=>{this.waveCountEl.textContent=String(t)},onStarsUpdate:(t,e=!1)=>{this.starCountEl.textContent=String(t),this._refreshStarterShopUI(),e&&this.coinBadgeEl&&(this.coinBadgeEl.classList.add("pop"),clearTimeout(this._coinPopTimeout),this._coinPopTimeout=setTimeout(()=>{this.coinBadgeEl.classList.remove("pop")},150))},onFastForwardVisibility:(t,e)=>{this.btnFastForward.classList.toggle("visible",t),this.btnFastForward.classList.toggle("active-speed",e)},onAimHintVisibility:t=>{this.aimHintEl.classList.toggle("hidden",!t)},onStarterShopVisibility:t=>{this.starterShopEl&&(this.starterShopEl.classList.toggle("hidden",!t),t&&this._refreshStarterShopUI())},onSpecialPowerChange:(t,e)=>{this.bannerFireEl&&this.bannerFireEl.classList.toggle("hidden",!t),this.bannerGhostEl&&this.bannerGhostEl.classList.toggle("hidden",!e),this.btnHudFire&&this.btnHudFire.classList.toggle("active-fire",!!t),this.btnHudGhost&&this.btnHudGhost.classList.toggle("active-ghost",!!e)},onGameOver:(t,e=0)=>{this.isGameOver=!0,this.input.enabled=!1,this.finalWaveScoreEl.textContent=String(t),this.finalHitsScoreEl&&(this.finalHitsScoreEl.textContent=String(e)),this.gameoverModal.classList.add("visible")}}),this.input=new S_(this.container),this.input.setCallbacks({onAimUpdate:(t,e,n,i)=>{!this.isPaused&&this.rafId===null&&this._startLoop(),this.playScene.canAcceptInput()&&this.playScene.updateAimPreview(t,e,n,i)},onAimRelease:(t,e)=>{!this.isPaused&&this.rafId===null&&this._startLoop(),this.playScene.canAcceptInput()&&this.playScene.launchBalls(t,e)},onAimCancel:()=>{this.playScene.updateAimPreview(!1,0,-1,0)}})}_bindUIEvents(){this.btnPause.addEventListener("click",()=>{qt.unlock(),!this.isGameOver&&this.setUserPause(!0)}),this.btnResume.addEventListener("click",()=>{qt.unlock(),this.setUserPause(!1)}),this.btnToggleAudio.addEventListener("click",()=>{qt.unlock();const i=!Ue.audioEnabled;Ue.setLocalAudioEnabled(i),this._updateAudioButtonLabel()}),this.btnRestartPause.addEventListener("click",()=>{qt.unlock(),this.setUserPause(!1),this.restartGame()}),this.btnRetry.addEventListener("click",()=>{qt.unlock(),this.gameoverModal.classList.remove("visible"),this.restartGame()}),this.btnFastForward.addEventListener("click",()=>{qt.unlock(),this.playScene.toggleFastForward()});const t=i=>{i.stopPropagation(),!(this.input&&this.input.justDragged)&&(qt.unlock(),!this.isPaused&&this.rafId===null&&this._startLoop(),Vt.buyStartingBallUpgrade()?(qt.playUpgradePurchase(),this.starCountEl.textContent=String(Vt.getCoins()),this.playScene.applyStartingBallUpgrade(),this._refreshStarterShopUI(),this.cardStartBallsEl&&(this.cardStartBallsEl.classList.remove("upgrade-flash"),this.cardStartBallsEl.offsetWidth,this.cardStartBallsEl.classList.add("upgrade-flash"))):this.btnBuyStartBall&&(this.btnBuyStartBall.classList.remove("shake"),this.btnBuyStartBall.offsetWidth,this.btnBuyStartBall.classList.add("shake")))};this.btnBuyStartBall&&this.btnBuyStartBall.addEventListener("click",t),this.cardStartBallsEl&&this.cardStartBallsEl.addEventListener("click",t);const e=i=>{i.stopPropagation(),!(this.input&&this.input.justDragged)&&(qt.unlock(),!this.isPaused&&this.rafId===null&&this._startLoop(),Vt.buyGhostBall()?(qt.playUpgradePurchase(),this.starCountEl.textContent=String(Vt.getCoins()),this._refreshStarterShopUI(),this.cardGhostBallEl&&(this.cardGhostBallEl.classList.remove("upgrade-flash"),this.cardGhostBallEl.offsetWidth,this.cardGhostBallEl.classList.add("upgrade-flash"))):this.btnBuyGhostBall&&(this.btnBuyGhostBall.classList.remove("shake"),this.btnBuyGhostBall.offsetWidth,this.btnBuyGhostBall.classList.add("shake")))};this.btnBuyGhostBall&&this.btnBuyGhostBall.addEventListener("click",e),this.cardGhostBallEl&&this.cardGhostBallEl.addEventListener("click",e);const n=i=>{i.stopPropagation(),!(this.input&&this.input.justDragged)&&(qt.unlock(),!this.isPaused&&this.rafId===null&&this._startLoop(),Vt.buyFireBall()?(qt.playUpgradePurchase(),this.starCountEl.textContent=String(Vt.getCoins()),this._refreshStarterShopUI(),this.cardFireBallEl&&(this.cardFireBallEl.classList.remove("upgrade-flash"),this.cardFireBallEl.offsetWidth,this.cardFireBallEl.classList.add("upgrade-flash"))):this.btnBuyFireBall&&(this.btnBuyFireBall.classList.remove("shake"),this.btnBuyFireBall.offsetWidth,this.btnBuyFireBall.classList.add("shake")))};this.btnBuyFireBall&&this.btnBuyFireBall.addEventListener("click",n),this.cardFireBallEl&&this.cardFireBallEl.addEventListener("click",n),this.btnHudGhost&&this.btnHudGhost.addEventListener("click",i=>{i.stopPropagation(),qt.unlock(),!this.isPaused&&this.rafId===null&&this._startLoop(),!(!this.playScene.canAcceptInput()||this.playScene.activeGhostPower)&&(Vt.consumeGhostCharge()?(qt.playSpecialPowerPickup("ghost"),this.playScene.activateGhostPower(),this._refreshStarterShopUI()):(this.btnHudGhost.classList.remove("shake"),this.btnHudGhost.offsetWidth,this.btnHudGhost.classList.add("shake")))}),this.btnHudFire&&this.btnHudFire.addEventListener("click",i=>{i.stopPropagation(),qt.unlock(),!this.isPaused&&this.rafId===null&&this._startLoop(),!(!this.playScene.canAcceptInput()||this.playScene.activeFirePower)&&(Vt.consumeFireCharge()?(qt.playSpecialPowerPickup("fire"),this.playScene.activateFirePower(),this._refreshStarterShopUI()):(this.btnHudFire.classList.remove("shake"),this.btnHudFire.offsetWidth,this.btnHudFire.classList.add("shake")))}),this._updateAudioButtonLabel()}_refreshStarterShopUI(){this.bestWaveValEl&&typeof Vt.getBestWave=="function"&&(this.bestWaveValEl.textContent=String(Vt.getBestWave())),this.bestHitsValEl&&typeof Vt.getBestHits=="function"&&(this.bestHitsValEl.textContent=String(Vt.getBestHits()));const t=typeof Vt.getGhostCharges=="function"?Vt.getGhostCharges():Vt.ghostCharges||0,e=typeof Vt.getFireCharges=="function"?Vt.getFireCharges():Vt.fireCharges||0;if(this.hudGhostCountEl&&(this.hudGhostCountEl.textContent=String(t)),this.hudFireCountEl&&(this.hudFireCountEl.textContent=String(e)),this.btnHudGhost&&this.btnHudGhost.classList.toggle("empty",t<=0&&!(this.playScene&&this.playScene.activeGhostPower)),this.btnHudFire&&this.btnHudFire.classList.toggle("empty",e<=0&&!(this.playScene&&this.playScene.activeFirePower)),this.lblGhostOwnedEl&&(this.lblGhostOwnedEl.textContent=`x${t}`),this.lblFireOwnedEl&&(this.lblFireOwnedEl.textContent=`x${e}`),this.btnBuyGhostBall){const a=typeof Vt.canAffordGhostBall=="function"?Vt.canAffordGhostBall():Vt.getCoins()>=10;this.btnBuyGhostBall.classList.toggle("locked",!a)}if(this.btnBuyFireBall){const a=typeof Vt.canAffordFireBall=="function"?Vt.canAffordFireBall():Vt.getCoins()>=15;this.btnBuyFireBall.classList.toggle("locked",!a)}if(!this.btnBuyStartBall)return;const n=Vt.getStartingBalls(),i=Vt.getStartingBallUpgradeCost(),r=Vt.canAffordStartingBallUpgrade();this.lblBallLvlEl&&(this.lblBallLvlEl.textContent=`LV. ${n}`),this.lblBallStatEl&&(this.lblBallStatEl.textContent=`${n} ➔ ${n+1} Balls`),this.lblBallCostEl&&(this.lblBallCostEl.textContent=String(i)),this.btnBuyStartBall.classList.toggle("locked",!r)}_updateAudioButtonLabel(){const t=!!Ue.audioEnabled;this.labelSound&&(this.labelSound.textContent=t?"Sound: ON":"Sound: OFF"),this.iconSoundOn&&this.iconSoundOff&&(this.iconSoundOn.style.display=t?"block":"none",this.iconSoundOff.style.display=t?"none":"block"),this.btnToggleAudio.classList.toggle("muted",!t)}_bindSDKLifecycle(){Ue.onPause(()=>{this._stopLoop(),this.input.cancelDrag()}),Ue.onResume(()=>{this.isPaused||this._startLoop()}),Ue.onAudioChange(()=>{this._updateAudioButtonLabel()})}setUserPause(t){this.isPaused=t,this.input.enabled=!t&&!this.isGameOver,t?(this.input.cancelDrag(),this.pauseModal.classList.add("visible"),this._stopLoop()):(this.pauseModal.classList.remove("visible"),this._startLoop())}restartGame(){this.isGameOver=!1,this.input.enabled=!0,this.playScene.startNewGame()}_onResize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight,n=t/Math.max(1,e);this.renderer.setSize(t,e,!1),this.camera.aspect=n;let i=16.2,r=10.8,a=.35;if(n<.85){const o=.85/Math.max(.42,n);i*=Math.pow(o,.78),r*=Math.pow(o,.78),a=.15}this.camera.position.set(0,i,r),this.camera.lookAt(0,0,a),this.camera.updateProjectionMatrix()}start(){this.renderer.render(this.scene,this.camera),Ue.firstFrameReady(),Ue.gameReady(),this._startLoop()}_startLoop(){if(this.rafId!==null)return;this.lastFrameTime=performance.now();const t=e=>{this.rafId=requestAnimationFrame(t);const n=(e-this.lastFrameTime)*.001;this.lastFrameTime=e;const i=Math.min(Math.max(n,.001),.05);this.playScene.update(i),this.renderer.render(this.scene,this.camera)};this.rafId=requestAnimationFrame(t)}_stopLoop(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}function Bl(){if(window.__heroBallsGame)return;const s=new y_;window.__heroBallsGame=s,s.start()}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",Bl):Bl();
