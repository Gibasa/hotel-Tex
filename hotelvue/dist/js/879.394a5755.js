"use strict";(self["webpackChunkhotelvue"]=self["webpackChunkhotelvue"]||[]).push([[879],{2879:function(a,s,e){e.r(s),e.d(s,{default:function(){return $}});var o=e(3396);const t={class:"acomodacoes"},r={class:"container"},i=(0,o.uE)('<article class="nossas-acomodacoes"><h2 class="titulo-h2 courier"><span class="link-border-bottom">NOSSAS ACOMODAÇÕES</span></h2><p class="paragrafo"> Relaxe no conforto de um dos 545 apartamentos e desfrute das melhores vistas do nascer ao pôr sol. Acomodações 100% não-fumantes, smart tv, ferro e tábua de passar roupa, secador de cabelo e wifi. Além de 2 piscinas aquecidas, spa, academia 24 horas, bares, restaurante e rooftop com vista para os principais pontos turísticos da cidade. Aqui no Hilton Copacabana, oferecemos tudo que você precisa para tornar a experiência inesquecível. </p></article><article class="detalhes-apartamentos"><h2 class="titulo-h2 courier"><span class="link-border-bottom">TODOS OS APARTAMENTOS INCLUEM</span></h2><div class="lista-detalhes"><ul class="noto-sans display-f"><span class="itens"><li>Mini bar</li><li>Cofre</li><li>Smart TV</li></span><span class="itens"><li>Vidros antirruído</li><li>Ferro e tábua para passar roupa</li><li>Acesso WiFi</li></span></ul></div><p class="paragrafo"><strong>Nossos apartamentos possuem as opções de cama King ou Twin (duas de solteiro). Escolha uma acomodação e faça sua reserva agora.</strong></p></article>',2),c={class:"acomodacoes-imagens display-f justify-c align-c"};function n(a,s,e,n,l,d){const u=(0,o.up)("ComponeteCard");return(0,o.wg)(),(0,o.iD)("section",t,[(0,o._)("div",r,[i,(0,o._)("div",c,[(0,o.Wm)(u)])])])}e(7658);var l=e(7139);const d={class:"img"},u=["src"],p={class:"inferior-text display-g"},m={class:"inferior-text-top"},f={class:"titulo-h3"},h={class:"inferior-text-button display-f justify-csb"},g={class:"inferior-left display-f flex-dc"},v=(0,o._)("div",{class:"text2 noto-sans"},"A partir de",-1),C={class:"text-valor-acomodacoes"},b={class:"inferior-right display-f justify-c align-c"},S=["onClick"];function _(a,s,e,t,r,i){return(0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(a.$store.getters.rCard,((a,s)=>((0,o.wg)(),(0,o.iD)("div",{key:a.id,class:"card"},[(0,o._)("div",d,[(0,o._)("img",{src:a.img},null,8,u)]),(0,o._)("div",p,[(0,o._)("div",m,[(0,o._)("h3",f,(0,l.zw)(a.title),1),(0,o._)("p",null,(0,l.zw)(a.description),1)]),(0,o._)("div",h,[(0,o._)("div",g,[v,(0,o._)("div",C,(0,l.zw)(a.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})),1)]),(0,o._)("div",b,[(0,o._)("button",{class:"btn-blue",onClick:e=>(this.$router.push("/reserva"),i.changeOrder(s,a.id))}," Reservar ",8,S)])])])])))),128)}var y={name:"ComponetCard",methods:{changeOrder:function(a,s){this.$store.commit("order",a),s>3&&this.counter()},counter:function(){this.$store.commit("counter")}}},A=e(89);const w=(0,A.Z)(y,[["render",_]]);var O=w,k={name:"CardTemplate",components:{ComponeteCard:O},beforeMount(){localStorage.getItem("cardContent")&&(this.$store.commit("storeCardContent",JSON.parse(localStorage.getItem("cardContent"))),localStorage.getItem("counter")?this.$store.state.contador=localStorage.getItem("counter"):this.$store.state.contador=0)}};const x=(0,A.Z)(k,[["render",n]]);var $=x}}]);
//# sourceMappingURL=879.394a5755.js.map