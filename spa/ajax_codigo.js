const sucesso = function(classe, pagina) {
    const resultado = document.querySelector(classe);
    resultado.innerHTML = pagina;
};

const erro = function(classe, erro) {
    const resultado = document.querySelector(classe);
    const { status, text: msg } = erro;

    resultado.innerHTML = `${status} ${msg}`;
};

const ajax = function(url) { // Requisição AJAX
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.send(); // Backend

        xhr.onreadystatechange = function(e) {

            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    resolve({
                        status: xhr.status,
                        text: xhr.statusText
                    });
                }
            }

        };

    });
};

const carregarPagina= async function(el) {
    try {
        const url = el.getAttribute('wm-link');
        const classe = el.getAttribute('wm-destino');

        const pagina = await ajax(url);

        if(pagina.status === 404) {
            console.error(pagina);
            erro(classe, pagina);
            return;
        }

        sucesso(classe, pagina);
    } catch(e) {
        console.error(e);
        erro(classe, e);
    }
};

document.querySelector('nav').onclick = function(event) {
    const el = event.target;
    const tag = el.nodeName.toLowerCase();
    
    if(tag === 'a') {
        event.preventDefault();
        carregarPagina(el);
    }
};
