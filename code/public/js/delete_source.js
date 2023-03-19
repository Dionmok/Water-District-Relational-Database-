function deleteSource(source) {
  let link = "/delete-source-ajax";
  let data = {
    source: source,
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
