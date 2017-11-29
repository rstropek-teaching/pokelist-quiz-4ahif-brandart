(async function() {
    let pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/');

    loadPokemons();

    function loadPokemons(){
        let html = '';
        for(const pokemon of pokelist.results) {
            html += `<li>${pokemon.name} `;
            html += '<button value = "' + pokemon.name + '" class="showDetails" >details</button>';
            html += ' <button value = "' + pokemon.name + '" class="hideDetails">hide details</button>';
            html += '<div id = "' + pokemon.name + '"></div>'
            html += ' </li><br />';
        }

        $('#pokemons')[0].innerHTML = html;
    }
    

    $('.navigation').click(
      async function()
      {
          if(this.id === "next"){
            pokelist = await $.get(pokelist.next);
          }else{
              if(pokelist.previous !== null){
                  pokelist = await $.get(pokelist.previous);
              }
            
          }
        
        loadPokemons();
      }  
    );
    $(".showDetails").click(
        async function()
        {
            const pokemon = await $.get('https://pokeapi.co/api/v2/pokemon/' + $(this).val());
            let html = 'Name: ' + pokemon.forms[0].name + '<br/>';
            html += '<img src="' + pokemon.sprites.front_default + '"/>';
            html += '<br/>Abilities: <br/>';
            for(const abilitiesPoke of pokemon.abilities){
                html += abilitiesPoke.ability.name + '<br/>';
            }
            html += 'Weight: ' + pokemon.weight;
            $("#"+$(this).val())[0].innerHTML = html;
        }
    );

    $(".hideDetails").click(
        function()
        {
            const html = ``;
            $("#"+$(this).val())[0].innerHTML = html;
        }
    );
})();