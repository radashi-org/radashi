# Radashi

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/banner.png" alt="Radashi" width="100%" />
  </p>
  <a href="https://github.com/radashi-org/radashi/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/radashi" alt="Licença" /></a>
  <a href="https://github.com/radashi-org/radashi/actions/workflows/publish-beta.yml"><img src="https://img.shields.io/github/actions/workflow/status/radashi-org/radashi/publish-beta.yml?logo=github" alt="Status da Build" /></a>
  <a href="https://app.codecov.io/gh/radashi-org/radashi/tree/main/src"><img src="https://img.shields.io/codecov/c/github/radashi-org/radashi?logo=codecov" alt="Codecov" /></a>
  <a href="https://biomejs.dev/"><img src="https://img.shields.io/badge/estilo_de_código-biome.js-blue?logo=biome" alt="Estilo de Código: Biome.js" /></a>
  <a href="https://github.com/radashi-org/radashi/discussions"><img src="https://img.shields.io/github/discussions/radashi-org/radashi?logo=github" alt="Discussões no GitHub" /></a>
  <a href="https://app.gitter.im/#/room/#radashi:gitter.im"><img src="https://badges.gitter.im/join_chat.svg" alt="Gitter.im" /></a>
</div>

&nbsp;
[English](./README.md) | Português

**Diga adeus ao peso do Lodash. Pare de reinventar a roda.**

Radashi (pronunciado /ruh-DAH-shee/) é uma biblioteca de utilitários para TypeScript, repleta de funções leves, legíveis, performáticas e robustas.

Radashi é um fork mantido ativamente do Radash, uma alternativa ao Lodash com o crescimento mais rápido, acumulando mais de 100 mil downloads semanais.

_“O que torna o Radashi tão especial?”_

- **funções únicas** e **bem projetadas**
- **tree-shakeable** (use apenas o que precisar!)
- **livre de dependências**
- **focado na comunidade** (sua opinião é importante)
- **preparado para o futuro** (escrita com sintaxe moderna ES6+)
- **mantido ativamente** (com uma equipe de mantenedores apaixonados em crescer)
- **segurança de tipos** (melhores definições de tipos possíveis)
- **cobertura completa de testes**
- **rastreamento de performance** (monitoramos regressões de performance com benchmark contínuo)
- **bem documentado**
- **lançamentos noturnos** (`radashi@beta`)
- **[changelog](https://github.com/radashi-org/radashi/blob/main/CHANGELOG.md)** (veja facilmente o que há de novo em cada versão)

_Se você tem usado Radash (nosso predecessor), provavelmente está interessado em saber o que nos diferencia. Leia [nosso post de comparação](https://radashi.js.org/blog/vs-radash) para descobrir como estamos elevando o Radash ao próximo nível, enquanto preservamos suas melhores características._

<a href="https://radashi.js.org">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/docs-button.png" alt="Documentação Radashi" width="250px" />
</a>

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## Instalação

```sh
pnpm add radashi
```

```sh
yarn add radashi
```

```sh
npm install radashi
```

### Versão Beta

A versão `radashi@beta` é um lançamento noturno contendo tudo o que está na branch principal no momento (2:00AM BRT).

```sh
pnpm add radashi@beta
```

Suas mudanças são documentadas [aqui](https://github.com/radashi-org/radashi/blob/main/CHANGELOG.md#radashibeta). Se não houver uma seção `radashi@beta` no changelog, significa que nenhum pull request foi mesclado desde o último lançamento estável.

### JSR.io

Radashi também é publicado no [JSR registry](https://jsr.io/docs/why), que fornece ao Radashi [sua própria página](https://jsr.io/@radashi-org/radashi).

```sh
jsr add @radashi-org/radashi
```

```sh
deno add @radashi-org/radashi
```

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## FAQ

- **“Preciso de XYZ, mas o Radashi não tem isso.”**  
  Se você precisar de algo que não está no nosso conjunto atual de funções, nos queremos saber. [Inicie uma discussão](https://github.com/orgs/radashi-org/discussions/new?category=ideas) para que possamos explorar a ideia juntos!

- **O que “comunidade em primeiro lugar” significa exatamente?**  
  Significa colocar as necessidades da comunidade em primeiro lugar, tendendo a adicionar suporte para casos de uso populares, ao invés de ser estritamente minimalista. Portanto, seu feedback é muito bem-vindo e valorizamos sua perspectiva. Especificamente, queremos que você [contribua com seu ponto de vista](https://github.com/orgs/radashi-org/discussions/categories/rfcs?discussions_q=is%3Aopen+category%3ARFCs) nas discussões em nossa categoria de RFCs.

- **Minhas contribuições são bem-vindas?**  
  Sim! Pull requests são encorajados, mas, por favor, mantenha-os pequenos e focados. Mudanças drásticas são desencorajadas e não serão mescladas (a menos que o motivo tenha sido discutido exaustivamente).

  Por favor, revise _“O ethos do Radashi”_ antes de enviar um pull request:

  <a href="https://github.com/orgs/radashi-org/discussions/20">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/ethos-button.png" alt="O ethos do Radashi" width="250px" />
  </a>

- **Posso ajudar a manter isso?**  
  Sim! Vou adicioná-lo como colaborador no repositório. Você pode revisar pull requests e até mesmo mesclá-los. Você também pode ajudar a fechar issues. commitar diretamente na branch principal é um privilégio que você pode conquistar, assim como publicar versões no NPM.

  <a href="https://github.com/orgs/radashi-org/discussions/4">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/apply-button.png" alt="Candidate-se para fazer parte da equipe Radashi" width="250px" />
  </a>

- **Compatibilidade retroativa é um objetivo?**  
  Sim! Queremos que a transição do `radash` para esta biblioteca seja suave. Se você está vindo do Radash, recomendamos instalar `radashi@^12`. Esta versão continuará recebendo correções mesmo após o lançamento do Radashi v13. Você pode atualizar para a versão mais recente quando estiver pronto.

- **Lançamentos automáticos**  
  Para garantir que as contribuições sejam rapidamente disponibilizadas, temos os seguintes processos automáticos:

  - **Lançamentos Beta**  
    Sempre que a branch `main` recebe uma correção ou funcionalidade, uma versão beta é automaticamente publicada no NPM às 2:00AM BRT. Instalar `radashi@beta` sempre buscará a versão beta mais recente. Lançamentos beta são sempre auditados pela equipe Radashi.

  - **Lançamentos de Preview**  
    Quando o _dono de um PR_ comenta `/publish` (e nada mais), o PR é publicado no NPM sob uma versão como `1.0.0-pr123.f7a9c3b` (ou seja, `<versão mais recente>-pr<número do PR>.<commit SHA>`) e uma tag como `pr123`. Isso permite que a comunidade use as mudanças no PR sem esperar que ele seja mesclado.

    - ⚠️ **Atenção:** Lançamentos de Preview não são auditados pela equipe Radashi. Sempre verifique as mudanças no PR para garantir que nenhum código malicioso foi introduzido.

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## Contribuindo

Contribuições são bem-vindas e apreciadas! De uma olhada no guia de contribuição antes de começar:

<a href="https://github.com/radashi-org/radashi/blob/main/.github/contributing.md">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/contributing-button.png" alt="Contribuindo para o Radashi" width="250px" />
</a>

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

&nbsp;

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github
