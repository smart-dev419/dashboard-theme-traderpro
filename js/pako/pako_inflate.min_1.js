/*! pako 2.0.2 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).pako={})}(this,(function(e){"use strict";var t=(e,t,i,n)=>{let a=65535&e|0,r=e>>>16&65535|0,s=0;for(;0!==i;){s=i>2e3?2e3:i,i-=s;do{a=a+t[n++]|0,r=r+a|0}while(--s);a%=65521,r%=65521}return a|r<<16|0};const i=new Uint32Array((()=>{let e,t=[];for(var i=0;i<256;i++){e=i;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t})());var n=(e,t,n,a)=>{const r=i,s=a+n;e^=-1;for(let i=a;i<s;i++)e=e>>>8^r[255&(e^t[i])];return-1^e};var a=function(e,t){let i,n,a,r,s,o,l,d,f,h,c,u,w,b,k,m,_,g,v,p,y,x,E,R;const A=e.state;i=e.next_in,E=e.input,n=i+(e.avail_in-5),a=e.next_out,R=e.output,r=a-(t-e.avail_out),s=a+(e.avail_out-257),o=A.dmax,l=A.wsize,d=A.whave,f=A.wnext,h=A.window,c=A.hold,u=A.bits,w=A.lencode,b=A.distcode,k=(1<<A.lenbits)-1,m=(1<<A.distbits)-1;e:do{u<15&&(c+=E[i++]<<u,u+=8,c+=E[i++]<<u,u+=8),_=w[c&k];t:for(;;){if(g=_>>>24,c>>>=g,u-=g,g=_>>>16&255,0===g)R[a++]=65535&_;else{if(!(16&g)){if(0==(64&g)){_=w[(65535&_)+(c&(1<<g)-1)];continue t}if(32&g){A.mode=12;break e}e.msg="invalid literal/length code",A.mode=30;break e}v=65535&_,g&=15,g&&(u<g&&(c+=E[i++]<<u,u+=8),v+=c&(1<<g)-1,c>>>=g,u-=g),u<15&&(c+=E[i++]<<u,u+=8,c+=E[i++]<<u,u+=8),_=b[c&m];i:for(;;){if(g=_>>>24,c>>>=g,u-=g,g=_>>>16&255,!(16&g)){if(0==(64&g)){_=b[(65535&_)+(c&(1<<g)-1)];continue i}e.msg="invalid distance code",A.mode=30;break e}if(p=65535&_,g&=15,u<g&&(c+=E[i++]<<u,u+=8,u<g&&(c+=E[i++]<<u,u+=8)),p+=c&(1<<g)-1,p>o){e.msg="invalid distance too far back",A.mode=30;break e}if(c>>>=g,u-=g,g=a-r,p>g){if(g=p-g,g>d&&A.sane){e.msg="invalid distance too far back",A.mode=30;break e}if(y=0,x=h,0===f){if(y+=l-g,g<v){v-=g;do{R[a++]=h[y++]}while(--g);y=a-p,x=R}}else if(f<g){if(y+=l+f-g,g-=f,g<v){v-=g;do{R[a++]=h[y++]}while(--g);if(y=0,f<v){g=f,v-=g;do{R[a++]=h[y++]}while(--g);y=a-p,x=R}}}else if(y+=f-g,g<v){v-=g;do{R[a++]=h[y++]}while(--g);y=a-p,x=R}for(;v>2;)R[a++]=x[y++],R[a++]=x[y++],R[a++]=x[y++],v-=3;v&&(R[a++]=x[y++],v>1&&(R[a++]=x[y++]))}else{y=a-p;do{R[a++]=R[y++],R[a++]=R[y++],R[a++]=R[y++],v-=3}while(v>2);v&&(R[a++]=R[y++],v>1&&(R[a++]=R[y++]))}break}}break}}while(i<n&&a<s);v=u>>3,i-=v,u-=v<<3,c&=(1<<u)-1,e.next_in=i,e.next_out=a,e.avail_in=i<n?n-i+5:5-(i-n),e.avail_out=a<s?s-a+257:257-(a-s),A.hold=c,A.bits=u};const r=15,s=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),o=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),l=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),d=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var f=(e,t,i,n,a,f,h,c)=>{const u=c.bits;let w,b,k,m,_,g,v=0,p=0,y=0,x=0,E=0,R=0,A=0,Z=0,S=0,O=0,U=null,T=0;const D=new Uint16Array(16),I=new Uint16Array(16);let B,N,C,z=null,F=0;for(v=0;v<=r;v++)D[v]=0;for(p=0;p<n;p++)D[t[i+p]]++;for(E=u,x=r;x>=1&&0===D[x];x--);if(E>x&&(E=x),0===x)return a[f++]=20971520,a[f++]=20971520,c.bits=1,0;for(y=1;y<x&&0===D[y];y++);for(E<y&&(E=y),Z=1,v=1;v<=r;v++)if(Z<<=1,Z-=D[v],Z<0)return-1;if(Z>0&&(0===e||1!==x))return-1;for(I[1]=0,v=1;v<r;v++)I[v+1]=I[v]+D[v];for(p=0;p<n;p++)0!==t[i+p]&&(h[I[t[i+p]]++]=p);if(0===e?(U=z=h,g=19):1===e?(U=s,T-=257,z=o,F-=257,g=256):(U=l,z=d,g=-1),O=0,p=0,v=y,_=f,R=E,A=0,k=-1,S=1<<E,m=S-1,1===e&&S>852||2===e&&S>592)return 1;for(;;){B=v-A,h[p]<g?(N=0,C=h[p]):h[p]>g?(N=z[F+h[p]],C=U[T+h[p]]):(N=96,C=0),w=1<<v-A,b=1<<R,y=b;do{b-=w,a[_+(O>>A)+b]=B<<24|N<<16|C|0}while(0!==b);for(w=1<<v-1;O&w;)w>>=1;if(0!==w?(O&=w-1,O+=w):O=0,p++,0==--D[v]){if(v===x)break;v=t[i+h[p]]}if(v>E&&(O&m)!==k){for(0===A&&(A=E),_+=y,R=v-A,Z=1<<R;R+A<x&&(Z-=D[R+A],!(Z<=0));)R++,Z<<=1;if(S+=1<<R,1===e&&S>852||2===e&&S>592)return 1;k=O&m,a[k]=E<<24|R<<16|_-f|0}}return 0!==O&&(a[_+O]=v-A<<24|64<<16|0),c.bits=E,0},h={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{Z_FINISH:c,Z_BLOCK:u,Z_TREES:w,Z_OK:b,Z_STREAM_END:k,Z_NEED_DICT:m,Z_STREAM_ERROR:_,Z_DATA_ERROR:g,Z_MEM_ERROR:v,Z_BUF_ERROR:p,Z_DEFLATED:y}=h,x=12,E=30,R=e=>(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24);function A(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Z=e=>{if(!e||!e.state)return _;const t=e.state;return e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=1,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(852),t.distcode=t.distdyn=new Int32Array(592),t.sane=1,t.back=-1,b},S=e=>{if(!e||!e.state)return _;const t=e.state;return t.wsize=0,t.whave=0,t.wnext=0,Z(e)},O=(e,t)=>{let i;if(!e||!e.state)return _;const n=e.state;return t<0?(i=0,t=-t):(i=1+(t>>4),t<48&&(t&=15)),t&&(t<8||t>15)?_:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,S(e))},U=(e,t)=>{if(!e)return _;const i=new A;e.state=i,i.window=null;const n=O(e,t);return n!==b&&(e.state=null),n};let T,D,I=!0;const B=e=>{if(I){T=new Int32Array(512),D=new Int32Array(32);let t=0;for(;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(f(1,e.lens,0,288,T,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;f(2,e.lens,0,32,D,0,e.work,{bits:5}),I=!1}e.lencode=T,e.lenbits=9,e.distcode=D,e.distbits=5},N=(e,t,i,n)=>{let a;const r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Uint8Array(r.wsize)),n>=r.wsize?(r.window.set(t.subarray(i-r.wsize,i),0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),r.window.set(t.subarray(i-n,i-n+a),r.wnext),(n-=a)?(r.window.set(t.subarray(i-n,i),0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0};var C={inflateReset:S,inflateReset2:O,inflateResetKeep:Z,inflateInit:e=>U(e,15),inflateInit2:U,inflate:(e,i)=>{let r,s,o,l,d,h,A,Z,S,O,U,T,D,I,C,z,F,L,M,H,j,K,P=0;const Y=new Uint8Array(4);let G,X;const W=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return _;r=e.state,r.mode===x&&(r.mode=13),d=e.next_out,o=e.output,A=e.avail_out,l=e.next_in,s=e.input,h=e.avail_in,Z=r.hold,S=r.bits,O=h,U=A,K=b;e:for(;;)switch(r.mode){case 1:if(0===r.wrap){r.mode=13;break}for(;S<16;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(2&r.wrap&&35615===Z){r.check=0,Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0),Z=0,S=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&Z)<<8)+(Z>>8))%31){e.msg="incorrect header check",r.mode=E;break}if((15&Z)!==y){e.msg="unknown compression method",r.mode=E;break}if(Z>>>=4,S-=4,j=8+(15&Z),0===r.wbits)r.wbits=j;else if(j>r.wbits){e.msg="invalid window size",r.mode=E;break}r.dmax=1<<r.wbits,e.adler=r.check=1,r.mode=512&Z?10:x,Z=0,S=0;break;case 2:for(;S<16;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(r.flags=Z,(255&r.flags)!==y){e.msg="unknown compression method",r.mode=E;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=E;break}r.head&&(r.head.text=Z>>8&1),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0,r.mode=3;case 3:for(;S<32;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.head&&(r.head.time=Z),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,Y[2]=Z>>>16&255,Y[3]=Z>>>24&255,r.check=n(r.check,Y,4,0)),Z=0,S=0,r.mode=4;case 4:for(;S<16;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.head&&(r.head.xflags=255&Z,r.head.os=Z>>8),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0,r.mode=5;case 5:if(1024&r.flags){for(;S<16;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.length=Z,r.head&&(r.head.extra_len=Z),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(T=r.length,T>h&&(T=h),T&&(r.head&&(j=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Uint8Array(r.head.extra_len)),r.head.extra.set(s.subarray(l,l+T),j)),512&r.flags&&(r.check=n(r.check,s,T,l)),h-=T,l+=T,r.length-=T),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===h)break e;T=0;do{j=s[l+T++],r.head&&j&&r.length<65536&&(r.head.name+=String.fromCharCode(j))}while(j&&T<h);if(512&r.flags&&(r.check=n(r.check,s,T,l)),h-=T,l+=T,j)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===h)break e;T=0;do{j=s[l+T++],r.head&&j&&r.length<65536&&(r.head.comment+=String.fromCharCode(j))}while(j&&T<h);if(512&r.flags&&(r.check=n(r.check,s,T,l)),h-=T,l+=T,j)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;S<16;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(Z!==(65535&r.check)){e.msg="header crc mismatch",r.mode=E;break}Z=0,S=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=x;break;case 10:for(;S<32;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}e.adler=r.check=R(Z),Z=0,S=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=h,r.hold=Z,r.bits=S,m;e.adler=r.check=1,r.mode=x;case x:if(i===u||i===w)break e;case 13:if(r.last){Z>>>=7&S,S-=7&S,r.mode=27;break}for(;S<3;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}switch(r.last=1&Z,Z>>>=1,S-=1,3&Z){case 0:r.mode=14;break;case 1:if(B(r),r.mode=20,i===w){Z>>>=2,S-=2;break e}break;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=E}Z>>>=2,S-=2;break;case 14:for(Z>>>=7&S,S-=7&S;S<32;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if((65535&Z)!=(Z>>>16^65535)){e.msg="invalid stored block lengths",r.mode=E;break}if(r.length=65535&Z,Z=0,S=0,r.mode=15,i===w)break e;case 15:r.mode=16;case 16:if(T=r.length,T){if(T>h&&(T=h),T>A&&(T=A),0===T)break e;o.set(s.subarray(l,l+T),d),h-=T,l+=T,A-=T,d+=T,r.length-=T;break}r.mode=x;break;case 17:for(;S<14;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(r.nlen=257+(31&Z),Z>>>=5,S-=5,r.ndist=1+(31&Z),Z>>>=5,S-=5,r.ncode=4+(15&Z),Z>>>=4,S-=4,r.nlen>286||r.ndist>30){e.msg="too many length or distance symbols",r.mode=E;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;S<3;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.lens[W[r.have++]]=7&Z,Z>>>=3,S-=3}for(;r.have<19;)r.lens[W[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,G={bits:r.lenbits},K=f(0,r.lens,0,19,r.lencode,0,r.work,G),r.lenbits=G.bits,K){e.msg="invalid code lengths set",r.mode=E;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;P=r.lencode[Z&(1<<r.lenbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(F<16)Z>>>=C,S-=C,r.lens[r.have++]=F;else{if(16===F){for(X=C+2;S<X;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(Z>>>=C,S-=C,0===r.have){e.msg="invalid bit length repeat",r.mode=E;break}j=r.lens[r.have-1],T=3+(3&Z),Z>>>=2,S-=2}else if(17===F){for(X=C+3;S<X;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}Z>>>=C,S-=C,j=0,T=3+(7&Z),Z>>>=3,S-=3}else{for(X=C+7;S<X;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}Z>>>=C,S-=C,j=0,T=11+(127&Z),Z>>>=7,S-=7}if(r.have+T>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=E;break}for(;T--;)r.lens[r.have++]=j}}if(r.mode===E)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=E;break}if(r.lenbits=9,G={bits:r.lenbits},K=f(1,r.lens,0,r.nlen,r.lencode,0,r.work,G),r.lenbits=G.bits,K){e.msg="invalid literal/lengths set",r.mode=E;break}if(r.distbits=6,r.distcode=r.distdyn,G={bits:r.distbits},K=f(2,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,G),r.distbits=G.bits,K){e.msg="invalid distances set",r.mode=E;break}if(r.mode=20,i===w)break e;case 20:r.mode=21;case 21:if(h>=6&&A>=258){e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=h,r.hold=Z,r.bits=S,a(e,U),d=e.next_out,o=e.output,A=e.avail_out,l=e.next_in,s=e.input,h=e.avail_in,Z=r.hold,S=r.bits,r.mode===x&&(r.back=-1);break}for(r.back=0;P=r.lencode[Z&(1<<r.lenbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(z&&0==(240&z)){for(L=C,M=z,H=F;P=r.lencode[H+((Z&(1<<L+M)-1)>>L)],C=P>>>24,z=P>>>16&255,F=65535&P,!(L+C<=S);){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}Z>>>=L,S-=L,r.back+=L}if(Z>>>=C,S-=C,r.back+=C,r.length=F,0===z){r.mode=26;break}if(32&z){r.back=-1,r.mode=x;break}if(64&z){e.msg="invalid literal/length code",r.mode=E;break}r.extra=15&z,r.mode=22;case 22:if(r.extra){for(X=r.extra;S<X;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.length+=Z&(1<<r.extra)-1,Z>>>=r.extra,S-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;P=r.distcode[Z&(1<<r.distbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(0==(240&z)){for(L=C,M=z,H=F;P=r.distcode[H+((Z&(1<<L+M)-1)>>L)],C=P>>>24,z=P>>>16&255,F=65535&P,!(L+C<=S);){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}Z>>>=L,S-=L,r.back+=L}if(Z>>>=C,S-=C,r.back+=C,64&z){e.msg="invalid distance code",r.mode=E;break}r.offset=F,r.extra=15&z,r.mode=24;case 24:if(r.extra){for(X=r.extra;S<X;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}r.offset+=Z&(1<<r.extra)-1,Z>>>=r.extra,S-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=E;break}r.mode=25;case 25:if(0===A)break e;if(T=U-A,r.offset>T){if(T=r.offset-T,T>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=E;break}T>r.wnext?(T-=r.wnext,D=r.wsize-T):D=r.wnext-T,T>r.length&&(T=r.length),I=r.window}else I=o,D=d-r.offset,T=r.length;T>A&&(T=A),A-=T,r.length-=T;do{o[d++]=I[D++]}while(--T);0===r.length&&(r.mode=21);break;case 26:if(0===A)break e;o[d++]=r.length,A--,r.mode=21;break;case 27:if(r.wrap){for(;S<32;){if(0===h)break e;h--,Z|=s[l++]<<S,S+=8}if(U-=A,e.total_out+=U,r.total+=U,U&&(e.adler=r.check=r.flags?n(r.check,o,U,d-U):t(r.check,o,U,d-U)),U=A,(r.flags?Z:R(Z))!==r.check){e.msg="incorrect data check",r.mode=E;break}Z=0,S=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;S<32;){if(0===h)break e;h--,Z+=s[l++]<<S,S+=8}if(Z!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=E;break}Z=0,S=0}r.mode=29;case 29:K=k;break e;case E:K=g;break e;case 31:return v;case 32:default:return _}return e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=h,r.hold=Z,r.bits=S,(r.wsize||U!==e.avail_out&&r.mode<E&&(r.mode<27||i!==c))&&N(e,e.output,e.next_out,U-e.avail_out),O-=e.avail_in,U-=e.avail_out,e.total_in+=O,e.total_out+=U,r.total+=U,r.wrap&&U&&(e.adler=r.check=r.flags?n(r.check,o,U,e.next_out-U):t(r.check,o,U,e.next_out-U)),e.data_type=r.bits+(r.last?64:0)+(r.mode===x?128:0)+(20===r.mode||15===r.mode?256:0),(0===O&&0===U||i===c)&&K===b&&(K=p),K},inflateEnd:e=>{if(!e||!e.state)return _;let t=e.state;return t.window&&(t.window=null),e.state=null,b},inflateGetHeader:(e,t)=>{if(!e||!e.state)return _;const i=e.state;return 0==(2&i.wrap)?_:(i.head=t,t.done=!1,b)},inflateSetDictionary:(e,i)=>{const n=i.length;let a,r,s;return e&&e.state?(a=e.state,0!==a.wrap&&11!==a.mode?_:11===a.mode&&(r=1,r=t(r,i,n,0),r!==a.check)?g:(s=N(e,i,n,n),s?(a.mode=31,v):(a.havedict=1,b))):_},inflateInfo:"pako inflate (from Nodeca project)"};const z=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var F=function(e){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const t in i)z(i,t)&&(e[t]=i[t])}}return e},L=e=>{let t=0;for(let i=0,n=e.length;i<n;i++)t+=e[i].length;const i=new Uint8Array(t);for(let t=0,n=0,a=e.length;t<a;t++){let a=e[t];i.set(a,n),n+=a.length}return i};let M=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){M=!1}const H=new Uint8Array(256);for(let e=0;e<256;e++)H[e]=e>=252?6:e>=248?5:e>=240?4:e>=224?3:e>=192?2:1;H[254]=H[254]=1;var j=e=>{let t,i,n,a,r,s=e.length,o=0;for(a=0;a<s;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<s&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),o+=i<128?1:i<2048?2:i<65536?3:4;for(t=new Uint8Array(o),r=0,a=0;r<o;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<s&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),i<128?t[r++]=i:i<2048?(t[r++]=192|i>>>6,t[r++]=128|63&i):i<65536?(t[r++]=224|i>>>12,t[r++]=128|i>>>6&63,t[r++]=128|63&i):(t[r++]=240|i>>>18,t[r++]=128|i>>>12&63,t[r++]=128|i>>>6&63,t[r++]=128|63&i);return t},K=(e,t)=>{let i,n;const a=t||e.length,r=new Array(2*a);for(n=0,i=0;i<a;){let t=e[i++];if(t<128){r[n++]=t;continue}let s=H[t];if(s>4)r[n++]=65533,i+=s-1;else{for(t&=2===s?31:3===s?15:7;s>1&&i<a;)t=t<<6|63&e[i++],s--;s>1?r[n++]=65533:t<65536?r[n++]=t:(t-=65536,r[n++]=55296|t>>10&1023,r[n++]=56320|1023&t)}}return((e,t)=>{if(t<65534&&e.subarray&&M)return String.fromCharCode.apply(null,e.length===t?e:e.subarray(0,t));let i="";for(let n=0;n<t;n++)i+=String.fromCharCode(e[n]);return i})(r,n)},P=(e,t)=>{(t=t||e.length)>e.length&&(t=e.length);let i=t-1;for(;i>=0&&128==(192&e[i]);)i--;return i<0||0===i?t:i+H[e[i]]>t?i:t},Y={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};var G=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};var X=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const W=Object.prototype.toString,{Z_NO_FLUSH:q,Z_FINISH:J,Z_OK:Q,Z_STREAM_END:V,Z_NEED_DICT:$,Z_STREAM_ERROR:ee,Z_DATA_ERROR:te,Z_MEM_ERROR:ie}=h;function ne(e){this.options=F({chunkSize:65536,windowBits:15,to:""},e||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new G,this.strm.avail_out=0;let i=C.inflateInit2(this.strm,t.windowBits);if(i!==Q)throw new Error(Y[i]);if(this.header=new X,C.inflateGetHeader(this.strm,this.header),t.dictionary&&("string"==typeof t.dictionary?t.dictionary=j(t.dictionary):"[object ArrayBuffer]"===W.call(t.dictionary)&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(i=C.inflateSetDictionary(this.strm,t.dictionary),i!==Q)))throw new Error(Y[i])}function ae(e,t){const i=new ne(t);if(i.push(e),i.err)throw i.msg||Y[i.err];return i.result}ne.prototype.push=function(e,t){const i=this.strm,n=this.options.chunkSize,a=this.options.dictionary;let r,s,o;if(this.ended)return!1;for(s=t===~~t?t:!0===t?J:q,"[object ArrayBuffer]"===W.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(n),i.next_out=0,i.avail_out=n),r=C.inflate(i,s),r===$&&a&&(r=C.inflateSetDictionary(i,a),r===Q?r=C.inflate(i,s):r===te&&(r=$));i.avail_in>0&&r===V&&i.state.wrap>0&&0!==e[i.next_in];)C.inflateReset(i),r=C.inflate(i,s);switch(r){case ee:case te:case $:case ie:return this.onEnd(r),this.ended=!0,!1}if(o=i.avail_out,i.next_out&&(0===i.avail_out||r===V))if("string"===this.options.to){let e=P(i.output,i.next_out),t=i.next_out-e,a=K(i.output,e);i.next_out=t,i.avail_out=n-t,t&&i.output.set(i.output.subarray(e,e+t),0),this.onData(a)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(r!==Q||0!==o){if(r===V)return r=C.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},ne.prototype.onData=function(e){this.chunks.push(e)},ne.prototype.onEnd=function(e){e===Q&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=L(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var re=ne,se=ae,oe=function(e,t){return(t=t||{}).raw=!0,ae(e,t)},le=ae,de=h,fe={Inflate:re,inflate:se,inflateRaw:oe,ungzip:le,constants:de};e.Inflate=re,e.constants=de,e.default=fe,e.inflate=se,e.inflateRaw=oe,e.ungzip=le,Object.defineProperty(e,"__esModule",{value:!0})}));
