document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const newTitle = prompt(
      "Enter new text",
      event.target.closest("li").childNodes[0].textContent.trim()
    );
    if (newTitle) {
      edit(id, newTitle).then(() => {
        event.target.closest("li").childNodes[0].textContent = newTitle;
      });
    } else {
      return;
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });
}
