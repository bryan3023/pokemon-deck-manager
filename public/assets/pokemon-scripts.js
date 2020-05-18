$("#search-form").submit((event) => {
    event.preventDefault()

    const search = $("#search-form").serialize()
    console.log(search)
    $.ajax({
      url: "/api/search",
      method: "POST",
      data: search,
      dataType: 'json'
    }).then((data, error) => {
      const sprite = data[0].pokemon_sprite
      $("#pokeimage").attr({"src": sprite })
    })
  })
