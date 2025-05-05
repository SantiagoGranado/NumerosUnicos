document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputNumbers');
    const btn = document.getElementById('processBtn');
    const errorDiv = document.getElementById('error');
    const resultContainer = document.getElementById('resultContainer');
  
    btn.addEventListener('click', processNumbers);
  
    function processNumbers() {
      // Limpiar mensajes y resultados previos
      errorDiv.textContent = '';
      resultContainer.innerHTML = '';
  
      const raw = input.value.trim();
      if (!raw) {
        errorDiv.textContent = 'Por favor, introduce algunos números.';
        return;
      }
  
      // Separar por comas, espacios o saltos de línea
      const tokens = raw.split(/[\s,]+/);
      const nums = [];
  
      // Validar y parsear
      for (let token of tokens) {
        if (!/^[-]?\d+$/.test(token)) {
          errorDiv.textContent = 'Símbolo incorrecto: ' + token;
          return;
        }
        nums.push(parseInt(token, 10));
      }
  
      // Únicos y orden ascendente
      const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
  
      // Construir tabla
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = 'Números únicos';
      headerRow.appendChild(th);
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      const tbody = document.createElement('tbody');
      unique.forEach(num => {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = num;
        row.appendChild(td);
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
  
      resultContainer.appendChild(table);
    }
  });
  