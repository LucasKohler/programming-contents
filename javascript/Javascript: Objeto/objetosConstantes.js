// pessoa -> 123 -> {...}
const pessoa = { nome: "João" };
pessoa.nome = "pedro";
console.log(pessoa);

//pessoa -> 456 -> {...}
//pessoa = { nome: "Ana" }; erro

Object.freeze(pessoa); // Basicamente deixa o objeto constante

pessoa.nome = "Maria";
pessoa.end = "Rua ABC";
delete pessoa.nome;
console.log(pessoa.nome);

const pessoaConstante = Object.freeze({ nome: "João" });
pessoaConstante.nome = "Maria";
console.log(pessoaConstante.nome);
