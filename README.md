# Arqueologia Formosa

## Descrição
O projeto "Arqueologia Formosa" é um site dedicado a preservar e compartilhar o patrimônio arqueológico da cidade de Formosa,Goiás. Ele oferece informações sobre sítios arqueológicos, trabalhos escritos, blog e contato.

# Deploy
Foi feito o deploy na Vercel. Acesse o site nesse link
www.arqueologiaformosa.vercel.app

## Tecnologias Utilizadas
- **Next.js**: Framework React para desenvolvimento web.
- **Sanity**: CMS para gerenciamento de conteúdo.
- **Tailwind CSS**: Framework CSS para estilização.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Schema UI**: Lib de componentes pré-construídos.

## Estrutura do Projeto
- **/app**: Contém as páginas e layouts do Next.js.
- **/components**: Componentes reutilizáveis da interface do usuário.
- **/sanity**: Configurações e esquemas do Sanity CMS.
- **/public**: Arquivos públicos, como imagens e manifestos.
- **/lib**: Funções utilitárias e de configuração.
- **/types**: Definições de tipos TypeScript.

## Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/takeshi-mi/arqueologia-formosa.git
   ```
2. Instale as dependências:
   ```bash
   cd arqueologia-formosa
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto com base no arquivo `example.env.local`.
   - Preencha as variáveis necessárias, como `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`.

## Executando o Projeto
Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
O site estará disponível em `http://localhost:3000`.

## Deploy
Para fazer o deploy do projeto, você pode utilizar plataformas como Vercel ou Netlify. Certifique-se de configurar as variáveis de ambiente necessárias na plataforma escolhida.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Contato
Para mais informações, entre em contato pelo email: arqueologiaformosa@gmail.com
