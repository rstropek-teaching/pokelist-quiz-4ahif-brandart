$(document).ready(function(){
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    listPokemons(url);
});  

function listPokemons(url){
    (async function (){
        const pokelist = await $.get(url);

        let html = '';
        for(const pokemon of pokelist.results){
            html += `<tr><td> ${pokemon.name} </td><td>Button</td></tr>`;
        }
        $('#resultBody')[0].innerHTML = html;
    })();
}