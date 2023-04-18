import * as XLSX from 'xlsx';

export const exportToExcel = (tables, titles) => {
  // Verifica se as referências para as tabelas são válidas
  if (!tables || !Array.isArray(tables) || tables.some(table => !table.current)) {
    console.error('Referência para a tabela inválida');
    return;
  }

  // Cria uma nova planilha
  const wb = XLSX.utils.book_new();

  // Para cada tabela, cria uma nova planilha com os dados da tabela e adiciona ao livro com seu respectivo título
  tables.forEach((table, index) => {
    const ws = XLSX.utils.table_to_sheet(table.current);
    XLSX.utils.book_append_sheet(wb, ws, titles[index] || `Sheet${index + 1}`);
  });

  // Converte o livro em um arquivo binário
  const wbBinary = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  // Cria um blob com o arquivo binário
  const blob = new Blob([s2ab(wbBinary)], { type: "application/octet-stream" });
  // Cria uma URL para o blob
  const url = URL.createObjectURL(blob);
  // Cria um link para o download do arquivo
  const link = document.createElement("a");
  link.href = url;
  link.download = "dados.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Converte uma string para um array de bytes
export const s2ab = s => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}