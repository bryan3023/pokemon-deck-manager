$(document).ready(() => {
  $(".sprite-container").hide()
  $(".entry").hide()
  $(".add-button-container").hide()
  $(".max-deck").hide()
})

$("#search-form").submit((event) => {
  event.preventDefault()

  const search = $("#search-form").serialize()

  $.ajax({
    url: "/api/search",
    method: "POST",
    data: search,
    dataType: 'json'
  }).then((data, error) => {
    $("#pokemon-sprite").show()
    $("#pokemon-sprite").attr({"src": data[0].pokemon_sprite })
    $(".pokemon-name").text(data[0].pokemon_name)
    $(".pokemon-number").text(`# ${data[0].pokemon_num}`)
  })
})


$(".pokemon-entry").on("click", (event) => {
  event.preventDefault()

  const value = event.target.dataset.value

  $.ajax({
    url: `/api/pokemon/${value}`,
    method: "GET",
  }).then((data, error) => {
    const sprite = data.sprite

    $(".sprite-container").show()
    $(".entry").show()
    $(".add-button-container").show()
  
    $("#pokemon-sprite").attr({"src": sprite })
    $("#add-button").attr({"value": data.number })
    $(".pokemon-name").text(`${data.name} (#${data.number})`)
    $(".pokemon-number").text(data.description)


    $(".hp").text(`HP: ${data.hp}`)
    $(".speed").text(`Speed: ${data.speed}`)
    $(".defense").text(`Defense: ${data.defense}`)
    $(".specialDefense").text(`Special Defense: ${data.specialDefense}`)
    $(".attack").text(`Attack: ${data.attack}`)
    $(".specialAttack").text(`Special attack: ${data.specialAttack}`)
    $(".types").text(`Types: ${data.types.join(", ")}`)
    $(".height").text(`Height: ${data.height} decimeters`)
    $(".weight").text(`Weight: ${data.weight} hectograms`)
  })
})    

$(".deck-entry .close").on("click", (event) => {
  event.preventDefault()

  const value = event.target.value

  $.ajax({
    url: `/api/deck/1/${value}`,
    method: "DELETE",
  }).then((data, error) => {
    location.reload()
  })
})

$("#add-button").on("click", (event) => {
  event.preventDefault()

  const value = event.target.value

  $.ajax({
    url: `/api/deck/1/${value}`,
    method: "POST",
  }).then((data, error) => {
    if (data.error) {
      $(".max-deck").show()
      setTimeout(() => $(".max-deck").hide(), 2000)
    } else {
      location.reload()
    }
  })
})
