# terceiro_projeto_NEXT_JS
O terceiro projeto, que começa na aula 133, aprofunda os temas já estudados, cria uma página de artigos que quando clicados mostram os destalhes. De novidade, foi usada a tag <article> aula 139 e a função notFound (aula 140) que joga para a página de not-found quando ele procura inicialmente um dado e dá erro por não encontrá-lo em vez de mostrar a página.

import { notFound } from "next/navigation"

if (!newsItem) {        notFound();    }

	A partir da aula 141 explica rotas paralelas, dentro do App criou uma pasta, dentro, outras duas pastas começando com @ e dentro de cada uma, um arquivo page.js, assim, ao acessar o endereço da primeira pasta, ele mostrar o conteúdo das duas paralelamente.
	Já na aula 142 é incluída a lógica para mostrar em uma parte da página o conteúdo estático e na outra o conteúdo de acordo com o ano selecionado, para isso foi incluída uma pasta lib com um arquivo com várias funções para mapear o array e selecionar por ano, essas funções são importadas para os componentes. Também é criada uma rota dinâmica [year] que usa o próprio ano do link como parâmetro (params) para as notícias selecionadas daquele ano. IMPORTANTE, como as duas rotas não tinham acesso ao mesmo caminho que estava sendo acessado pelo link, é preciso criar um arquivo chamado default.js para uma delas, a que não tem o acesso, do contrário, dará o erro de arquivo não encontrado.

	No Next.js, **rotas paralelas** (ou *parallel routes*) permitem renderizar simultaneamente ou condicionalmente várias páginas dentro de um mesmo layout. Essa funcionalidade é útil para criar seções altamente dinâmicas em um aplicativo, como painéis de controle ou feeds em redes sociais no NextJS - Taller](https://blog.taller.net.br/rotas-paralelas-parallel-routes-no-nextjs/). Por exemplo, em um painel de controle, você pode usar rotas paralelas para exibir simultaneamente as páginas de "estatísticas" e "equipe" sem que uma interfira na outra. Isso melhora a experiência do usuário, pois as seções podem ser carregadas e atualizadas de forma independente no NextJS - Taller](https://blog.taller.net.br/rotas-paralelas-parallel-routes-no-nextjs/). As rotas paralelas são criadas usando **slots nomeados**, que são definidos com a convenção `@nome`. Esses slots são passados como *props* para o layout compartilhado, permitindo que diferentes partes da interface sejam renderizadas em paralelo.

	Aula 143 - No Next.js, é introduzida a lógica para separar as publicações não só por ano, mas também por mês, para isso é usada a sintaxe do catch-all que está explicada abaixo e vai servir no caso do código do curso para atingir todos os params que vierem depois do endereço principal, no entanto, havia duas pages após o endereço, gerando um conflito e foi preciso deletar uma.
	Na 144 o conceito é aprofundado inserindo as funções para capturar o endereço que se está e mostrar condicionalmente os links de acordo, assim, se seleciona o ano da notícia e acima vão aparecer os meses, se seleciona o mês e não aparece mais nenhum link, é como um aprimoramento das rotas dinâmicas.
	O `[[...]]` é usado para criar rotas dinâmicas que capturam múltiplos segmentos em um caminho de URL. Ele é conhecido como **rota catch-all**. Por exemplo, ao criar um arquivo chamado `[[...slug]].js` dentro da pasta `pages`, você define uma rota que pode capturar caminhos como:

- `/blog`
- `/blog/tecnologia`
- `/blog/tecnologia/programacao`

Nesse caso, a variável `slug` seria um array que armazena os segmentos capturados. Se o caminho for `/blog/tecnologia/programacao`, `slug` será `['tecnologia', 'programacao']`. 

A diferença entre `[slug].js` e `[[...slug]].js` está no comportamento para URLs sem segmentos adicionais:
- `[slug].js` exige que sempre haja um segmento (ex: `/blog/tecnologia`).
- `[[...slug]].js` permite que o caminho seja opcional (ex: `/blog` também funciona).

	Aula 145 mostra um código para mostrar um erro se digitar na barra um ano ou mês que não exista. Nota, o + converte uma string em um num.
	Aula 146 é incluída um arquivo error.js para mostrar uma página com esse erro, é preciso usar o “use client” pois mesmo os componentes que rodam no lado do cliente, são pré renderizados no server, então o “use client” garante que a mensagem de erro será mostrada se o erro acontecer em qualquer dos lados (aula 147).
	Ainda na aula 147 é inserida uma lógica para aplicar uma classname condicionalmente caso o link esteja selecionado ou não, para isso é usado o usePathname, no entanto, como é um hook que exige um “use client”, foi criado um componente separado para que seja passado um children para o componente que vá usar o link e não seja necessário fazer o componente inteiro rodar no lado cliente, mas somente o hook, o que é um padrão comum no Next.
	Aula 148 faz uma page aninhada (nested) com uma rota dinâmica para quando se clicar na imagem ela funcionar como um link e aparecer grande na tela
	
	Aula 149 fala de Interception Routes que, pelo que entendi, é um modo de carregar a página independente da origem do link, se foi um externo ou da própria página ou digitado na url. Ele tem uma sintaxe de (.)eonomedoarquivo sendo que o podem ser (.) ou mais pontos a depender do nível onde se encontra o arquivo. Segundo o site oficial é útil para :
Modals
Intercepting Routes can be used together with Parallel Routes to create modals. This allows you to solve common challenges when building modals, such as:
    • Making the modal content shareable through a URL.
    • Preserving context when the page is refreshed, instead of closing the modal.
    • Closing the modal on backwards navigation rather than going to the previous route.
    • Reopening the modal on forwards navigation.
 

Uma **interception route** em Next.js é um recurso avançado de roteamento que permite carregar o conteúdo de uma rota dentro do layout atual, sem mudar completamente o contexto da página. Isso é útil para criar experiências mais dinâmicas, como exibir modais ou sobreposições, enquanto mantém a URL atualizável e compartilhável.

Por exemplo:
- Imagine um feed de fotos. Ao clicar em uma foto, em vez de navegar para uma nova página, você pode abrir a foto em um modal sobre o feed. A URL muda para algo como `/photo/123`, mas o feed continua visível em segundo plano.
- Se o usuário acessar diretamente a URL `/photo/123` ou atualizar a página, a foto será exibida como uma página completa, sem o modal.

No Next.js, isso é implementado usando convenções como `(..)`, que ajudam a definir rotas interceptadas com base nos segmentos de rota. Você pode aprender mais sobre isso na [documentação oficial](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes).

A aula 150 explica como efetivamente aplicar a Interception Route junto com a Parallel usando a tag <dialog> que explico melhor acima, o que, na verdade, cria um modal, por isso fiz a pergunta abaixo.

	A escolha entre Interception Route e um simples modal depende principalmente do contexto e do objetivo da experiência do usuário no seu projeto. Aqui estão algumas das vantagens de usar Interception Route em vez de apenas um modal:
1. Manutenção do Histórico de Navegação
    • Interception Route cria uma nova rota dentro da aplicação, o que significa que ela fica registrada no histórico de navegação do navegador. Isso permite que o usuário utilize funcionalidades como voltar ou avançar (botões do navegador) para acessar diretamente aquela interface específica. 
    • Um modal, por outro lado, geralmente não muda o estado da URL, o que dificulta a navegação direta ou o compartilhamento do estado atual. 
2. Deep Linking
    • Como o Interception Route é baseado em rotas, você pode criar URLs únicas para páginas ou estados intermediários da aplicação. Isso é útil para casos como: 
        ◦ Compartilhar links específicos com outras pessoas. 
        ◦ Retornar diretamente ao estado apropriado ao recarregar a página. 
    • Modais não possuem essa funcionalidade por padrão. 
3. Gerenciamento de Estados Complexos
    • Em aplicações mais complexas, Interception Route pode ajudar a gerenciar estados de uma forma mais clara e escalável. Isso porque é possível conectar a rota a um estado de back-end, fazer fetch de dados específicos e preparar o contexto ideal para renderizar o conteúdo. 
    • Modais, por sua vez, costumam depender apenas de componentes front-end, o que pode ser mais difícil de escalar conforme o projeto cresce. 
4. Separação de Responsabilidades
    • Usar rotas promove uma melhor organização de código, separando visualizações diferentes em arquivos ou módulos distintos. Isso mantém a arquitetura mais limpa e fácil de debugar. 
    • Modais, quando não bem planejados, podem resultar em camadas de lógica acopladas diretamente ao componente pai. 
5. Acessibilidade (UX/UI)
    • Com Interception Route, é possível carregar páginas dedicadas que são mais amigáveis para tecnologias assistivas, como leitores de tela. Além disso, a navegação de teclado ou touch pode ser mais intuitiva para rotas. 
    • Modais, se não forem projetados corretamente, podem ser difíceis de tornar acessíveis, especialmente quando há múltiplos modais ou problemas de foco na interface. 
Quando usar modais?
Modais ainda são úteis em casos onde:
    • O conteúdo é leve e contextual, como confirmações ou formulários simples. 
    • Não há necessidade de salvar a navegação no histórico ou criar uma URL específica. 
Por outro lado, para fluxos mais complexos ou recursos que exigem estados permanentes, Interception Route é uma solução mais robusta e prática. 
	Na aula 152 é usado o useRouter (acima explicado na parte dos Hooks) para redirecionar a rota qual há um click fora do modal, ou seja, na parte da página paralela que está rodando atrás
	Aula 154 explica Route Groups que é uma maneira de organizar os arquivos dentro de pastas que são ignoradas pela rota, elas tem q estar dentro de ( )
Route Groups no Next.js são uma funcionalidade introduzida no sistema de rotas baseado em pastas que permite organizar melhor suas rotas, sem impactar diretamente na estrutura das URLs da sua aplicação. Eles ajudam a manter o código mais modular e escalável, especialmente em projetos maiores.
O que são Route Groups?
No Next.js, ao criar pastas para organizar as rotas de uma aplicação, cada pasta geralmente representa uma parte da URL. Contudo, com Route Groups, você pode agrupar rotas para organização interna sem alterar ou adicionar o agrupamento à URL final.
Isso é feito criando pastas com nomes entre parênteses. Essas pastas são chamadas de "grupos de rota" e são ignoradas ao construir as URLs da aplicação.
Exemplo básico de Route Groups
Imagine que você quer organizar um grupo de páginas relacionadas dentro do seu projeto:
Sem Route Groups
/pages
  ├── dashboard
  │     ├── perfil.tsx   // URL: /dashboard/perfil
  │     ├── configuracoes.tsx   // URL: /dashboard/configuracoes
Com Route Groups
Com os Route Groups, você pode criar um grupo para organizar essas páginas:
/app
  ├── (dashboard)
  │     ├── perfil/page.tsx       // URL: /perfil
  │     ├── configuracoes/page.tsx // URL: /configuracoes
O nome da pasta (dashboard) é ignorado ao criar a URL final. No exemplo acima, a rota será gerada como se a pasta (dashboard) não existisse.
Quando usar Route Groups?
    • Organização interna: Quando você deseja separar logicamente diferentes áreas do projeto sem afetar a estrutura das URLs. 
    • Layouts compartilhados: Use Route Groups para compartilhar layouts específicos entre diferentes rotas sem expor isso na URL. 
Exemplo de compartilhamento de layout:
/app
  ├── (user)
  │     ├── layout.tsx        // Layout compartilhado
  │     ├── dashboard/page.tsx   // URL: /dashboard
  │     ├── perfil/page.tsx      // URL: /perfil
No arquivo layout.tsx, você pode definir um layout comum que será aplicado a todas as páginas dentro do grupo (user).
Vantagens dos Route Groups
    1. Organização Modular: Ajuda a manter a estrutura de arquivos mais limpa e fácil de navegar. 
    2. URLs Amigáveis: Você não precisa comprometer a estrutura das URLs para organizar sua aplicação. 
    3. Layouts Específicos por Grupos: Permite compartilhar layouts ou recursos específicos em diferentes grupos de páginas. 
    4. Flexibilidade para Crescimento: Facilita o gerenciamento de projetos à medida que eles se tornam maiores e mais complexos.

Aula 155 faz uma api simples que consiste em criar uma pasta api, dentro um arquivo route.js onde deverá ser inserida a lógica para api

Criar uma API com Next.js é relativamente simples, pois o framework inclui suporte embutido para rotas de API. Você pode criar endpoints diretamente na estrutura de pastas do projeto, sem precisar configurar manualmente servidores ou middleware adicionais. Vamos aos passos:

1. Configuração Inicial
Primeiro, certifique-se de ter o Next.js instalado no seu projeto. Caso ainda não tenha, execute:
npx create-next-app@latest meu-projeto
cd meu-projeto

2. Criar uma Rota de API
Em Next.js, todas as rotas de API são criadas dentro da pasta pages/api. Cada arquivo nessa pasta automaticamente se torna um endpoint da sua API.
Por exemplo, para criar uma rota /api/hello, siga os passos abaixo:
Arquivo: pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ mensagem: 'Olá, mundo!' });
}
Neste código:
    • req: Representa a requisição feita pelo cliente. 
    • res: Representa a resposta enviada ao cliente. 
