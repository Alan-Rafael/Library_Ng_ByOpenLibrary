import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Renderiza no cliente (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'viewBook/:id', // Rota com parâmetro dinâmico, usando prerenderização (SSG)
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Aqui você deve fornecer os parâmetros de id para o prerendering
      return [
        { id: '123' }, // Exemplo de id a ser pré-renderizado
        { id: '456' },
        { id: '789' }
      ];
    },
  },
  {
    path: '**', // Todas as outras rotas são renderizadas no servidor (SSR)
    renderMode: RenderMode.Server,
  },
];
