function showTesto(container, tit){
  window[container].innerHTML = tit
}

function showSaluto(container, nome){
  window[container].innerHTML = `Ciao ${nome}`
}

function showSomma(container,a,b){
  window[container].innerHTML = `${a} + ${b} = ${a+b}` 
}