Essa rota responderá com um JSON contendo { mensagem: 'Olá, mundo!' }.

3. Gerenciar Métodos HTTP
Você pode definir diferentes comportamentos para GET, POST, PUT, DELETE, etc., verificando o método da requisição.
Exemplo de gerenciamento de métodos:
export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json({ mensagem: 'Você fez um GET!' });
  } else if (method === 'POST') {
    const dados = req.body; // Dados enviados no corpo da requisição
    res.status(201).json({ mensagem: 'Dados recebidos!', dados });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${method} não permitido`);
  }
}

4. Consumir Parâmetros e Query Strings
Você pode acessar parâmetros de rota ou dados da query string utilizando o objeto req.
Exemplo de query string:
export default function handler(req, res) {
  const { nome } = req.query; // Captura ?nome=valor na URL
  res.status(200).json({ mensagem: `Olá, ${nome}!` });
}
Se acessar /api/hello?nome=João, a resposta será: { mensagem: "Olá, João!" }.

5. Conectar com um Banco de Dados
Você pode integrar sua API com bancos de dados utilizando bibliotecas como mongoose, prisma ou pg.
Exemplo básico com MongoDB:
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db('meuBanco');
  const colecao = db.collection('dados');
  const resultado = await colecao.find().toArray();

  client.close();
  res.status(200).json(resultado);
}

6. Teste sua API
Você pode testar os endpoints usando ferramentas como Postman, Insomnia ou diretamente pelo navegador (para métodos GET).

Vantagens das APIs no Next.js:
    • Serverless: Pode ser executada em ambientes serverless como Vercel e AWS Lambda. 
    • Configuração mínima: Sem necessidade de configurar servidores manualmente. 
    • Integração com rotas client-side: Fácil de consumir na própria aplicação Next.js com fetch ou axios. 

A aula 156 fala de Middleware
Um middleware é uma função que é executada entre o momento em que a solicitação de um cliente é recebida pelo servidor e antes que a resposta seja enviada. No contexto do Next.js, middleware é utilizado para interceptar e modificar solicitações e respostas no lado do servidor, permitindo recursos como autenticação, redirecionamentos, controle de acessos e manipulação de cookies.
Para que serve o middleware no Next.js?
    1. Autenticação e Autorização: Verificar se o usuário tem permissão para acessar determinadas páginas ou rotas. 
    2. Redirecionamento: Redirecionar o usuário para outra página com base em condições específicas. 
    3. Manipulação de Cookies: Ler e modificar cookies antes de enviar a resposta. 
    4. Controle de Cache e Otimização: Alterar cabeçalhos HTTP ou ajustar a resposta antes de ser enviada. 

Como funciona o middleware no Next.js?
Middleware é implementado com base no Edge Functions, que permite executar o código diretamente no edge (próximo ao usuário) para respostas mais rápidas. Ele é configurado no arquivo especial chamado middleware.js ou middleware.ts na raiz do diretório do projeto.

Exemplo: Criando e implantando um middleware
    1. Criar o arquivo de middleware: Crie um arquivo chamado middleware.ts na raiz do diretório do projeto (próximo ao pages ou app).
    2. Implementar o middleware: Aqui está um exemplo básico de middleware que verifica a autenticação e redireciona usuários não autenticados:
       import { NextResponse } from 'next/server';
       
       export function middleware(req) {
         const { cookies } = req; // Acessa os cookies da requisição
         const token = cookies.authToken; // Token de autenticação
       
         // Se não estiver autenticado, redireciona para a página de login
         if (!token) {
           return NextResponse.redirect(new URL('/login', req.url));
         }
       
         // Permite continuar se autenticado
         return NextResponse.next();
       }
       
       export const config = {
         matcher: ['/dashboard/:path*'], // Executa o middleware somente nas rotas do dashboard
       };

Detalhes do código acima:
    • req.cookies: Acessa os cookies enviados na solicitação. 
    • NextResponse.next(): Permite que a solicitação continue normalmente. 
    • NextResponse.redirect(): Redireciona o usuário para uma URL especificada. 
    • matcher: Define quais rotas devem ativar o middleware. 

Configuração Opcional: Matcher
O matcher permite aplicar o middleware apenas em rotas específicas. No exemplo acima, o middleware será ativado apenas em rotas que correspondem ao padrão /dashboard/*.

Testar e implantar o middleware
    • Localmente: Inicie o servidor local com npm run dev e acesse as rotas configuradas para testar o comportamento do middleware. 
    • Produção: Ao implantar o projeto (por exemplo, no Vercel), o middleware será executado automaticamente no edge. 

Vantagens de usar Middleware no Next.js
    1. Melhor desempenho: Executado diretamente no edge, com baixa latência. 
    2. Flexibilidade: Pode ser aplicado em rotas específicas ou globais. 
    3. Escalabilidade: Ideal para autenticação e lógica que precisa ser executada antes do carregamento da página. 

	Da aula 158 a 161 é iniciado uma nova parte do projeto anterior e é incluído um arquivo backend para criar um banco de dados e acessá-lo, primeiro é criado um código tradicional em React com os controles de estado para carregamento e erros, depois esse código é substituído por um outro muito menor já que o Node/Next.js permite que se use um async no componente e assim nenhum código será gerado antes dos dados serem atingidos o que carrega o código original no client site e é melhor para SEO. 
	Aula 163 adiciona uma página simples de loading, ou seja, o que deve ser mostrado enquanto os dados estiverem carregando. Já na aula 165 é inserida a lógica para usar o <Suspense> e mostrar um loading somente para aquela parte que estiver carregando, já que o componente loading é mostrado enquanto não se carrega a página inteira, já o suspense permite ser mais granular, dando um loading somente nos componentes mais pesados, por exemplo, mas foi preciso mexes em toda a lógica e não somente inserir a tag.
