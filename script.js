// Obtener el contenedor donde se mostrarán los posts
const postsContainer = document.getElementById("postsContainer");

// Async await para obtener los datos
async function obtenerPosts() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Hubo un error en tu API");
    }

    const data = await response.json();
    // Tomar solo los primeros 6 posts
    const primerosPosts = data.slice(0, 6);

    // Limpiar el contenedor antes de agregar nuevos posts
    postsContainer.innerHTML = "";

    // Obtener el nombre del formulario
    const nombre = document.getElementById("nombre").value;

    // Crear el saludo
    const saludo = document.createElement("h4");
    saludo.classList.add("text-center", "text-white", "py-5");
    saludo.textContent = `Hola ${nombre}, ¡aquí están las novedades!`;
    postsContainer.appendChild(saludo);

    primerosPosts.forEach((post) => {
      const postCol = document.createElement("div");
      postCol.classList.add("col-md-4");
      postCol.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title text-dark">${post.title}</h5>
                        <p class="card-text text-dark">${post.body}</p>
                    </div>
                </div>
            `;
      postsContainer.appendChild(postCol);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener para el envío del formulario
document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  $("#novedadesModal").modal("hide"); // Cerrar el modal usando Bootstrap
  obtenerPosts(); // Mostrar los posts
});
