var Clients=new JET.Interface({selector:"section.hero .clients",namespace:"clients",on:{initialized(){window.addEventListener("DOMContentLoaded",()=>{new Flickity(this.self.element,{cellAlign:"left",contain:!0,wrapAround:!0,autoPlay:!0,prevNextButtons:!1,pageDots:!1,lazyLoad:!0});this.self.classList.remove("loading")})}}});export{Clients as default};