function adminCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function productRow(product) {
  return `
    <tr>
      <td><img src="${product.images[0] || ""}" alt="${product.name}" width="52" height="52" style="object-fit:cover;border-radius:8px;" loading="lazy" /></td>
      <td>${product.name}</td>
      <td>${adminCurrency(product.price)}</td>
      <td><span class="chip">${product.category}</span></td>
      <td>
        <button class="btn stock-btn ${product.inStock ? "in" : "out"}" data-stock="${product.id}">
          ${product.inStock ? "In stock" : "Out of stock"}
        </button>
      </td>
      <td>
        <div class="actions">
          <button class="btn btn-light" data-edit="${product.id}">Edit</button>
          <button class="btn btn-light" data-delete="${product.id}">Delete</button>
        </div>
      </td>
    </tr>
  `;
}

function emptyProductRow() {
  return `
    <tr>
      <td colspan="6" style="text-align:center;color:#5f667d;padding:16px;">
        No products yet. Add your first product from the form.
      </td>
    </tr>
  `;
}
