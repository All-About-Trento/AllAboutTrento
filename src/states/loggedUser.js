import { onMounted, reactive } from 'vue'

onMounted( () => {
    loggedUser.cookie = $cookies.isKey("email");
    loggedUser.email = $cookies.get("email");
    loggedUser.ruolo = $cookies.get("ruolo");
})

const loggedUser = reactive({
    token: undefined,
    nome : undefined,
    email: undefined,
    id: undefined,
    self: undefined,
    successo : false,
    message : undefined, 
    ruolo : undefined,
    cookie : false
})

function setLoggedUser (data) {
    loggedUser.token = data.token;
    loggedUser.nome = data.nome;
    loggedUser.email = data.email;
    loggedUser.id = data.id;
    loggedUser.self = data.self;
    loggedUser.successo = data.success;
    loggedUser.message = data.message;
    loggedUser.ruolo = data.ruolo;
    loggedUser.cookie = true;
    $cookies.set("email",data.email,86400);
    $cookies.set("nome",data.nome,86400);
    $cookies.set("id",data.id,86400);
    $cookies.set("ruolo",data.ruolo,86400);
    $cookies.set("self",data.self,86400);
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser.nome = undefined;
    loggedUser.email = undefined;
    loggedUser.id = undefined;
    loggedUser.self = undefined;
    loggedUser.successo = false;
    loggedUser.message = undefined;
    loggedUser.ruolo = undefined;
    loggedUser.cookie = false;
    $cookies.remove("email");
    $cookies.remove("nome");
    $cookies.remove("id");
    $cookies.remove("ruolo");
    $cookies.remove("self");
}

export { loggedUser, setLoggedUser, clearLoggedUser } 