document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputNumbers');
    const btn = document.getElementById('processBtn');
    const modeSelect = document.getElementById('mode');
    const errorDiv = document.getElementById('error');
    const resultContainer = document.getElementById('resultContainer');
  
    // Aplica clase al body según modo
    function applyModeClass() {
      const mode = modeSelect.value;
      document.body.classList.remove('mode-numbers', 'mode-words', 'mode-both');
      document.body.classList.add(`mode-${mode}`);
    }
  
    modeSelect.addEventListener('change', applyModeClass);
    applyModeClass(); // inicial
  
    btn.addEventListener('click', processValues);
  
    function processValues() {
      errorDiv.textContent = '';
      resultContainer.innerHTML = '';
      const raw = input.value.trim();
      if (!raw) {
        errorDiv.textContent = 'Por favor, introduce algunos valores.';
        return;
      }
  
      const mode = modeSelect.value;
      const tokens = raw.split(',').map(t => t.trim()).filter(t => t !== '');
      const numberRegex = /^-?\d+$/;
      const nums = [];
      const words = [];
  
      for (let token of tokens) {
        const isNumber = numberRegex.test(token);
        if (mode === 'numbers') {
          if (!isNumber) {
            errorDiv.textContent = 'Símbolo incorrecto para números: ' + token;
            return;
          }
          nums.push(parseInt(token, 10));
        } else if (mode === 'words') {
          if (isNumber) {
            errorDiv.textContent = 'Símbolo incorrecto para palabras: ' + token;
            return;
          }
          words.push(token.toLowerCase());
        } else {
          if (isNumber) {
            nums.push(parseInt(token, 10));
          } else {
            words.push(token.toLowerCase());
          }
        }
      }
  
      const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
      const uniqueWords = Array.from(new Set(words)).sort();
  
      if (uniqueNums.length) {
        const tableNum = buildTable(uniqueNums, 'Números únicos');
        resultContainer.appendChild(tableNum);
      }
      if (uniqueWords.length) {
        const tableWords = buildTable(uniqueWords, 'Palabras únicas');
        resultContainer.appendChild(tableWords);
      }
    }
  
    function buildTable(items, headerText) {
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      const tbody = document.createElement('tbody');
      items.forEach(item => {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = item;
        row.appendChild(td);
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      return table;
    }
  });