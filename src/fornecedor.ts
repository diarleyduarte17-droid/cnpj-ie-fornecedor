export const limparCnpj = (valor: string) => valor.replace(/\D/g, "");

export function validarCnpj(valor: string): boolean {
  const cnpj = limparCnpj(valor);
  if (!/^\d{14}$/.test(cnpj) || /^(\d)\1+$/.test(cnpj)) return false;
  const digito = (base: string, pesos: number[]) => {
    const soma = [...base].reduce((total, numero, indice) => total + Number(numero) * pesos[indice], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  const primeiro = digito(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const segundo = digito(cnpj.slice(0, 12) + primeiro, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return cnpj.endsWith(`${primeiro}${segundo}`);
}

export type InscricaoEstadual = { numero: string; uf: string; situacao?: string; fonte: "publica" | "oficial" };
export type Fornecedor = { cnpj: string; razaoSocial?: string; uf?: string; inscricoes: InscricaoEstadual[]; fontes: string[] };

export function consolidarFornecedor(input: Omit<Fornecedor, "cnpj" | "inscricoes" | "fontes"> & { cnpj: string; inscricoes?: InscricaoEstadual[] }): Fornecedor {
  const cnpj = limparCnpj(input.cnpj);
  if (!validarCnpj(cnpj)) throw new Error("CNPJ inválido.");
  const inscricoes = input.inscricoes ?? [];
  const oficiais = inscricoes.filter((ie) => ie.fonte === "oficial");
  return { cnpj, razaoSocial: input.razaoSocial, uf: input.uf, inscricoes: oficiais.length ? oficiais : inscricoes, fontes: [...new Set(inscricoes.map((ie) => ie.fonte))] };
}
