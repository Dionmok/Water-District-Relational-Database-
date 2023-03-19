function deleteMaterial(material) {
  let link = "/delete-material-ajax";
  let data = {
    material: material,
  };

  $.ajax({
    url: link,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      window.location.reload();
    },
  });
}
