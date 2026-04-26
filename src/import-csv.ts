import fs from 'node:fs';
import { parse } from "csv-parse";
import { env } from './env';

const csvPath = new URL('../pets.csv', import.meta.url);
const url = `http://127.0.0.1:${env.PORT}`;

if (env.NODE_ENV === 'production') {
  console.error("❌ Este script de importação não pode ser executado em produção.");
  process.exit(1); 
};

(async () => {
  await fetch(`${url}/orgs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: "Happy Pets",
      email: "contato@happypets.com",
      password: "123456",
      city: "São Paulo",
      phone: "1199999999"
    })
  });

  const authResponse = await fetch(`${url}/orgs/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'contato@happypets.com',
      password: '123456'
    })
  });

  const { token } = await authResponse.json() as { token: string };

  if (!token) return console.error("❌ Erro ao autenticar. Verifique se a ORG existe.");

  const parser = fs.createReadStream(csvPath).pipe(parse({
    columns: true,
    skip_empty_lines: true,
  }));

  process.stdout.write("🚀 Iniciando upload de pets via Stream...\n");

  for await (const chunk of parser) {
    const { name, description, age, images, petAttributes } = chunk;

    const body = {
      name,
      description,
      age: Number(age),
      images: images.split(','), 
      petAttributes: petAttributes.split(','),
    };

    const response = await fetch(`${url}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      process.stdout.write(`✅ Pet enviado: ${name}\n`);
    } else {
      const error = await response.json();
      process.stdout.write(`❌ Falha ao enviar ${name}: ${JSON.stringify(error)}\n`);
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  process.stdout.write("🏁 Processamento de CSV concluído.\n");
})();